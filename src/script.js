class AdCollection {
  constructor(adList) {
    if (arguments.length !== 0) {
      this._adList = adList.slice();
    } else {
      this._adList = [];
    }
  }

  // --------------FUNCTIONS--------------//

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let resultAds = [];

    if (typeof filterConfig === 'object' && Object.keys(filterConfig).length) {
      const keys = Object.keys(filterConfig);
      const value = filterConfig[keys[0]];

      if (keys[0] === 'createdAt' || keys[0] === 'validUntil') {
        adList.forEach((elem) => {
          const timeRequest = String(new Date(value));
          const time = String(elem[keys]);
          if (time == timeRequest) {
            resultAds.push(elem);
          }
        });
      } else {
        adList.forEach((elem) => {
          if (elem[keys] === value) {
            resultAds.push(elem);
          }
        });
      }

      if (resultAds.length !== 0) {
        resultAds.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
    } else {
      resultAds = adList.slice();
      resultAds.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (resultAds.length) {
      const border = skip + top;
      if (border > resultAds.length) {
        resultAds = resultAds.slice(skip, resultAds.length);
      } else {
        resultAds = resultAds.slice(skip, border);
      }
    }

    return resultAds;
  }

  get(id) {
    const resultObj = this._adList.find((elem) => elem.id === id);

    if (resultObj !== undefined) {
      return resultObj;
    }
    return {};
  }

  add(item) {
    if (this._adList.findIndex((ad) => ad.id === item.id) >= 0) {
      return false;
    }

    if (AdCollection.validate(item)) {
      this._adList.push(item);
      return true;
    }
    return false;
  }

  edit(id, item) {
    const keys = Object.keys(item);

    let index;

    const elem = this._adList.find((elem, i) => {
      if (elem.id === id) {
        index = i;
        return true;
      }
    });

    if (elem !== undefined) {
      const cloneElem = {
        ...elem,
      };

      keys.forEach((key) => {
        if (key !== 'id' && key !== 'author' && key !== 'createdAt') {
          const value = item[key];
          cloneElem[key] = value;
        }
      });

      if (AdCollection.validate(cloneElem)) {
        this._adList[index] = {
          ...cloneElem,
        };
        return true;
      }
      return false;
    }
    return false;
  }

  remove(id) {
    for (let i = 0; i < this._adList.length; i++) {
      if (this._adList[i].id === id) {
        this._adList.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  static validate(item) {
    return (typeof item.id === 'string'
            && typeof item.desciption === 'string'
            && item.createdAt instanceof Date
            && typeof item.link === 'string'
            && typeof item.vendor === 'string'
            && item.vendor.length !== 0
            && item.hashTags instanceof Array
            && item.hashTags.length !== 0
            && typeof item.discount === 'string'
            && item.validUntil instanceof Date
    );
  }

  showAllPages() {
    console.log(this._adList);
  }

  addAll(adList) {
    const noValidatedItems = [];

    if (adList.length) {
      adList.forEach((elem) => {
        if (!this.add(elem)) {
          noValidatedItems.push(elem);
        }
      });
    }

    return noValidatedItems;
  }

  clear() {
    while (this._adList.length > 0) {
      this._adList.pop();
    }
  }
}

adList = [{
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
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
  reviews: ['Gamers like it!', 'Norm!', 'Super!'],
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
  reviews: ['Cool!', 'Music!', 'Top!'],
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
  reviews: ['Usefull program!', 'Interesting!', 'Smart!'],
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
  reviews: ['Nice', 'Flex!', 'Big sale man!'],
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
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
  reviews: ['Gamers like it!', 'Norm!', 'Super!'],
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
  reviews: ['Cool!', 'Music!', 'Top!'],
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
  reviews: ['Usefull program!', 'Interesting!', 'Smart!'],
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
  reviews: ['Nice', 'Flex!', 'Big sale man!'],
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
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
  reviews: ['Gamers like it!', 'Norm!', 'Super!'],
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
  reviews: ['Cool!', 'Music!', 'Top!'],
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
  reviews: ['Usefull program!', 'Interesting!', 'Smart!'],
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
  reviews: ['Nice', 'Flex!', 'Big sale man!'],
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
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
  reviews: ['Gamers like it!', 'Norm!', 'Super!'],
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
  reviews: ['Cool!', 'Music!', 'Top!'],
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
  reviews: ['Usefull program!', 'Interesting!', 'Smart!'],
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
  reviews: ['Nice', 'Flex!', 'Big sale man!'],
},
];

const adCollection = new AdCollection(adList);

// --------------TESTS--------------//

// getPage
console.log('getPage');

console.log(adCollection.getPage());

console.log(adCollection.getPage(5));

console.log(adCollection.getPage(5, 2));

console.log(adCollection.getPage(0, 10, {}));

console.log(adCollection.getPage(0, 10, {
  vendor: 'Apple',
}));

// get
console.log('get');

console.log(adCollection.get('1'));

console.log(adCollection.get('100'));

// validate
console.log('validate');

console.log(AdCollection.validate({}));

console.log(AdCollection.validate({
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
}));

console.log(AdCollection.validate({
  id: '0',
  desciption: 'Adobe PHOTOSHOP',
  createdAt: new Date('2021-03-16T00:00:00'),
  link: 'https://www.adobe.com/',
  vendor: 'Adobe',
  photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
  hashTags: [],
}));

console.log(AdCollection.validate({
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
}));

// add
console.log('add');

console.log(adCollection.add({}));
adCollection.showAllPages();

console.log(adCollection.add({
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
}));
adCollection.showAllPages();

console.log(adCollection.add({
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
  reviews: ['Wow!', 'Norm!', 'Super!'],
}));
adCollection.showAllPages();

console.log(adCollection.add({
  id: '5',
  desciption: 'Adobe PHOTOSHOP',
  createdAt: new Date('2021-03-16T00:00:00'),
  link: 'https://www.adobe.com/',
  vendor: 'Adobe',
}));
adCollection.showAllPages();

// edit
console.log('edit');

console.log(adCollection.edit('1', {}), adCollection.get('1'));

console.log(adCollection.edit('-1', {}));

console.log(adCollection.edit('5', {
  vendor: 'Nike',
}), adCollection.get('5'));

console.log(adCollection.edit('5', {
  vendor: 'Nike',
  discount: '0%',
  id: '-100',
}), adCollection.get('5'));

console.log(adCollection.edit('5', {
  vendor: 12345,
}), adCollection.get('5'));

// remove
console.log('remove');

adCollection.showAllPages();

console.log(adCollection.remove('1'));
adCollection.showAllPages();

console.log(adCollection.remove('100'));
adCollection.showAllPages();

// addAll
console.log('addAll');

console.log(adCollection.addAll([]));

console.log(adCollection.addAll([{}, {
  a: 1,
}, {
  id: '100',
  desciption: 'Adobe PHOTOSHOP - 12% off',
  createdAt: new Date('2021-03-16T00:00:00'),
  link: 'https://www.adobe.com/',
  vendor: 'Adobe',
  photoLink: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
  hashTags: ['adobe', 'art', 'program'],
  discount: '12%',
  validUntil: new Date('2077-12-12T00:00:00'),
  rating: 5,
  reviews: ['Wow!', 'Norm!', 'Super!'],
}]));

adCollection.showAllPages();

// clear
console.log('clear');

adCollection.clear();
adCollection.showAllPages();

console.log(adCollection.get('1'));
