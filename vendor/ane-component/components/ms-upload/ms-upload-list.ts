import * as avalon from 'avalon2';

avalon.component('ms-upload-list', {
    template: __inline('./ms-upload-list.html'),
    defaults: {
        listType: 'text-list',
        fileList: [],
        getTextClass(file) {
            switch (file.status) {
                case 'done': return 'text-primary';
                case 'uploading': return 'text-muted';
                case 'error': return 'text-danger';
            }
            return '';
        },
        onRemove: avalon.noop,
        del(file) {
            this.onRemove(file);
        }
    }
});