$(function () {
    let cityFilter, temperatureFilter;

    loadCards();

    $('#savedCardContainer').on('click', '#removeCardButton', function (event) {
        const chosenCity = $(event.target)
            .closest('.weatherCard')
            .find('.cityRemoveButtonWrapper')
            .text()
            .trim();

        const cardsRaw = localStorage.getItem('weatherHistory');
        let cards = JSON.parse(cardsRaw);

        cards = cards.filter((card) => card.cardCityName !== chosenCity);

        localStorage.setItem('weatherHistory', JSON.stringify(cards));

        loadCards();
    });

    $('#filterFormControls .backButton').on('click', function () {
        window.history.back();
    });

    $('#filterFormControls').on('submit', function (event) {
        event.preventDefault();

        cityFilter = $(this).find('input[type=text]').val();
        temperatureFilter = parseFloat(
            $(this).find('input[type=number]').val(),
        );

        loadCards();
    });

    function loadCards() {
        $weatherCardsContainer = $('#savedCardContainer');
        $weatherCardsContainer.html('');

        const cardsRaw = localStorage.getItem('weatherHistory');
        const cards = JSON.parse(cardsRaw).filter(weatherformFilter);

        cards.forEach((card) => {
            $weatherCard = $($('#weatherCardTemplate').html());
            $weatherCard
                .find('.temperature .temperatureNumber')
                .text(card.temperature);
            $weatherCard
                .find('.temperatureIconWrapper img')
                .attr('src', card.iconUrl);
            $weatherCard.find('.shortDescription').text(card.shortDescription);
            $weatherCard.find('.weatherCardCity').text(card.cardCityName);

            $weatherCardsContainer.append($weatherCard);
        });
    }

    function weatherformFilter(item) {
        return (
            (!cityFilter ||
                item.cardCityName
                    .toLowerCase()
                    .includes(cityFilter.toLowerCase())) &
            (!temperatureFilter || item.temperature === temperatureFilter)
        );
    }
});
