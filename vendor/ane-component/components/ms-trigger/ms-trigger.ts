import * as avalon from 'avalon2';
import * as domAlign from 'dom-align';

avalon.component('ms-trigger', {
    template: '<span style="display:none;"></span>',
    defaults: {
        width: 0,
        visible: false,
        innerVmId: '',
        innerClass: '',
        innerTemplate: '',
        withInBox() { return true; },
        getTarget: avalon.noop,
        onHide: avalon.noop,
        hide(panel) {
            panel.style.top = '-9999px';
            panel.style.left = '-9999px';
            this.onHide();
        },
        onInit(event) {
            const DOC = document, body = DOC.body;
            const medium = DOC.createElement('div');
            const panel = DOC.createElement('div');
            medium.setAttribute('id', this.$id);
            medium.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 100%;');
            panel.setAttribute('class', this.innerClass);
            panel.setAttribute(':important', this.innerVmId);
            panel.innerHTML = this.innerTemplate;
            medium.appendChild(panel);
            body.appendChild(medium);

            avalon.scan(panel, avalon.vmodels[this.innerVmId]);

            avalon.bind(body, 'click', e => {
                if (this.visible && panel !== e.target && !avalon.contains(panel, e.target) &&  !this.withInBox(e.target)) {
                    this.hide(panel);
                }
            });
            this.$watch('visible', v => {
                if (v) {
                    panel.style.width = this.width + 'px';
                    panel.scrollTop = 0;
                    domAlign(panel, this.getTarget(), {
                        points: ['tl', 'bl'],
                        offset: [0, 1],
                        //targetOffset: ['0%','100%']
                        overflow: {
                            adjustY: true
                        }
                    })
                } else {
                    this.hide(panel);
                }
            });
        },
        onDispose(event) {
            const DOC = document, body = DOC.body;
            const medium = DOC.getElementById(this.$id);
            body.removeChild(medium);
        }
    }
});