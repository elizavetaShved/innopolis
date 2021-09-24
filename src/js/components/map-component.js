export class MapComponent {
  mapElem;

  constructor() {
    const hostElem = document.querySelector('#map-host');
    if (!hostElem) return;
    this.initMap = this.initMap.bind(this);
    this.mapElem = hostElem.querySelector('.js-contacts-map');

    ymaps.ready(this.initMap);
  }

  initMap() {
    const dataLat = Number(this.mapElem.getAttribute('data-lat'));
    const dataLng = Number(this.mapElem.getAttribute('data-lng'));
    const dataZoom = Number(this.mapElem.getAttribute('data-zoom'));
    const dataAddress = this.mapElem.getAttribute('data-address');
    const dataPinURL = this.mapElem.getAttribute('data-pin');

    let pinOptions = {
      iconLayout: 'default#image',
      iconImageHref: dataPinURL,
      iconImageSize: window.innerWidth >= 768 ? [66, 84] : [56, 64],
      iconImageOffset: [-33, -85]
    };

    const center = [dataLat, dataLng];

    const geoPing = window.innerWidth >= 768 ? [dataLat - 0.0001, dataLng + 0.0004] : center;
    const geoPingBalloon = window.innerWidth >= 768 ? [dataLat + 0.00067, dataLng - 0.0025] : center;

    const mapInstance = new ymaps.Map(this.mapElem, {
      center: geoPing,
      zoom: dataZoom,
      controls: []
    });

    mapInstance.behaviors.disable('scrollZoom');

    mapInstance.controls.add('zoomControl', {
      position: {
        right: 10,
        top: 150
      },
      size: 'small',
    })

    const balloonMaps = [
      {
        coords: geoPingBalloon,
        title: dataAddress
      }
    ];

    const pointsMapData = [{
      coords: geoPingBalloon
    }];

    ///

    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover top">' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize minWidth=150 maxWidth=300 maxHeight=450]]' +
      '</div>' +
      '</div>',
      {
        build: function () {
          this.constructor.superclass.build.call(this);
          this._$element = $('.popover', this.getParentElement());
          this.applyElementOffset();
          this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
        },

        clear: function () {
          this._$element.find('.close').off('click');
          this.constructor.superclass.clear.call(this);
        },

        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();
          this.events.fire('shapechange');
        },
        applyElementOffset: function () {
          this._$element.css({
            right: -(this._$element[0].offsetWidth),
            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
          });
        },

        onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire('userclose');
        },

        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          const position = this._$element.position();
          return new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [position.left, position.top],
              [
                position.left + this._$element[0].offsetWidth,
                position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
              ]
            ])
          );
        },

        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      }
    );
    // Создание вложенного макета содержимого балуна.
    let htmlBalloon =
      '<div class="popover-wrapper">'
    ;
    balloonMaps.forEach(map => {
      htmlBalloon +=
        '<div class="popover-item">' +
        `<div class="popover-title">${ map.title }</div>`
    })
    htmlBalloon += '</div></div>';

    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      htmlBalloon
    );

    const objectManager = new ymaps.ObjectManager({
      clusterize: false,
      clusterHasBalloon: false,
      geoObjectOpenBalloonOnClick: true
    });
    mapInstance.geoObjects.add(objectManager);

    pointsMapData.forEach(function (item) {
      const objectToAdd = {
        id: item.coords.join('-'),
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: item.coords
        },
        options: {
          ...pinOptions,
          balloonShadow: false,
          balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          balloonOffset: [0, 0]
        },
        properties: {
          balloonContent: item.content,
          balloonHeader: item.title
        }
      };
      objectManager.add(objectToAdd);
      objectManager.objects.balloon.open(item.coords.join('-'));
    });

    ///
  }
}
