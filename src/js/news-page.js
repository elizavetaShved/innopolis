import { Swiper } from 'swiper';

export class NewsPage {

  constructor() {
    const hostElem = document.querySelector('#news-page-host');

    const swiperElem = hostElem.querySelector('.news-page__slider-container');

    new Swiper(swiperElem, {
      slidesPerView: 1,
      lazy: true,
      keyboard: true,
      speed: 400,
      navigation: {
        nextEl: '.news-page__slider-btn.mod-next',
        prevEl: '.news-page__slider-btn.mod-prev',
      },
    })
  }
}
