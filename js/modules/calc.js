'use strict';

const result = document.querySelector('.calculating__result span');
const inputs = document.querySelectorAll('.calculating__choose_medium input');
let sex, height, weight, age, ratio;

function calcTotal() {

    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = "____";
        return;
    }

    if (sex === 'female') {
        result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener('click', (evt) => {
        if (evt.target.matches('.calculating__choose-item')) {
            if (evt.target.getAttribute('data-ratio'))  {
                ratio = +evt.target.dataset.ratio;
                localStorage.setItem('ratio', +evt.target.dataset.ratio);
            } else {
                sex = evt.target.id;
                localStorage.setItem('sex', evt.target.id);
            }

            elements.forEach(item => {
                item.classList.remove(activeClass);
            });

            evt.target.classList.add(activeClass);

            calcTotal();
        }           
    });
}

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        switch (input.id) {
            case 'weight':
                weight = +input.value;
                localStorage.setItem('weight', weight);
                break;

            case 'height':
                height = +input.value;
                localStorage.setItem('height', height);
                break;

            case 'age':
                age = +input.value;
                localStorage.setItem('age', age);
                break;            
        }

        calcTotal();
    });
}

function getAllInformation() {
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    inputs.forEach(item => {
        getDynamicInformation(`#${item.id}`);
    });
}

function checkDefaultActiveValues(activeClass) {
    if (localStorage.length != 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            switch (key) {
                case 'sex':
                    sex = localStorage.getItem(key);
                    break;

                case 'ratio':
                    ratio = +localStorage.getItem(key);
                    break;

                case 'weight':
                    weight = localStorage.getItem(key);
                    document.querySelector(`#${key}`).value = weight;
                    break;

                case 'height':
                    height = localStorage.getItem(key);
                    document.querySelector(`#${key}`).value = height;
                    break;   

                case 'age':
                    age = localStorage.getItem(key);
                    document.querySelector(`#${key}`).value = age;
                    break;                                           
            }
        }
    } else {
        sex = 'female';
        ratio = 1.375;

        localStorage.setItem('sex', sex);
        localStorage.setItem('ratio', ratio);
    }

    document.querySelector(`#${sex}`).classList.add(activeClass);
    document.querySelector(`[data-ratio="${ratio}"]`).classList.add(activeClass); 
}

function activateCalculating() {
    checkDefaultActiveValues('calculating__choose-item_active');
    getAllInformation();
    calcTotal();
}

export  {activateCalculating};

