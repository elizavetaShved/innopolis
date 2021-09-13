import { Swiper } from 'swiper';

export class NewsPage {

  constructor() {
    const hostElem = document.querySelector('#news-page-host');
    const videoWrapperElem = hostElem.querySelector('.news-page__video-wrapper');
    const videoElem = hostElem.querySelector('.news-page__video');

    let isVideoPlayback = false;

    new Swiper(hostElem.querySelector('.news-page__slider-container'), {
      slidesPerView: 1,
      lazy: true,
      keyboard: true,
      speed: 400,
      navigation: {
        nextEl: '.news-page__slider-btn.mod-next',
        prevEl: '.news-page__slider-btn.mod-prev',
      },
    })


    videoWrapperElem.onclick = () => {
      if (!isVideoPlayback) {
        videoWrapperElem.classList.remove('gl__mask-color');
        videoElem.play();
      }
    }

    document.addEventListener('click', e => {
      if (isVideoPlayback) {
        videoWrapperElem.classList.add('gl__mask-color');
        videoElem.pause();
      }
      isVideoPlayback = !isVideoPlayback;
    })
  }
}
