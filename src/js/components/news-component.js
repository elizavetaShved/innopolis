import { Navigation, Swiper } from 'swiper';

Swiper.use([Navigation]);

export class NewsComponent {
  hostElem;
  btnPrev;
  btnNext;

  currentSlide = 0;
  windowIsLarge;

  constructor() {
    this.hostElem = document.querySelector('#news-block-host');
    if (!this.hostElem) return;

    const swiperElem = this.hostElem.querySelector('.news__swiper');
    this.btnPrev = this.hostElem.querySelector('.news__navigate-navigate-btn-wrapper.mod-prev');
    this.btnNext = this.hostElem.querySelector('.news__navigate-navigate-btn-wrapper.mod-next');
    this.windowIsLarge = window.innerWidth > 567;

    new Swiper(swiperElem, {
      slidesPerView: 1,
      lazy: true,
      keyboard: true,
      speed: 400,
      navigation: {
        nextEl: '.news__navigate-navigate-btn-wrapper.mod-next',
        prevEl: '.news__navigate-navigate-btn-wrapper.mod-prev',
      },

      breakpoints: {
        769: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1025: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }
    })
  }
}
