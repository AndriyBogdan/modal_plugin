function _createModalWindow(options){

    const DEFAULT_WIDTH = '600px';

    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalInnerHTML = `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window">
                <div class="modal-header">
                    <h3 class="modal-title">${options.title || ''}</h3>
                    ${options.closable ? `<span class="modal-close" data-close="true">&#215;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
                <div class="modal-footer">
                    ${options.footerContent || ''}
                </div>
            </div>
        </div>`;
    modal.insertAdjacentHTML('afterbegin', modalInnerHTML);
    modal.style.width = options.width || DEFAULT_WIDTH;
    document.body.appendChild(modal);
    return modal;
}

$.modal = function(options){

    const ANIMATION_SPEED = 300;
    const _modal = _createModalWindow(options);
    let isClosed = false;
    let isDestroyed = false;

    const modal = {
        open(){
            !isClosed && _modal.classList.add('open');
        },
        close(){
            isClosed = true;
            _modal.classList.remove('open');
            _modal.classList.add('hidden');

            setTimeout(() => {
                _modal.classList.remove('hidden');
                isClosed = false;
            }, ANIMATION_SPEED);
        },
        setContent(html){
            _modal.querySelector('[data-content]').innerHTML = html;
        }
    };

    const onCloseListener = e => {
        let element = e.target;
        if(element.getAttribute('data-close')) modal.close();
    };

    _modal.addEventListener('click', onCloseListener);

    return Object.assign(modal, {
        destroy(){
            isDestroyed = true;
            _modal.parentNode.removeChild(_modal);
            _modal.removeEventListener('click', onCloseListener);
        }
    });
};