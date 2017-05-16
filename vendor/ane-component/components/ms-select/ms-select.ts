import * as avalon from 'avalon2';
import controlComponent from "../ms-form/ms-control";
import '../ms-trigger';
import './ms-select.css';

import { getChildTemplateDescriptor, debounce } from '../../ane-util';
import { emitToFormItem } from '../ms-form/utils';

/**
 * 选择组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * @prop options 下拉选项
 * @prop mode 模式 'combobox' | 'multiple' | 'tags' 默认为 ''
 * @prop showSearch 是否显示搜索框
 * @prop remote 是否为远程搜索
 * @prop remoteMethod 当remote为true时调用，包含远程搜索要执行的请求，返回一个Promise<options>
 * 
 * @example
 * ``` html
 * <ms-select :widget="{showSearch:true}">
 *     <ms-select-option :widget="{value:'M'}">男</ms-select-option>
 *     <ms-select-option :widget="{value:'F', disabled:false}">女</ms-select-option>
 * </ms-select>
 * 
 * <!--
 * fetchOptions(query) {
 *     return ajax({ url, data: { query } });
 * }
 * -->
 * <ms-select :widget="{mode:'combobox',showSearch:true,remote:true,remoteMethod:@fetchOptions}"></ms-select>
 * 
 * <ms-select :widget="{showSearch:true,mode:'multiple'}">
 *     <ms-select-option :widget="{value:'ane'}">Ane</ms-select-option>
 *     <ms-select-option :widget="{value:'ms-bus'}">ms-bus</ms-select-option>
 *     <ms-select-option :widget="{value:'up-loader'}">up-loader</ms-select-option>
 * </ms-select>
 * ```
 */
controlComponent.extend({
    displayName: 'ms-select',
    template: __inline('./ms-select.html'),
    defaults: {
        width: 0,
        value: [],
        mode: '',
        options: [],
        selection: [],
        remote: false,
        remoteMethod: avalon.noop,

        // 下拉框展示和操作部分
        displayValue: '',
        showSearch: false,
        searchValue: '',
        focusSearch() {
            this.$element.getElementsByTagName('input').search.focus();
        },
        withInBox(el) {
            return this.$element === el || avalon.contains(this.$element, el);
        },
        getTarget() {
            return this.$element;
        },
        handleClick(e) {
            if (!this.panelVisible) {
                this.searchValue = '';
                this.width = this.$element.offsetWidth;
                this.panelVisible = true;
                this.focusSearch();
            } else if (!this.isMultiple) {
                this.panelVisible = false;
            }
        },
        removeSelection(e, option) {
            const value = this.value.toJSON();
            this.selection.removeAll(o => o.value === option.value);
            this.value.remove(option.value);
            avalon.vmodels[this.panelVmId].selection = this.selection.toJSON();
            this.focusSearch();
            this.handleChange({
                target: { value: this.isMultiple ? value : value[0] || '' },
                type: 'select'
            });
        },

        // 下拉框下拉列表部分
        panelVmId: '',
        panelVisible: false,
        panelClass: 'bus-select-dropdown',
        panelTemplate: __inline('./ms-select-panel.html'),
        handlePanelHide() {
            this.panelVisible = false;
        },

        $computed: {
            isMultiple: {
                get() {
                    return this.mode === 'multiple' || this.mode === 'tags';
                }
            }
        },
        
        onInit(event) {
            var self = this;
            const descriptor = getChildTemplateDescriptor(this);
            this.options = getOptions(descriptor);
            
            emitToFormItem(this);
            this.$watch('value', v => {
                const value = v.toJSON();
                this.handleChange({
                    target: { value: this.isMultiple ? value : value[0] || '' },
                    denyValidate: true,
                    type: 'select'
                });
            });

            this.panelVmId = this.$id + '_panel';
            const innerVm = avalon.define({
                $id: this.panelVmId,
                selection: [],
                loading: false,
                isMultiple: this.isMultiple,
                options: this.options.toJSON(),
                searchValue: '',
                getFilteredOptions() {
                    return this.options.filter(this.filterFn);
                },
                filterFn(el) {
                    if (this.loading) {
                        return false;
                    }
                    if (self.remote) {
                        return true;
                    }
                    const reg = new RegExp(avalon.escapeRegExp(this.searchValue), 'i');
                    return reg.test(el.label) || reg.test(el.value);
                },
                handleOptionClick(e, option) {
                    if (option.disabled) {
                        return false;
                    }
                    if (self.isMultiple) {
                        if (this.selection.some(o => o.value === option.value)) {
                            this.selection.removeAll(o => o.value === option.value);
                            self.value.remove(option.value);
                        } else {
                            this.selection.push(option);
                            self.value.push(option.value);
                        }
                        self.focusSearch();
                    } else {
                        this.selection = [option];
                        self.value = [option.value];
                        self.panelVisible = false;
                    }
                    const value = self.value.toJSON();
                    self.handleChange({
                        target: { value: self.isMultiple ? value : value[0] || '' },
                        type: 'select'
                    });
                    self.displayValue = option.label;
                    self.selection = this.selection.toJSON();
                }
            });
            this.$watch('searchValue', debounce(v => {
                innerVm.searchValue = v;
                if (this.remote && !!v) {
                    innerVm.loading = true;
                    this.remoteMethod(v).then(options => {
                        innerVm.loading = false
                        innerVm.options = options;
                    });
                }
            }));
            this.$watch('isMultiple', v => {
                innerVm.isMultiple = v;
            });
        },
        onDispose() {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});

function getOptions(descriptor) {
    return descriptor.reduce((acc, option) => {
        if (option.is != 'ms-select-option') return acc;
        let label = option.inlineTemplate;
        acc.push({
            label: option.inlineTemplate || '',
            value: option.props.value || '',
            disabled: option.props.disabled || false
        });
        return acc;
    }, []);
}