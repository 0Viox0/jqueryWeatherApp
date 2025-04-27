$(function () {
    const API_KEY = '80c97b686570405694b203455252704';

    $('.appNameContainer').hide().delay(400).fadeIn(1000);

    $form = $('#citySearchForm');
    $searchButton = $form.find('input[type=submit]');

    $form.hide().delay(400).fadeIn(1000);

    $form.on('submit', function (event) {
        event.preventDefault();

        const cityName = $(this).find('input[type=text]').val();

        $.ajax({
            url: 'https://api.weatherapi.com/v1/current.json',
            method: 'GET',
            data: {
                q: cityName,
                key: API_KEY,
            },
            beforeSend: function () {
                $('#searchButton img').attr('src', 'assets/loading.gif');
            },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr) {
                console.log('Error fetching weather data:', xhr);
            },
            complete: function () {
                $('#searchButton img').attr('src', 'assets/SearchIcon.svg');
            },
        });
    });
});
