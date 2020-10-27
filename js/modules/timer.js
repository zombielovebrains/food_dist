'use strict';
import {checkDecimalPlace} from '../modules/util';    
const deadline = '2020-10-15';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse( new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function setTimer(selector, endtime) {
    let timer = document.querySelector(selector);
    let days = timer.querySelector('#days');
    let hours = timer.querySelector('#hours');
    let minutes = timer.querySelector('#minutes');
    let seconds = timer.querySelector('#seconds');
    let timerInterval = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
        const t = getTimeRemaining(endtime);

        days.textContent = checkDecimalPlace(t.days);
        hours.textContent = checkDecimalPlace(t.hours);
        minutes.textContent = checkDecimalPlace(t.minutes);
        seconds.textContent = checkDecimalPlace(t.seconds);

        if (t.total <= 0) {
            clearInterval(timerInterval);
        }
    }
}

function activateTimer() {
    setTimer('.timer', deadline);
}

export {activateTimer};