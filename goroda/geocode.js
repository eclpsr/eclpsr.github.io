ymaps.ready(init);

var gorod = "Москва";



function init () {
	
    ymaps.geocode( gorod , { results: 1 }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0),
        // Создаем карту с нужным центром.
            myMap = new ymaps.Map("map", {
                center: firstGeoObject.geometry.getCoordinates(),
                zoom: 11
            });

        myMap.container.fitToViewport();
        attachReverseGeocode(myMap);

        // Поиск станций метро.
        // Делаем запрос на обратное геокодирование.
        ymaps.geocode(myMap.getCenter(), {
            // Ищем только станции метро.
            kind: 'metro',
            // Ищем в пределах области видимости карты.
            boundedBy: myMap.getBounds(),
            // Запрашиваем не более 20 результатов.
            results: 20
        }).then(function (res) {
            // Задаем изображение для иконок меток.
            res.geoObjects.options.set('preset', 'twirl#metroMoscowIcon');
            // Добавляем полученную коллекцию на карту.
            myMap.geoObjects.add(res.geoObjects);
        });
    }, function (err) {
        // Если геокодирование не удалось, сообщаем об ошибке.
        alert(err.message);
    });

    // При щелчке левой кнопкой мыши выводится
    // информация о месте, на котором щёлкнули.
    function attachReverseGeocode(myMap) {
        myMap.events.add('click', function (e) {
            var coords = e.get('coordPosition');

            // Отправим запрос на геокодирование.
            ymaps.geocode(coords).then(function (res) {
                var names = [];
                // Переберём все найденные результаты и
                // запишем имена найденный объектов в массив names.
                res.geoObjects.each(function (obj) {
                    names.push(obj.properties.get('name'));
                });
                // Добавим на карту метку в точку, по координатам
                // которой запрашивали обратное геокодирование.
                myMap.geoObjects.add(new ymaps.Placemark(coords, {
                    // В качестве контента иконки выведем
                    // первый найденный объект.
                    iconContent:names[0],
                    // А в качестве контента балуна - подробности:
                    // имена всех остальных найденных объектов.
                    balloonContent:names.reverse().join(', ')
                }, {
                    preset:'twirl#redStretchyIcon',
                    balloonMaxWidth:'250'
                }));
            });
        });
    }
}

function showAddress (gorod) {map.removeOverlay(geoResult);var geocoder = new YMaps.Geocoder(value, {results: 1, boundedBy: map.getBounds()});

YMaps.Events.observe(geocoder, geocoder.Events.Load, function () {

if (this.length()) {

geoResult = this.get(0);

map.addOverlay(geoResult);

map.setBounds(geoResult.getBounds());

}else {

alert("Ничего не найдено")

}

});

YMaps.Events.observe(geocoder, geocoder.Events.Fault,

function (error) {alert("Произошла ошибка: " + error.message)});

}

function myFunction() {  

gorod = document.getElementById("city-input").value;
showAddress(gorod);
alert(gorod);
}



