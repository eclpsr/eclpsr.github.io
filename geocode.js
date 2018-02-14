ymaps.ready(init);

function init() {
    // ����� ��������� ������ ������� ���������.
    ymaps.geocode('������ ��������', { results: 1 }).then(function (res) {
        // �������� ������ ��������� ��������������.
        var firstGeoObject = res.geoObjects.get(0),
        // ������� ����� � ������ �������.
            myMap = new ymaps.Map("map", {
                center: firstGeoObject.geometry.getCoordinates(),
                zoom: 11
            });

        myMap.container.fitToViewport();
        attachReverseGeocode(myMap);

        // ����� ������� �����.
        // ������ ������ �� �������� ��������������.
        ymaps.geocode(myMap.getCenter(), {
            // ���� ������ ������� �����.
            kind: 'metro',
            // ���� � �������� ������� ��������� �����.
            boundedBy: myMap.getBounds(),
            // ����������� �� ����� 20 �����������.
            results: 20
        }).then(function (res) {
            // ������ ����������� ��� ������ �����.
            res.geoObjects.options.set('preset', 'twirl#metroMoscowIcon');
            // ��������� ���������� ��������� �� �����.
            myMap.geoObjects.add(res.geoObjects);
        });
    }, function (err) {
        // ���� �������������� �� �������, �������� �� ������.
        alert(err.message);
    });

    // ��� ������ ����� ������� ���� ���������
    // ���������� � �����, �� ������� ��������.
    function attachReverseGeocode(myMap) {
        myMap.events.add('click', function (e) {
            var coords = e.get('coordPosition');

            // �������� ������ �� ��������������.
            ymaps.geocode(coords).then(function (res) {
                var names = [];
                // �������� ��� ��������� ���������� �
                // ������� ����� ��������� �������� � ������ names.
                res.geoObjects.each(function (obj) {
                    names.push(obj.properties.get('name'));
                });
                // ������� �� ����� ����� � �����, �� �����������
                // ������� ����������� �������� ��������������.
                myMap.geoObjects.add(new ymaps.Placemark(coords, {
                    // � �������� �������� ������ �������
                    // ������ ��������� ������.
                    iconContent:names[0],
                    // � � �������� �������� ������ - �����������:
                    // ����� ���� ��������� ��������� ��������.
                    balloonContent:names.reverse().join(', ')
                }, {
                    preset:'twirl#redStretchyIcon',
                    balloonMaxWidth:'250'
                }));
            });
        });
    }

}