$(function () {
    const API_KEY = '80c97b686570405694b203455252704';

    $('.appNameContainer').hide().delay(400).fadeIn(1000);

    $form = $('#citySearchForm');
    $searchButton = $form.find('input[type=submit]');

    let cardCityName, temperature, iconUrl, shortDescription;

    $form.hide().delay(400).fadeIn(1000);

    $(document).on('click', '#saveButton', function () {
        const prevItems = localStorage.getItem('weatherHistory');

        let prevItemsJson;

        $('#saveButton').text('Saved!');

        if (prevItems) {
            prevItemsJson = JSON.parse(prevItems);
        } else {
            prevItemsJson = [];
        }

        if (
            prevItemsJson.find(
                (geoItem) => geoItem.cardCityName === cardCityName,
            )
        ) {
            return;
        }

        prevItemsJson.push({
            cardCityName,
            temperature,
            iconUrl,
            shortDescription,
        });

        localStorage.setItem('weatherHistory', JSON.stringify(prevItemsJson));
    });

    $(document).on('click', '#historyButton', function () {
        location.href = 'history.html';
    });

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
                displayWeatherCard(response);
            },
            error: function () {
                displayError();
            },
            complete: function () {
                $('#searchButton img').attr('src', 'assets/SearchIcon.svg');
                $form.find('input[type=text]').blur();
            },
        });

        function displayWeatherCard(response) {
            $weatherCard = $($('#weatherCardTemplate').html());

            cardCityName = response.location.name;
            iconUrl = `https://${response.current.condition.icon}`;
            shortDescription = response.current.condition.text;
            temperature = response.current.temp_c;

            $weatherCard
                .find('.temperature .temperatureNumber')
                .text(temperature);
            $weatherCard
                .find('.temperatureIconWrapper img')
                .attr('src', iconUrl);
            $weatherCard.find('.shortDescription').text(shortDescription);
            $weatherCard.find('.weatherCardCity').text(cardCityName);

            $('#weatherCardContainer').html($weatherCard);

            $rightButtons = $($('#rightButtonsTemplate').html());

            $('#weatherCardContainer').append($rightButtons);
        }

        function displayError() {
            $errorElement = $($('#errorElement').html());

            $('#weatherCardContainer').html($errorElement);
        }
    });
});
