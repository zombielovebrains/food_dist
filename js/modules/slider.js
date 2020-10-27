'use strict';
import {checkDecimalPlace} from '../modules/util';

const slider = document.querySelector('.offer__slider');
const sliderWrapper = slider.querySelector('.offer__slider-wrapper');
const sliderField = sliderWrapper.querySelector('.offer__slider-inner');
const slidesList =sliderWrapper.querySelectorAll('.offer__slide');

const nextSliderBtn = slider.querySelector('.offer__slider-next');
const prevSliderBtn = slider.querySelector('.offer__slider-prev');

const currentSlideBox = slider.querySelector('#current');
const totalSlideBox = slider.querySelector('#total');

let slideIndex = 1;
let offset = 0;
let oneSlideWidth = window.getComputedStyle(sliderWrapper).width;
console.log(oneSlideWidth);

function configureSlider() {

    sliderWrapper.style.overflow = 'hidden';

    sliderField.style.width = 100 * slidesList.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    slidesList.forEach( item => {
        item.style.width = oneSlideWidth;
    });

    currentSlideBox.textContent = checkDecimalPlace(slideIndex);
    totalSlideBox.textContent = checkDecimalPlace(slidesList.length);
    renderDotNavigation();
    recolorDot(slideIndex);
} 

function recolorDot(id) {
    let dots = slider.querySelectorAll('.dot');
    dots.forEach(item => {
        item.style.backgroundColor = 'transparent';
        if (item.dataset.id == id) {
            item.style.backgroundColor = '#000';
        }
    });
}

function createDot(i) {
    let dot = document.createElement('div');
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.borderRadius = '50%';
    dot.style.border = '1px solid black';
    dot.dataset.id = i + 1;
    dot.classList.add('fade', 'dot');
    dot.style.cursor = 'pointer';
    return dot;
}

function renderDotNavigation() {
    slider.style.position = 'relative';

    let dotsBox = document.createElement('div');
    dotsBox.style.width = slidesList.length * 16 + 'px';
    dotsBox.style.height = '10px';
    dotsBox.style.display = 'flex';
    dotsBox.style.justifyContent = 'space-between';
    dotsBox.style.position = 'absolute';
    dotsBox.style.bottom = '-30px';
    dotsBox.style.left = '50%';
    dotsBox.style.transform = 'translateX(-50%)';

    slidesList.forEach((item, i) => {
        dotsBox.append(createDot(i));
    });

    dotsBox.addEventListener('click', evt => {
        let target = evt.target;
        if (target && target.matches('.dot')) {
            changeSlideByDots(+target.dataset.id);
        }
    });

    slider.append(dotsBox);
}

function checkBoundaryValues() {
    if (offset >= parseInt(oneSlideWidth, 10) * slidesList.length) {
        slideIndex = 1;
        offset = 0;
    } else if (offset < 0){
        slideIndex = slidesList.length;
        offset =  parseInt(oneSlideWidth, 10) * (slidesList.length - 1);
    }
}

function changeSlideByDots(id) {
    slideIndex = id;
    offset = parseInt(oneSlideWidth, 10) * (id - 1);
    currentSlideBox.textContent = checkDecimalPlace(slideIndex);
    sliderField.style.transform = `translateX(-${offset}px)`;
    recolorDot(id);
}

function changeSlide(flag) {
    if (flag) {
        slideIndex += 1;
        offset += parseInt(oneSlideWidth, 10);
        checkBoundaryValues();
        recolorDot(slideIndex);
    } else {
        slideIndex -= 1;
        offset -= parseInt(oneSlideWidth, 10);
        checkBoundaryValues();
        recolorDot(slideIndex);      
    }
    currentSlideBox.textContent = checkDecimalPlace(slideIndex);
    sliderField.style.transform = `translateX(-${offset}px)`;
}

nextSliderBtn.addEventListener('click', () => {
    changeSlide(true);      
});

prevSliderBtn.addEventListener('click', () => {
    changeSlide(false);      
});

function activateSlider() {
    configureSlider();
}

export {activateSlider};