import * as noty from 'noty';

type messageArgs = {
    content: string,
    duration?: number
};

let defaultOptions = {
    duration: 1500
};

export default {
    info({ content, duration }: messageArgs): void {
        noty({
            text: '<i class="fa fa-info-circle"></i>' + content,
            type: 'information',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    success({ content, duration}: messageArgs): void {
        noty({
            text: '<i class="fa fa-check-circle"></i>' + content,
            type: 'success',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    error({ content, duration}: messageArgs): void {
        noty({
            text: '<i class="fa fa-times-circle"></i>' + content,
            type: 'error',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    warning({ content, duration}: messageArgs): void {
        noty({
            text: '<i class="fa fa-warning"></i>' + content,
            type: 'warning',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    warn({ content, duration}: messageArgs): void {
        this.warning({ content, duration });
    },
    config(options: messageArgs): void {
        if (options.duration !== undefined) {
            defaultOptions.duration = options.duration;
        }
    }
};