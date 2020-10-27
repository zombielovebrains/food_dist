'use strict';
import {upload} from '../modules/server';

let forms = document.querySelectorAll('form');

function resetForms() {
    forms.forEach( (item) => item.reset() );
}

function setSubmitAction (callbackFirst, callbackSecond) {
    forms.forEach( (item) => {
        item.addEventListener('submit', function (evt) {
            evt.preventDefault();
            upload(new FormData(item), callbackFirst, callbackSecond);                
        });
    }); 

}

export {resetForms, setSubmitAction};

