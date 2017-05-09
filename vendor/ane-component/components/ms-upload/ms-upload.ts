import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import './ms-upload.css';
import './ms-upload-list';
import './ms-upload-card';
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
        action: '',
        listType: 'text-list',
        showUploadList: true,
        btnClass: 'btn btn-default',
        cardClass: 'bus-upload-select-card bus-upload-card-item',
        blankImg: 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        $uploader: null,
        beforeUpload() {
            return true;
        },
        handleRemove(file) {
            let value;
            this.fileList.removeAll(f => f.uid === file.uid);
            this.value.remove(file.url);
            value = this.value.$model || this.value || [''];
            this.handleChange({
                target: { value: this.showUploadList ? value : value[0] },
                type: 'file-upload'
            });
        },
        mapValueToFileList(value) {
            value.map((url, i) => {
                if (url === '') {
                    return;
                }
                this.fileList.push({
                    uid: -(i + 1),
                    name: url.replace(/.*\/([^\/]+)\/?/, '$1'),
                    url: url,
                    status: 'done',
                    progress: 0
                });
            });
        },
        onInit(event) {
            emitToFormItem(this);
            this.helpId = this.$id;
            this.mapValueToFileList(this.value);
            this.$watch('value', v => {
                let value = v.$model || v || [''];
                this.fileList.clear();
                this.mapValueToFileList(value);
                this.handleChange({
                    target: { value: this.showUploadList ? value : value[0] },
                    denyValidate: true,
                    type: 'file-upload'
                });
            });
        },
        onReady(event) {
            this.$uploader = Uploader.init({
                url: this.action,
                fileInput: event.target.getElementsByTagName('input').file,
                filter: (files) => {
                    // 如果不支持图片信息的预览，则不进行过滤和限制
                    return files.filter(file => !file.size || this.beforeUpload(file));
                },
                onSelect: (files, allFiles) => {
                    allFiles.map(file => {
                        if (!this.showUploadList) {
                            this.fileList.set(0, {
                                uid: file.index,
                                name: file.name,
                                status: 'uploading',
                                progress: 0,
                                url: this.blankImg
                            });
                            return;
                        }
                        if (this.fileList.every(f => f.uid !== file.index)) {
                            this.fileList.push({
                                uid: file.index,
                                name: file.name,
                                status: 'uploading',
                                progress: 0,
                                url: this.blankImg
                            });
                        } else {
                            updateFileObj(this.fileList, file.index, f => {
                                f.status = 'uploading';
                                f.progress = 0;
                            });
                        }
                    });
                    this.$uploader.upload();
                },
                onProgress: (file, loaded, total) => {
                    updateFileObj(this.fileList, file.index, f => f.progress = (loaded / total * 100).toFixed());
                },
                onSuccess: (file, response) => {
                    updateFileObj(this.fileList, file.index, f => {
                        f.status = 'done';
                        f.progress = 100;
                        f.url = response.url;
                    });
                    if (!this.showUploadList) {
                        this.value = [response.url];
                    } else {
                        this.value.push(response.url);
                    }
                },
                onFailure: (file, err) => {
                    updateFileObj(this.fileList, file.index, f => {
                        f.status = 'error';
                        f.url = 'data:image/gif;base64,MA==';
                    })
                    throw err;
                },
                onComplete: () => {
                    let value = this.value.$model || this.value || [''];
                    this.handleChange({
                        target: { value: this.showUploadList ? value : value[0] },
                        type: 'file-upload'
                    });
                }
            });
        },
        onDispose(event) {
        }
    }
});

function updateFileObj(fileList, uid, callback) {
    fileList.forEach(f => {
        if (f.uid === uid) {
            callback(f);
            return false;
        }
    });
}