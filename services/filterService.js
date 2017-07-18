import avalon from 'avalon2';

avalon.filters.showPrices = function (priceList) {
    let prices = '';
    if (!priceList) {
        return prices;
    }
    for (let i = 0; i < priceList.length; i++) {
        if (i !== 0) {
            prices += '，';
        }
        prices += priceList[i].discount_price + '/' + priceList[i].count_unit;
    }
    return prices;
}

avalon.filters.decodeHTML = function (str) {
    return decodeURIComponent(str);
}