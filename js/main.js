'use strict';
import {activateCalculating} from './modules/calc';
import {download} from './modules/server';
import {activateTabs} from './modules/tabs';
import {activateTimer} from './modules/timer';
import {activateSlider} from './modules/slider';
import {closeModal} from './modules/modal';
import {showSuccess, showError} from './modules/message';
import {resetForms, setSubmitAction}from './modules/form';
import {renderMenu}from './modules/menu';


window.addEventListener('DOMContentLoaded', () => {
    function activatePage () {
        download(successDownload, unsuccessDownload);
        activateTabs();
        activateTimer();
        activateSlider();
        activateCalculating();
    }

    let successSubmit = function () {
        closeModal();
        resetForms();
        showSuccess();
    };

    let unsuccessSubmit = function (errorMessage) {
        closeModal();
        showError(errorMessage);
    };

    let successDownload = function (data) {
        renderMenu(data);
    };
    
    let unsuccessDownload = function (errorMessage) {
        showError(errorMessage);
    };

    activatePage();
    setSubmitAction(successSubmit, unsuccessSubmit);
});