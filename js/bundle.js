/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/server */ "./js/modules/server.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/message */ "./js/modules/message.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");












window.addEventListener('DOMContentLoaded', () => {
    function activatePage () {
        (0,_modules_server__WEBPACK_IMPORTED_MODULE_7__.download)(successDownload, unsuccessDownload);
        (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__.activateTabs)();
        (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.activateTimer)();
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.activateSlider)();
        (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.activateCalculating)();
    }

    let successSubmit = function () {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.closeModal)();
        (0,_modules_form__WEBPACK_IMPORTED_MODULE_6__.resetForms)();
        (0,_modules_message__WEBPACK_IMPORTED_MODULE_5__.showSuccess)();
    };

    let unsuccessSubmit = function (errorMessage) {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.closeModal)();
        (0,_modules_message__WEBPACK_IMPORTED_MODULE_5__.showError)(errorMessage);
    };

    let successDownload = function (data) {
        (0,_modules_menu__WEBPACK_IMPORTED_MODULE_8__.renderMenu)(data);
    };
    
    let unsuccessDownload = function (errorMessage) {
        (0,_modules_message__WEBPACK_IMPORTED_MODULE_5__.showError)(errorMessage);
    };

    activatePage();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_6__.setSubmitAction)(successSubmit, unsuccessSubmit);
});

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export activateCalculating [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateCalculating": () => /* binding */ activateCalculating
/* harmony export */ });


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





/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! namespace exports */
/*! export resetForms [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setSubmitAction [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resetForms": () => /* binding */ resetForms,
/* harmony export */   "setSubmitAction": () => /* binding */ setSubmitAction
/* harmony export */ });
/* harmony import */ var _modules_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/server */ "./js/modules/server.js");



let forms = document.querySelectorAll('form');

function resetForms() {
    forms.forEach( (item) => item.reset() );
}

function setSubmitAction (callbackFirst, callbackSecond) {
    forms.forEach( (item) => {
        item.addEventListener('submit', function (evt) {
            evt.preventDefault();
            (0,_modules_server__WEBPACK_IMPORTED_MODULE_0__.upload)(new FormData(item), callbackFirst, callbackSecond);                
        });
    }); 

}





/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/*! namespace exports */
/*! export renderMenu [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderMenu": () => /* binding */ renderMenu
/* harmony export */ });


class MenuCard {
    constructor(src, altimg, title, descr, price) {
        this.src = src;
        this.title = title;
        this.descr = descr;
        this.altimg = altimg;
        this.price = price;
        this.transfer = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    createElem(tagName, ...rest) {
        let elem = document.createElement(tagName);

        if (rest.length != 0) {
            elem.classList.add(...rest); 
        }
                  
        return elem;
    }

    createCard() {
        const menuItem = this.createElem('div', 'menu__item');
        const picture = this.createElem('img');
        const subtitle = this.createElem('h3', 'menu__item-subtitle');
        const descr = this.createElem('div', 'menu__item-descr');
        const divider = this.createElem('div', 'menu__item-divider');
        const price = this.createElem('div', 'menu__item-price');
        const cost = this.createElem('div', 'menu__item-cost');
        const total = this.createElem('div', 'menu__item-total');

        picture.src = this.src;
        picture.alt = this.altimg;
        subtitle.textContent = this.title;
        descr.textContent = this.descr;
        cost.textContent = 'Цена';
        total.innerHTML = `<span>${this.price}</span> грн/день`;
        price.append(cost, total);

        menuItem.append(picture, subtitle, descr, divider, price);
        return menuItem;
    }
}

function renderMenu(menuDataList) {
    let menuContainer = document.querySelector('.menu__field .container');

    menuDataList.forEach((item) => {
        let menuCard = new MenuCard(
            item.img,
            item.altimg,
            item.title,
            item.descr,
            item.price
        ).createCard();

        menuContainer.append(menuCard);
    });
}




/***/ }),

/***/ "./js/modules/message.js":
/*!*******************************!*\
  !*** ./js/modules/message.js ***!
  \*******************************/
/*! namespace exports */
/*! export showError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showSuccess [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showSuccess": () => /* binding */ showSuccess,
/* harmony export */   "showError": () => /* binding */ showError
/* harmony export */ });
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/util */ "./js/modules/util.js");




let messageBox = document.querySelector('.response');
let message = document.querySelector('.response__text');
let closeMessageBtn = document.querySelector('[data-close="response"]');

function showMessage() {
    (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.showModalElement)(messageBox);
}

function closeMessage() {
    (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.hideModalElement)(messageBox);
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



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/util */ "./js/modules/util.js");





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
    (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.showModalElement)(modalBox);
    clearInterval(modalTimerId);
}

function closeModal() {
    (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.hideModalElement)(modalBox);
}

function showModalByScroll() {
    if ( (window.pageYOffset + document.documentElement.clientHeight) >= 
    document.documentElement.scrollHeight ) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}



/***/ }),

/***/ "./js/modules/server.js":
/*!******************************!*\
  !*** ./js/modules/server.js ***!
  \******************************/
/*! namespace exports */
/*! export download [provided] [no usage info] [missing usage info prevents renaming] */
/*! export upload [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "upload": () => /* binding */ upload,
/* harmony export */   "download": () => /* binding */ download
/* harmony export */ });
// (function() {
//   'use strict';
    
//   const SERVER_DATA_URL = 'http://localhost:3000/menu';
//   const SERVER_URL = 'http://localhost:3000/requests';

//   async function postData(data) {
//     const res = await fetch(SERVER_URL, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: data
//     });

//     if (!res.ok) {
//       throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
//     }
    
//     return await res.json(); 
//   }

//   async function getData() {
//     const res = await fetch(SERVER_DATA_URL);

//     if (!res.ok) {
//       throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
//     }
    
//     return await res.json(); 
//   }
  
//   function upload(formData, onSuccess, onError) {
//     const json = JSON.stringify(Object.fromEntries(formData.entries()));

//     postData(json)
//     .then(data => {
//       onSuccess(data);
//     })
//     .catch( e => {
//       onError(e.message);
//     });
//   }

//   function download(onSuccess, onError) {
//     getData()
//     .then(data => onSuccess(data))
//     .catch( e => {
//       onError(e.message);
//     });
//   }


//   window.server = {
//     upload: upload,
//     download: download
//   };
// })();


    
const SERVER_DATA_URL = 'http://localhost:3000/menu';
const SERVER_URL = 'http://localhost:3000/requests';

async function postData(data) {
  const res = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  if (!res.ok) {
    throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
  }
  
  return await res.json(); 
}

async function getData() {
  const res = await fetch(SERVER_DATA_URL);

  if (!res.ok) {
    throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
  }
  
  return await res.json(); 
}

function upload(formData, onSuccess, onError) {
  const json = JSON.stringify(Object.fromEntries(formData.entries()));

  postData(json)
  .then(data => {
    onSuccess(data);
  })
  .catch( e => {
    onError(e.message);
  });
}

function download(onSuccess, onError) {
  getData()
  .then(data => onSuccess(data))
  .catch( e => {
    onError(e.message);
  });
}



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export activateSlider [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateSlider": () => /* binding */ activateSlider
/* harmony export */ });
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/util */ "./js/modules/util.js");



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

    currentSlideBox.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(slideIndex);
    totalSlideBox.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(slidesList.length);
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
    currentSlideBox.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(slideIndex);
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
    currentSlideBox.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(slideIndex);
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



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export activateTabs [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateTabs": () => /* binding */ activateTabs
/* harmony export */ });
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/util */ "./js/modules/util.js");




let tabs = Array.from(document.querySelectorAll('.tabheader__item'));
let tabsContentList = document.querySelectorAll('.tabcontent');
let tabsContainer = document.querySelector('.tabheader__items');

function hideTabContent() {
    (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.hideAllElements)(tabsContentList);

    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.showElement)(tabsContentList[i]);
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



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export activateTimer [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateTimer": () => /* binding */ activateTimer
/* harmony export */ });
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/util */ "./js/modules/util.js");

    
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

        days.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(t.days);
        hours.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(t.hours);
        minutes.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(t.minutes);
        seconds.textContent = (0,_modules_util__WEBPACK_IMPORTED_MODULE_0__.checkDecimalPlace)(t.seconds);

        if (t.total <= 0) {
            clearInterval(timerInterval);
        }
    }
}

function activateTimer() {
    setTimer('.timer', deadline);
}



/***/ }),

/***/ "./js/modules/util.js":
/*!****************************!*\
  !*** ./js/modules/util.js ***!
  \****************************/
/*! namespace exports */
/*! export checkDecimalPlace [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hideAllElements [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hideModalElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showModalElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showModalElement": () => /* binding */ showModalElement,
/* harmony export */   "hideModalElement": () => /* binding */ hideModalElement,
/* harmony export */   "checkDecimalPlace": () => /* binding */ checkDecimalPlace,
/* harmony export */   "hideAllElements": () => /* binding */ hideAllElements,
/* harmony export */   "showElement": () => /* binding */ showElement
/* harmony export */ });

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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map