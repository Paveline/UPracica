let addItemPrototype = {
    id: '0',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe',
    photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
    hashTags: ['adobe', 'art', 'program'],
    discount: '12%',
    validUntil: new Date('2077-12-12T00:00:00'),
    rating: 5,
    reviews: ['Wow!', 'Norm!', 'Super!']
}

let adList = [{
        id: '1',
        desciption: 'Adobe PHOTOSHOP - 12% off',
        createdAt: new Date('2021-03-16T00:00:00'),
        link: 'https://www.adobe.com/',
        vendor: 'Adobe',
        photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
        hashTags: ['adobe', 'art', 'program'],
        discount: '12%',
        validUntil: new Date('2077-12-12T00:00:00'),
        rating: 5,
        reviews: ['Wow!', 'Norm!', 'Super!']
    },
    {
        id: '2',
        desciption: 'Steam - 30% off',
        createdAt: new Date('2021-01-12T00:00:00'),
        link: 'https://store.steampowered.com/',
        vendor: 'Steam',
        photoLink: 'https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016',
        hashTags: ['steam', 'games', 'program'],
        discount: '30%',
        validUntil: new Date('2050-11-12T00:00:00'),
        rating: 5,
        reviews: ['Gamers like it!', 'Norm!', 'Super!']
    },
    {
        id: '3',
        desciption: 'Spotify - 25% off',
        createdAt: new Date('2021-02-20T00:00:00'),
        link: 'https://www.spotify.com/',
        vendor: 'Spotify',
        photoLink: 'https://yt3.ggpht.com/ytc/AAUvwngewBL8V1Sxnl0IZmrdQZcvojcLFb1N1HpPllzrog=s900-c-k-c0x00ffffff-no-rj',
        hashTags: ['spotify', 'music', 'program'],
        discount: '25%',
        validUntil: new Date('2040-10-10T00:00:00'),
        rating: 5,
        reviews: ['Cool!', 'Music!', 'Top!']
    },
    {
        id: '4',
        desciption: 'Tilda - 50% off',
        createdAt: new Date('2021-02-25T00:00:00'),
        link: 'https://tilda.cc/ru/',
        vendor: 'Tilda',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tilda_Logo.png',
        hashTags: ['tilda', 'websites', 'program'],
        discount: '50%',
        validUntil: new Date('2030-01-01T00:00:00'),
        rating: 5,
        reviews: ['Usefull program!', 'Interesting!', 'Smart!']
    },
    {
        id: '5',
        desciption: 'Apple - 99% off',
        createdAt: new Date('2021-01-15T00:00:00'),
        link: 'https://www.apple.com/',
        vendor: 'Apple',
        photoLink: 'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',
        hashTags: ['apple', 'phones', 'laptops'],
        discount: '99%',
        validUntil: new Date('2025-03-18T00:00:00'),
        rating: 5,
        reviews: ['Nice', 'Flex!', 'Big sale man!']
    },
    {
        id: '6',
        desciption: 'Adobe PHOTOSHOP - 12% off',
        createdAt: new Date('2021-03-16T00:00:00'),
        link: 'https://www.adobe.com/',
        vendor: 'Adobe',
        photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
        hashTags: ['adobe', 'art', 'program'],
        discount: '12%',
        validUntil: new Date('2077-12-12T00:00:00'),
        rating: 5,
        reviews: ['Wow!', 'Norm!', 'Super!']
    },
    {
        id: '7',
        desciption: 'Steam - 30% off',
        createdAt: new Date('2021-01-12T00:00:00'),
        link: 'https://store.steampowered.com/',
        vendor: 'Steam',
        photoLink: 'https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016',
        hashTags: ['steam', 'games', 'program'],
        discount: '30%',
        validUntil: new Date('2050-11-12T00:00:00'),
        rating: 5,
        reviews: ['Gamers like it!', 'Norm!', 'Super!']
    },
    {
        id: '8',
        desciption: 'Spotify - 25% off',
        createdAt: new Date('2021-02-20T00:00:00'),
        link: 'https://www.spotify.com/',
        vendor: 'Spotify',
        photoLink: 'https://yt3.ggpht.com/ytc/AAUvwngewBL8V1Sxnl0IZmrdQZcvojcLFb1N1HpPllzrog=s900-c-k-c0x00ffffff-no-rj',
        hashTags: ['spotify', 'music', 'program'],
        discount: '25%',
        validUntil: new Date('2040-10-10T00:00:00'),
        rating: 5,
        reviews: ['Cool!', 'Music!', 'Top!']
    },
    {
        id: '9',
        desciption: 'Tilda - 50% off',
        createdAt: new Date('2021-02-25T00:00:00'),
        link: 'https://tilda.cc/ru/',
        vendor: 'Tilda',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tilda_Logo.png',
        hashTags: ['tilda', 'websites', 'program'],
        discount: '50%',
        validUntil: new Date('2030-01-01T00:00:00'),
        rating: 5,
        reviews: ['Usefull program!', 'Interesting!', 'Smart!']
    },
    {
        id: '10',
        desciption: 'Apple - 99% off',
        createdAt: new Date('2021-01-15T00:00:00'),
        link: 'https://www.apple.com/',
        vendor: 'Apple',
        photoLink: 'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',
        hashTags: ['apple', 'phones', 'laptops'],
        discount: '99%',
        validUntil: new Date('2025-03-18T00:00:00'),
        rating: 5,
        reviews: ['Nice', 'Flex!', 'Big sale man!']
    },
    {
        id: '11',
        desciption: 'Adobe PHOTOSHOP - 12% off',
        createdAt: new Date('2021-03-16T00:00:00'),
        link: 'https://www.adobe.com/',
        vendor: 'Adobe',
        photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
        hashTags: ['adobe', 'art', 'program'],
        discount: '12%',
        validUntil: new Date('2077-12-12T00:00:00'),
        rating: 5,
        reviews: ['Wow!', 'Norm!', 'Super!']
    },
    {
        id: '12',
        desciption: 'Steam - 30% off',
        createdAt: new Date('2021-01-12T00:00:00'),
        link: 'https://store.steampowered.com/',
        vendor: 'Steam',
        photoLink: 'https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016',
        hashTags: ['steam', 'games', 'program'],
        discount: '30%',
        validUntil: new Date('2050-11-12T00:00:00'),
        rating: 5,
        reviews: ['Gamers like it!', 'Norm!', 'Super!']
    },
    {
        id: '13',
        desciption: 'Spotify - 25% off',
        createdAt: new Date('2021-02-20T00:00:00'),
        link: 'https://www.spotify.com/',
        vendor: 'Spotify',
        photoLink: 'https://yt3.ggpht.com/ytc/AAUvwngewBL8V1Sxnl0IZmrdQZcvojcLFb1N1HpPllzrog=s900-c-k-c0x00ffffff-no-rj',
        hashTags: ['spotify', 'music', 'program'],
        discount: '25%',
        validUntil: new Date('2040-10-10T00:00:00'),
        rating: 5,
        reviews: ['Cool!', 'Music!', 'Top!']
    },
    {
        id: '14',
        desciption: 'Tilda - 50% off',
        createdAt: new Date('2021-02-25T00:00:00'),
        link: 'https://tilda.cc/ru/',
        vendor: 'Tilda',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tilda_Logo.png',
        hashTags: ['tilda', 'websites', 'program'],
        discount: '50%',
        validUntil: new Date('2030-01-01T00:00:00'),
        rating: 5,
        reviews: ['Usefull program!', 'Interesting!', 'Smart!']
    },
    {
        id: '15',
        desciption: 'Apple - 99% off',
        createdAt: new Date('2021-01-15T00:00:00'),
        link: 'https://www.apple.com/',
        vendor: 'Apple',
        photoLink: 'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',
        hashTags: ['apple', 'phones', 'laptops'],
        discount: '99%',
        validUntil: new Date('2025-03-18T00:00:00'),
        rating: 5,
        reviews: ['Nice', 'Flex!', 'Big sale man!']
    },
    {
        id: '16',
        desciption: 'Adobe PHOTOSHOP - 12% off',
        createdAt: new Date('2021-03-16T00:00:00'),
        link: 'https://www.adobe.com/',
        vendor: 'Adobe',
        photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
        hashTags: ['adobe', 'art', 'program'],
        discount: '12%',
        validUntil: new Date('2077-12-12T00:00:00'),
        rating: 5,
        reviews: ['Wow!', 'Norm!', 'Super!']
    },
    {
        id: '17',
        desciption: 'Steam - 30% off',
        createdAt: new Date('2021-01-12T00:00:00'),
        link: 'https://store.steampowered.com/',
        vendor: 'Steam',
        photoLink: 'https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016',
        hashTags: ['steam', 'games', 'program'],
        discount: '30%',
        validUntil: new Date('2050-11-12T00:00:00'),
        rating: 5,
        reviews: ['Gamers like it!', 'Norm!', 'Super!']
    },
    {
        id: '18',
        desciption: 'Spotify - 25% off',
        createdAt: new Date('2021-02-20T00:00:00'),
        link: 'https://www.spotify.com/',
        vendor: 'Spotify',
        photoLink: 'https://yt3.ggpht.com/ytc/AAUvwngewBL8V1Sxnl0IZmrdQZcvojcLFb1N1HpPllzrog=s900-c-k-c0x00ffffff-no-rj',
        hashTags: ['spotify', 'music', 'program'],
        discount: '25%',
        validUntil: new Date('2040-10-10T00:00:00'),
        rating: 5,
        reviews: ['Cool!', 'Music!', 'Top!']
    },
    {
        id: '19',
        desciption: 'Tilda - 50% off',
        createdAt: new Date('2021-02-25T00:00:00'),
        link: 'https://tilda.cc/ru/',
        vendor: 'Tilda',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tilda_Logo.png',
        hashTags: ['tilda', 'websites', 'program'],
        discount: '50%',
        validUntil: new Date('2030-01-01T00:00:00'),
        rating: 5,
        reviews: ['Usefull program!', 'Interesting!', 'Smart!']
    },
    {
        id: '20',
        desciption: 'Apple - 99% off',
        createdAt: new Date('2021-01-15T00:00:00'),
        link: 'https://www.apple.com/',
        vendor: 'Apple',
        photoLink: 'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',
        hashTags: ['apple', 'phones', 'laptops'],
        discount: '99%',
        validUntil: new Date('2025-03-18T00:00:00'),
        rating: 5,
        reviews: ['Nice', 'Flex!', 'Big sale man!']
    },
]

//--------------FUNCTIONS--------------//

let getAds = (function (skip = 0, top = 10, filterConfig = {}) {

    let resultAds = [];

    if (Object.keys(filterConfig).length !== 0 && filterConfig.constructor === Object) {
        let key = Object.keys(filterConfig);
        let value = filterConfig[key[0]];

        if (key[0] === 'createdAt' || key[0] === 'validUntil') {
            adList.forEach(elem => {
                let timeRequest = String(new Date(value));
                let time = String(elem[key]);
                if (time == timeRequest)
                    resultAds.push(elem);
            });
        } else {
            adList.forEach(elem => {
                if (elem[key] === value)
                    resultAds.push(elem);
            });
        }

        if (resultAds.length !== 0) {
            resultAds.sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
        }
    } else {
        resultAds = adList.slice();
        resultAds.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    }

    if (resultAds.length !== 0) {
        let border = skip + top;
        if (border > resultAds.length)
            resultAds = resultAds.slice(skip, resultAds.length);
        else
            resultAds = resultAds.slice(skip, border);
    }

    return resultAds;
});

let getAd = (function (id) {
    for (let i = 0; i < adList.length; i++) {
        if (adList[i].id === id)
            return adList[i];
    }

    return {};
});

let validateAd = (function (item) {
    if (typeof (item.id) == 'string' &&
        typeof (item.desciption) == 'string' &&
        item.createdAt instanceof Date &&
        typeof (item.link) == 'string' &&
        typeof (item.vendor) == 'string' &&
        item.vendor.length !== 0 &&
        //typeof (item.photoLink) === 'string' &&
        item.hashTags instanceof Array &&
        item.hashTags.length !== 0 &&
        typeof (item.discount) == 'string' &&
        item.validUntil instanceof Date //&&
        //typeof (item.rating) === 'number' &&
        //item.reviews instanceof Array
    )
        return true;
    else
        return false;
});

let addAd = (function (item) {
    for (let i = 0; i < adList.length; i++) {
        if (adList[i].id === item.id) {
            return false;
        }
    }

    if (validateAd(item)) {
        adList.push(item);
        return true;
    } else
        return false;
});

let editAd = (function (id, item) {
    let key = Object.keys(item);
    let value = item[key[0]];

    let elem = adList.find((elem) => {
        if (elem.id === id)
            return true;
    });

    if (key[0] !== 'id' && key[0] !== 'author' && key[0] !== 'createdAt') {
        elem[key[0]] = value;
        if (validateAd(elem))
            return true;
        else
            return false;
    } else
        return false;
});

let removeAd = (function (id) {
    for (let i = 0; i < adList.length; i++) {
        if (adList[i].id === id) {
            adList.splice(i, 1);
            return true;
        }
    }

    return false;
});

//--------------TESTS--------------//

//getAds
console.log('getAds');

console.log(getAds());

console.log(getAds(5));

console.log(getAds(5, 2));

console.log(getAds(0, 10, {}));

console.log(getAds(0, 10, {
    vendor: 'Apple'
}));

//getAd
console.log('getAd');

console.log(getAd('1'));

console.log(getAd('100'));

//validateAd
console.log('validateAd');

console.log(validateAd({}));

console.log(validateAd({
    id: '0',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe',
    photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
    hashTags: ['adobe', 'art', 'program'],
    discount: '12%',
    validUntil: new Date('2077-12-12T00:00:00'),
    rating: 5,
    reviews: ['Wow!', 'Norm!', 'Super!']
}));

console.log(validateAd({
    id: '0',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe',
    photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
    hashTags: []
}));

console.log(validateAd({
    id: '0',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe',
    photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
    hashTags: [],
    discount: '12%',
    validUntil: new Date('2077-12-12T00:00:00'),
    rating: 5,
    reviews: ['Wow!', 'Norm!', 'Super!']
}));

//addAd
console.log('addAd');

console.log(addAd({}), adList);

console.log(addAd({
    id: '0',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe',
    photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
    hashTags: ['adobe', 'art', 'program'],
    discount: '12%',
    validUntil: new Date('2077-12-12T00:00:00'),
    rating: 5,
    reviews: ['Wow!', 'Norm!', 'Super!']
}), adList);

console.log(addAd({
    id: '5',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe',
    photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
    hashTags: ['adobe', 'art', 'program'],
    discount: '12%',
    validUntil: new Date('2077-12-12T00:00:00'),
    rating: 5,
    reviews: ['Wow!', 'Norm!', 'Super!']
}), adList);


console.log(addAd({
    id: '5',
    desciption: 'Adobe PHOTOSHOP',
    createdAt: new Date('2021-03-16T00:00:00'),
    link: 'https://www.adobe.com/',
    vendor: 'Adobe'
}));

//editAd
console.log('editAd');

console.log(editAd('1', {}), getAd('1'));

console.log(editAd('5', {
    vendor: 'Nike'
}), getAd('5'));

console.log(editAd('5', {
    vendor: 12345
}), getAd('5'));

//removeAd
console.log('removeAd')

console.log(removeAd('0'), adList);

console.log(removeAd('100'), adList);