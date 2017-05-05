import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import './ms-upload.css';
import './ms-upload-list';
import Uploader from 'up-loader';

/**
 * 文件上传组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * 
 * @example
 * ``` html
 * <ms-upload :widget="{value:@record.attachment,col:'attachment',$rules:{required:true,type:'array'}}">
 *      <i class="fa fa-upload"></i>选择附件
 * </ms-upload>
 * ```
 */
controlComponent.extend({
    displayName: 'ms-upload',
    template: __inline('./ms-upload.html'),
    soleSlot: 'trigger',
    defaults: {
        helpId: '',
        trigger: '',
        value: [],
        fileList: [],
        listType: 'text-list',
        $uploader: null,
        handleRemove(file) {
            // this.fileList.forEach((f, i) => {
            //     if (f.uid === file.uid) {
            //         this.fileList.removeAt(i);
            //         return false;
            //     }
            // });
            // this.fileList.push({
            //     uid: -2,
            //     name: 'doge.jpg',
            //     url: 'http://www.baidu.com',
            //     status: 'done'
            // });
            this.fileList.removeAll(f => f.uid === file.uid);
        },
        onInit(event) {
            emitToFormItem(this);
            this.helpId = this.$id;
            this.value.map((url, i) => {
                this.fileList.push({
                    uid: -(i + 1),
                    name: url.replace(/.*\/([^\/]+)\/?/, '$1'),
                    url: url,
                    status: 'done'
                });
            });
        },
        onReady(event) {
            this.$uploader = Uploader.init({
                url: '/api/file/uploadFile',
                fileInput: event.target.getElementsByTagName('input').file,
                onSelect: (files) => {
                    console.log('selected: ', files);
                    files.map(file => {
                        if (this.fileList.every(f => f.index !== file.index)) {
                            this.fileList.push({
                                uid: file.index,
                                name: file.name
                            });
                        }
                    });
                    this.$uploader.upload();
                },
                onFinish: (file) => {
                    console.log('deleted: ', file.index);
                },
                onProgress: (file, loaded, total) => {
                    console.log('progressed: ', file, loaded, total);
                },
                onSuccess: (file, response) => {
                    console.log('successed: ', file, response);
                    this.value.push(response.url);
                },
                onFailure: (file, err) => {
                    console.log('faileured: ', file, err);
                    throw err;
                },
                onComplete: () => {
                    console.log('completed');
                    this.onChange({
                        target: { value: this.value.$model || this.value },
                        type: 'file-upload'
                    });
                }
            });
            // function changeHandler() {
            //     var inputId = 'file' + vm.$id, val = this.value, index = val.lastIndexOf('\\');
            //     this.id = inputId;
            //     $(el).find('input:text').val('文件' + val.substring(index + 1) + '上传中...');
            //     file.insert({
            //         fileElementId: inputId,
            //         success: function (data, status) {
            //             vm.duplex = data.url;
            //             $(el).find('input:text').trigger('input');
            //         }
            //     });
            //     $(this).replaceWith('<input type="file" name="file">');
            //     $(el).find('input:file').change(changeHandler);
            // }
            // $(el).find('input:file').change(changeHandler);
        },
        onDispose(event) {
        }
    }
});