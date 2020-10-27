'use strict';

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

export {renderMenu};
