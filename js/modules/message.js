'use strict';

import {showModalElement, hideModalElement} from '../modules/util';

let messageBox = document.querySelector('.response');
let message = document.querySelector('.response__text');
let closeMessageBtn = document.querySelector('[data-close="response"]');

function showMessage() {
    showModalElement(messageBox);
}

function closeMessage() {
    hideModalElement(messageBox);
}

function showSuccess() {
    showMessage();
    message.textContent = 'Спасибо, мы скоро с вами свяжемся!';
}

function showError(errorMessage) {
    showMessage();
    message.textContent = errorMessage;
}

closeMessageBtn.addEventListener('click', closeMessage);

export {showSuccess, showError};