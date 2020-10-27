'use strict';

import {showElement, hideAllElements} from '../modules/util';

let tabs = Array.from(document.querySelectorAll('.tabheader__item'));
let tabsContentList = document.querySelectorAll('.tabcontent');
let tabsContainer = document.querySelector('.tabheader__items');

function hideTabContent() {
    hideAllElements(tabsContentList);

    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    showElement(tabsContentList[i]);
    tabs[i].classList.add('tabheader__item_active');
}

function activateTabs() {
    hideTabContent();
    showTabContent();
}

tabsContainer.addEventListener('click', (evt) => {
    let target = evt.target;

    if (target && target.matches('.tabheader__item')) {
        let index = tabs.indexOf(target);

        if (index != -1) {
            hideTabContent();
            showTabContent(index);
        }
    }
});

export {activateTabs};