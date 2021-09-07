"use strict";
export const oldInit = () => {

  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
    return _typeof(obj);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  /* ^^^
   * Глобальные-вспомогательные функции
   * ========================================================================== */

  /* ^^^
   * Viewport Height Correction
   *
   * @link https://www.npmjs.com/package/postcss-viewport-height-correction
   * ========================================================================== */
  function setViewportProperty() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }

  window.addEventListener('resize', setViewportProperty);
  setViewportProperty(); // Call the fuction for initialisation

  /* ^^^
   * Возвращает HTML-код иконки из SVG-спрайта
   *
   * @param {String} name Название иконки из спрайта
   * @param {Object} opts Объект настроек для SVG-иконки
   *
   * @example SVG-иконка
   * getSVGSpriteIcon('some-icon', {
   *   tag: 'div',
   *   type: 'icons', // colored для подключения иконки из цветного спрайта
   *   class: '', // дополнительные классы для иконки
   *   mode: 'inline', // external для подключаемых спрайтов
   *   url: '', // путь до файла спрайта, необходим только для подключаемых спрайтов
   * });
   */

  function getSVGSpriteIcon(name, opts) {
    opts = _extends({
      tag: 'div',
      type: 'icons',
      "class": '',
      mode: 'inline',
      url: ''
    }, opts);
    var external = '';
    var typeClass = '';

    if (opts.mode === 'external') {
      external = "".concat(opts.url, "/sprite.").concat(opts.type, ".svg");
    }

    if (opts.type !== 'icons') {
      typeClass = " svg-icon--".concat(opts.type);
    }

    opts["class"] = opts["class"] ? " ".concat(opts["class"]) : '';
    return "\n    <".concat(opts.tag, " class=\"svg-icon svg-icon--").concat(name).concat(typeClass).concat(opts["class"], "\" aria-hidden=\"true\" focusable=\"false\">\n      <svg class=\"svg-icon__link\">\n        <use xlink:href=\"").concat(external, "#").concat(name, "\"></use>\n      </svg>\n    </").concat(opts.tag, ">\n  ");
  }

  /* ^^^
   * JQUERY Actions
   * ========================================================================== */


  $(function () {
    'use strict';
    /**
     * определение существования элемента на странице
     */

    $.exists = function (selector) {
      return $(selector).length > 0;
    };

    $('.navigation-link').on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
        id = $this.attr('href');

      if (!$(id).length) {
        return false;
      }

      var offsetTop = $(id).offset().top + 1;
      $('html').removeClass('is-locked');
      $('.mobile-box, .app-header__burger').removeClass('opened');
      $('html, body').animate({
        scrollTop: offsetTop
      }, 600);
    });
    $('.app-header__language-title').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.app-header__language').find('.app-header__language-body').slideToggle(400);
    });
    $('.app-header__language-item').on('click', function (e) {
      var name = $(this).text(),
        parrent = $(this).closest('.app-header__language');
      parrent.find('.app-header__language-item').removeClass('active');
      parrent.find('.app-header__language-title').text(name);
      $(this).addClass('active');
      parrent.find('.app-header__language-body').slideToggle(400);
    });
    // $('.faq-block__item-title, .faq-block__item-icon').on('click', function (e) {
    //   e.preventDefault();
    //   var $this = $(this);
    //   $this.closest('.faq-block__item').toggleClass('opened');
    //
    //   if ($this.closest('.faq-block__item').hasClass('opened')) {
    //     setTimeout(function () {
    //       $this.closest('.faq-block__item').find('.faq-block__item-body').slideToggle(400);
    //     }, 100);
    //   } else {
    //     $this.closest('.faq-block__item').find('.faq-block__item-body').css('display', 'none');
    //   }
    // });

    function yaMapInit() {
      if (typeof ymaps === "undefined" ? "undefined" : _typeof(ymaps)) {
        // Как только будет загружен API и готов DOM, выполняем инициализацию
        init();
        clearInterval(yaMapInterval);
      }
    }

    var yaMapInterval = setInterval(yaMapInit, 1000); // Инициализация и уничтожение карты при нажатии на кнопку.

    function init() {
      if (!$('.map-block__map').length) {
        return;
      }

      var mapCount = 0;
      $('.map-block__map').each(function () {
        var myMap;
        var mapid = 'map' + mapCount;
        $(this).attr('id', mapid);
        var activeItem = $(this);
        var center = activeItem.data('center').split(',');
        var address = activeItem.data('address');
        var dopAddress = activeItem.data('dopadress');
        var zoom = activeItem.data('zoom'); // Создание карты.

        var myMap = new ymaps.Map(mapid, {
          center: center,
          zoom: 7,
          controls: []
        });
        var coords;
        dopAddress.forEach(function (item, i, arr) {
          coords = item.coordinates.split(',');
          var dopAdd = item.adress;
          myMap.geoObjects.add(new ymaps.Placemark(coords, {
            zoom: 7,
            balloonContent: address
          }, {
            iconLayout: 'default#image',
            iconImageHref: "../img/map-ballon.svg",
            iconImageSize: [55, 55],
            iconImageOffset: [-27, -27]
          }));
        });

        if (dopAddress.length < 2) {
          myMap.setCenter(coords, zoom);
        } else {
          myMap.setBounds(myMap.geoObjects.getBounds());
        }

        mapCount = mapCount + 1;
      });
    }

    // $('.app-header__burger').on('click', function (e) {
    //   e.preventDefault();
    //   $('html').toggleClass('is-locked');
    //   $('.mobile-box, .app-header__burger').toggleClass('opened'); // $('.app-header__top-pannel.fixed').removeClass('fixed');
    //   // $('.app-header').css('paddingTop', '');
    // });

    if ($('.news-block__list').length) {
      var sliderMainText = tns({
        "container": '.news-block__list',
        "nav": false,
        "gutter": 0,
        "items": 1,
        "loop": true,
        "controlsContainer": ".news-block__slider-nav",
        "axis": "horizontal",
        "mouseDrag": false,
        "responsive": {
          "767": {
            "gutter": 110,
            "items": 2
          }
        }
      });
    }

    var PAGE = $('html, body');
    var pageScroller = $('.page-scroller');
    var inMemoryClass = 'page-scroller--memorized';
    var isVisibleClass = 'page-scroller--visible';
    var enabledOffset = 60;
    var pageYOffset = 0;
    var inMemory = false;

    function resetPageScroller() {
      setTimeout(function () {
        if (window.pageYOffset > enabledOffset) {
          pageScroller.addClass(isVisibleClass);
        } else if (!pageScroller.hasClass(inMemoryClass)) {
          pageScroller.removeClass(isVisibleClass);
        }
      }, 150);

      if (!inMemory) {
        pageYOffset = 0;
        pageScroller.removeClass(inMemoryClass);
      }

      inMemory = false;
    }

    if (pageScroller.length > 0) {
      window.addEventListener('scroll', resetPageScroller, window.supportsPassive ? {
        passive: true
      } : false);
      pageScroller.on('click', function (event) {
        event.preventDefault();
        window.removeEventListener('scroll', resetPageScroller);

        if (window.pageYOffset > 0 && pageYOffset === 0) {
          inMemory = true;
          pageYOffset = window.pageYOffset;
          pageScroller.addClass(inMemoryClass);
          PAGE.stop().animate({
            scrollTop: 0
          }, 500, 'swing', function () {
            window.addEventListener('scroll', resetPageScroller, window.supportsPassive ? {
              passive: true
            } : false);
          });
        } else {
          pageScroller.removeClass(inMemoryClass);
          PAGE.stop().animate({
            scrollTop: pageYOffset
          }, 500, 'swing', function () {
            pageYOffset = 0;
            window.addEventListener('scroll', resetPageScroller, window.supportsPassive ? {
              passive: true
            } : false);
          });
        }
      });
    }

    function submitForm() {
      $('.popup-form__form').on('submit', function (event) {
        event.preventDefault();
        var $this = $(this);
        var $thisInputVal = $this.find('input').val();
        if ($thisInputVal != '') {
          $this.closest('.popup-form__section').addClass('success');
          $this.closest('.popup-form').addClass('success-form').find('.popup-success').fadeIn();
          setTimeout(function () {
            $this.closest('.app').find('.remodal-overlay').css('display', 'none');
            $this.closest('.app').find('.remodal-wrapper').css('display', 'none');
            $this.closest('.popup-form__section').removeClass('success');
            $this.closest('.popup-form').removeClass('success-form').find('.popup-success').fadeOut();
            $('html').removeClass('remodal-is-locked');
            $('body').css('padding-right', 0);
          }, 3000);
        } else {
          $this.find('input').addClass('is-error');
          $this.find('.popup-form__warning').addClass('is-warning');
        }
      });
    }

    submitForm(); // http://hilios.github.io/jQuery.countdown/

    // (function () {
    //   if (!$(".site-countdown").length) {
    //     return;
    //   }
    //
    //   $(".site-countdown").each(function () {
    //     var self = $(this);
    //     self.countdown(self.data('end-time'), function (event) {
    //       var format = ' %H:%M:%S';
    //
    //       if (event.offset.totalDays == 0) {
    //         $(this).parent().addClass('warning');
    //       }
    //
    //       if (event.offset.totalDays > 0) {
    //         format = ' %-d ' + plural(event.offset.days, ['день', 'дня', 'дней']) + format;
    //       } // if(event.offset.weeks > 0) {
    //       //     format = ' %-w ' + plural(event.offset.days, ['неделя', 'недель', 'недели'])  + format;
    //       // }
    //       // $(this).html(event.strftime(format));
    //
    //
    //       var day = event.offset.totalDays < 10 ? '0' + event.offset.totalDays : event.offset.totalDays,
    //         hourts = event.offset.hours < 10 ? '0' + event.offset.hours : event.offset.hours,
    //         minutes = event.offset.minutes < 10 ? '0' + event.offset.minutes : event.offset.minutes,
    //         seconds = event.offset.seconds < 10 ? '0' + event.offset.seconds : event.offset.seconds;
    //       $(this).find('.day > .time-body').html(day);
    //       $(this).find('.hourts > .time-body').html(hourts);
    //       $(this).find('.minutes > .time-body').html(minutes);
    //       $(this).find('.seconds > .time-body').html(seconds);
    //     });
    //     $(".site-countdown").on('finish.countdown', function (event) {
    //       $(this).html('Акция завершена!').parent().addClass('disabled');
    //     });
    //   });
    //
    //   function plural(number, variants) {
    //     var idx = 2;
    //
    //     if (number % 10 === 1 && number % 100 !== 11) {
    //       idx = 0;
    //     } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    //       idx = 1;
    //     }
    //
    //     return variants[idx];
    //   }
    //
    //   ;
    // })();
  });
}
