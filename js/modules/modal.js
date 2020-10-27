'use strict';

import {showModalElement, hideModalElement} from '../modules/util';


const ENTER_CODE = 13;

let openModalBtns = document.querySelectorAll('[data-modal]');
let closeModalBtn = document.querySelector('[data-close="modal"]');
let modalBox = document.querySelector('.modal');

let modalTimerId = setTimeout(showModal, 10000);

openModalBtns.forEach( (item) => {
    item.addEventListener('click', showModal);
    item.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ENTER_CODE) {
            showModal();
        }
    });
});

closeModalBtn.addEventListener('click', closeModal);

modalBox.addEventListener('click', (evt) => {
    if (evt.target === modalBox) {
        closeModal();
    }
});

window.addEventListener('scroll', showModalByScroll);

function showModal() {
    showModalElement(modalBox);
    clearInterval(modalTimerId);
}

function closeModal() {
    hideModalElement(modalBox);
}

function showModalByScroll() {
    if ( (window.pageYOffset + document.documentElement.clientHeight) >= 
    document.documentElement.scrollHeight ) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

export {closeModal};