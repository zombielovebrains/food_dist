'use strict';
const ESC_CODE = 27; 

function showModalElement(element) {
    element.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', evt => {
        if (evt.keyCode === ESC_CODE) {
            hideModalElement(element);
        }
    });
}

function hideModalElement(element) {
    element.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', evt => {
        if (evt.keyCode === ESC_CODE) {
            hideModalElement(element);
        }
    });
}

function checkDecimalPlace(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function hideAllElements(list) {
    list.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
}

function showElement(item) {
    item.classList.add('show', 'fade');
    item.classList.remove('hide');
}

export {showModalElement, hideModalElement, checkDecimalPlace, hideAllElements, showElement};