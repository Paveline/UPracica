// --------------CLASSES--------------//

class AdCollection {
  constructor(adList = []) {
    this._adList = adList.slice();
  }

  // --------------FUNCTIONS--------------//

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let resultAds = [];

    if (typeof filterConfig === 'object' && Object.keys(filterConfig).length) {
      const keys = Object.keys(filterConfig);
      const value = filterConfig[keys[0]];

      if (keys[0] === 'createdAt' || keys[0] === 'validUntil') {
        this._adList.forEach((elem) => {
          const timeRequest = String(new Date(value));
          const time = String(elem[keys]);
          if (time == timeRequest) {
            resultAds.push(elem);
          }
        });
      } else {
        this._adList.forEach((elem) => {
          if (elem[keys] === value) {
            resultAds.push(elem);
          }
        });
      }

      if (resultAds.length !== 0) {
        resultAds.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
    } else {
      resultAds = this._adList.slice();
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

    return resultObj || {};
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
    return (typeof item.id === 'string' &&
      typeof item.desciption === 'string' &&
      item.createdAt instanceof Date &&
      typeof item.link === 'string' &&
      typeof item.vendor === 'string' &&
      item.vendor.length !== 0 &&
      item.hashTags instanceof Array &&
      item.hashTags.length !== 0 &&
      typeof item.discount === 'string' &&
      item.validUntil instanceof Date
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
    this._adList = [];
  }

  getSize() {
    return this._adList.length;
  }
}

class View {
  constructor(user, adCollection) {
    this._user = user;
    this._adCollection = adCollection;
  }

  formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }

  enterInSystem(skip = 0, top = this._adCollection.getSize(), filter = {}) {
    this.createHeader(this._user);
    this.createFilter(this._adCollection);
    this.viewTweets(skip, top, filter);
  }

  createFilter() {
    const selecter = document.querySelector('select');
    selecter.innerHTML = '';

    const options = [];

    this._adCollection.getPage(0, this._adCollection.getSize()).forEach(elem => {
      if (!options.includes(elem.vendor)) {
        options.push(elem.vendor);
      }
    });

    options.forEach(elem => {
      const optionItem = document.createElement('option');
      optionItem.innerHTML = elem;
      optionItem.value = elem;
      selecter.appendChild(optionItem);
    });
  }

  createHeader() {
    if (this._user.ifLogIn) {
      const headerName = document.querySelector('.header__wrapper_btn');
      headerName.innerHTML = this._user.name;
    }
  }

  viewTweets(skip = 0, top = this._adCollection.getSize(), filter = {}) {
    //if user LogIn - show btns
    let LogInButtons = '';

    if (this._user.ifLogIn) {
      LogInButtons = `
        <button class="products__item_btnEdit">EDIT</button>
        <button class="products__item_btnDelete">DELETE</button>
      `
    }

    //get product wrapper for creation
    const itemsWrapper = document.querySelector('.products__wrapper');
    itemsWrapper.innerHTML = '';

    const itemsCollection = [];

    //for each elements from array create card
    this._adCollection.getPage(skip, top, filter).forEach(elem => {
      const adItem = document.createElement('div');
      adItem.classList.add('products__item');

      let reviewsHTML = '';
      elem.reviews.forEach(elem => {
        reviewsHTML += `
        <div class="products__reviews_item">
          <img src="img/avatar.png" alt="Profile">
          <div class="products__reviews_text">${elem}</div>
        </div>
        `;
      });

      let hashtagsHTML = '';
      elem.hashTags.forEach((elem, i) => {
        hashtagsHTML += `
        <div class="tag tag_${i}">#${elem}</div>
        `;
      });

      adItem.innerHTML = `
    <div class="products__item_wrapper">
        <div class="products__item_leftBlock">
            <img class="products__item_icon" src="${elem.photoLink}" alt="">
            <div class="products__item_company">${elem.vendor}</div>
            <img src="img/stars.png" alt="" class="products__item_rating">
            <div class="products__item_sale">${elem.discount}</div>
            <div class="products__item_date">Until ${this.formatDate(elem.validUntil)}</div>
            <button class="products__item_btnReview">Add ReView</button>
            ${LogInButtons}
        </div>
        <div class="products__item_rightBlock">
            <div class="products__item_title">${elem.desciption}</div>
            <div class="products__item_text">Some description here</div>
            <a class="products__item_link" href="${elem.link}">Read Full Version</a>
            <div class="products__reviews">
                <div class="products__reviews_title">Reviews</div>
                ${reviewsHTML}
            </div>
        </div>
    </div>
    <div class="products__item_footer">
        <div class="products__item_tags">
            ${hashtagsHTML}
        </div>
        <div class="products__item_published">${this.formatDate(elem.createdAt)}</div>
    </div>
    `;


      itemsCollection.push(adItem);
    })

    itemsCollection.forEach(elem => {
      itemsWrapper.appendChild(elem);
    });
  };

  removeTweet(id) {
    if (this._adCollection.remove(id)) {
      this.viewTweets();
    }
  }

  addTweet(item) {
    if (this._adCollection.add(item)) {
      this.viewTweets();
    }
  }

  editTweet(id, item) {
    if (this._adCollection.edit(id, item)) {
      this.viewTweets();
    }
  }
}

class User {
  constructor(name, ifLogIn) {
    this.name = name;
    this.ifLogIn = ifLogIn;
  }
}

// --------------GLOBAL FUNCTIONS--------------//
const formatDate = (date) => {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

const enterInSystem = (user, adCollection, skip = 0, top = adCollection.getSize(), filter = {}) => {
  createHeader(user);
  createFilter(adCollection);
  viewTweets(user, adCollection, skip, top, filter);
}

const createFilter = (adCollection) => {
  const selecter = document.querySelector('select');
  selecter.innerHTML = '';

  const options = [];

  adCollection.getPage(0, adCollection.getSize()).forEach(elem => {
    if (!options.includes(elem.vendor)) {
      options.push(elem.vendor);
    }
  });

  options.forEach(elem => {
    const optionItem = document.createElement('option');
    optionItem.innerHTML = elem;
    optionItem.value = elem;
    selecter.appendChild(optionItem);
  });
}

const createHeader = (user) => {
  if (user.ifLogIn) {
    const headerName = document.querySelector('.header__wrapper_btn');
    headerName.innerHTML = user.name;
  }
}

const viewTweets = (user, adCollection, skip = 0, top = adCollection.getSize(), filter = {}) => {
  //if user LogIn - show btns
  let LogInButtons = '';

  if (user.ifLogIn) {
    LogInButtons = `
      <button class="products__item_btnEdit">EDIT</button>
      <button class="products__item_btnDelete">DELETE</button>
    `
  }

  //get product wrapper for creation
  const itemsWrapper = document.querySelector('.products__wrapper');
  itemsWrapper.innerHTML = '';

  const itemsCollection = [];

  //for each elements from array create card
  adCollection.getPage(skip, top, filter).forEach(elem => {
    const adItem = document.createElement('div');
    adItem.classList.add('products__item');

    let reviewsHTML = '';
    elem.reviews.forEach(elem => {
      reviewsHTML += `
      <div class="products__reviews_item">
        <img src="img/avatar.png" alt="Profile">
        <div class="products__reviews_text">${elem}</div>
      </div>
      `;
    });

    let hashtagsHTML = '';
    elem.hashTags.forEach((elem, i) => {
      hashtagsHTML += `
      <div class="tag tag_${i}">#${elem}</div>
      `;
    });

    adItem.innerHTML = `
  <div class="products__item_wrapper">
      <div class="products__item_leftBlock">
          <img class="products__item_icon" src="${elem.photoLink}" alt="">
          <div class="products__item_company">${elem.vendor}</div>
          <img src="img/stars.png" alt="" class="products__item_rating">
          <div class="products__item_sale">${elem.discount}</div>
          <div class="products__item_date">Until ${formatDate(elem.validUntil)}</div>
          <button class="products__item_btnReview">Add ReView</button>
          ${LogInButtons}
      </div>
      <div class="products__item_rightBlock">
          <div class="products__item_title">${elem.desciption}</div>
          <div class="products__item_text">Some description here</div>
          <a class="products__item_link" href="${elem.link}">Read Full Version</a>
          <div class="products__reviews">
              <div class="products__reviews_title">Reviews</div>
              ${reviewsHTML}
          </div>
      </div>
  </div>
  <div class="products__item_footer">
      <div class="products__item_tags">
          ${hashtagsHTML}
      </div>
      <div class="products__item_published">${formatDate(elem.createdAt)}</div>
  </div>
  `;


    itemsCollection.push(adItem);
  })

  itemsCollection.forEach(elem => {
    itemsWrapper.appendChild(elem);
  });
};

const removeTweet = (user, adCollection, id) => {
  if (adCollection.remove(id)) {
    viewTweets(user, adCollection);
  }
}

const addTweet = (user, adCollection, item) => {
  if (adCollection.add(item)) {
    viewTweets(user, adCollection);
  }
}

const editTweet = (user, adCollection, id, item) => {
  if (adCollection.edit(id, item)) {
    viewTweets(user, adCollection);
  }
}


// --------------PROGRAM--------------//

adList = [{
    id: '1',
    desciption: 'PHOTOSHOP - 12% off',
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
    desciption: 'PHOTOSHOP - 12% off',
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
    desciption: 'PHOTOSHOP - 12% off',
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
    desciption: 'PHOTOSHOP - 12% off',
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

//set true if you want to LogIn
const user = new User('Abuba', false);

const viewer = new View(user, adCollection);

viewer.enterInSystem();

enterInSystem(user, adCollection);