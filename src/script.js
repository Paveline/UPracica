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
      } else if (keys[0] === 'hashTags') {
        this._adList.forEach(elem => {
          if (elem.hashTags.indexOf(value) != -1) {
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
  constructor(userList, adCollection) {
    this._userList = userList;
    this._adCollection = adCollection;
    this._numberOfShownTweets = 10;
  }

  formatDate(date) {
    // let dd = date.getDate();
    // if (dd < 10) dd = '0' + dd;

    // let mm = date.getMonth() + 1;
    // if (mm < 10) mm = '0' + mm;

    // let yy = date.getFullYear() % 100;
    // if (yy < 10) yy = '0' + yy;

    // return dd + '.' + mm + '.' + yy;

    let d = new Date(date);
    return d.toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).split('.').reverse().join('-');
  }

  makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  cleanBody() {
    const body = document.querySelector('body');
    body.innerHTML = ``;
  }

  enterInSystem(user = undefined, skip = 0, top = this._numberOfShownTweets, filter = {}) {
    this.cleanBody();
    this.createHeader(user);
    this.createFilter(this._adCollection);
    this.createTweets();
    this.viewTweets(user, skip, top, filter);
    this.createFooter();
    this.programEvents(user);
  }

  createFilter() {
    const body = document.querySelector('body');

    const filter = document.createElement('section');
    filter.classList.add('main');
    filter.innerHTML = `
      <div class="container">
      <h1>PRODUCTS</h1>
      <div class="main__filter">
          <div class="main__filter_by">filter by</div>
          <div class="main__filter_wrapper">
              <form class="search-form">
                <input type="search" class="search-input" placeholder="Hashtag"> 
                <input type="submit" class="search-btn" value="Search">
              </form>
              <div class="main__filter_line">|</div>
              <!-- <button class="main__filter_item">Supplier name</button> -->
              <select class="main__filter_item">
              </select>
          </div>
          <button class="main__filter_reset">reset</button>
      </div>
      </div>
    `;

    body.appendChild(filter);


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

  createHeader(user = undefined) {
    const body = document.querySelector('body');

    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
      <div class="container">
        <div class="header__wrapper">
            <a href="#" class="header__wrapper_logo">PROFIT!</a>
            <button class="header__wrapper_btn">LOG IN</button>
        </div>
      </div>
    `;

    body.appendChild(header);

    if (user !== undefined && user.ifLogIn) {
      header.classList.add('header');
      header.innerHTML = `
      <div class="container">
        <div class="header__wrapper">
            <a href="#" class="header__wrapper_logo">PROFIT!</a>
            <div class="btns-wrapper">
              <button class="header__wrapper_btn">LOG IN</button>
              <button class="header__wrapper_btn-create">Create</button>
            </div>
        </div>
      </div>
    `;

      const headerName = document.querySelector('.header__wrapper_btn');
      headerName.innerHTML = user.name;
    }
  }

  createFooter() {
    const body = document.querySelector('body');

    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `
    <div class="container">
        <div class="footer__wrapper">
            <a href="#" class="footer__logo">PROFIT!</a>
            <div class="footer__info">
                <div class="footer__info_name">Created by <span>Brokhin Pavel</span></div>
                <div class="footer__info_group">2 course 8 group</div>
                <a href="#" class="footer__info_email">Paveline@tut.by</a>
                <div class="footer__info_date">18.02.2021</div>
            </div>
        </div>
    </div>
    `;

    body.appendChild(footer);
  }

  createTweets() {

    const body = document.querySelector('body');

    const tweets = document.createElement('section');
    tweets.classList.add('products');
    tweets.innerHTML = `
      <div class="container">
      <div class="products__wrapper">
      </div>
      <div class="products__btnAdd">
        <img src="img/plus.png" alt="" class="products__btnAdd_img">
      </div>
      </div>
       <div class="products__bg_wrapper">
        <img src="img/bg 1.png" alt="" class="products__bg1">
        <img src="img/bg 2.png" alt="" class="products__bg2">
       </div>
    `;

    body.appendChild(tweets);
  }

  viewTweets(user = undefined, skip = 0, top = this._numberOfShownTweets, filter = {}) {

    //if user LogIn - show btns
    let LogInButtons = '';

    if (user !== undefined && user.ifLogIn) {
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

      if (elem.reviews !== undefined) {
        for (let i = 0; i < 3; i++) {
          if (elem.reviews[i] !== undefined) {
            reviewsHTML += `
        <div class="products__reviews_item">
          <img src="img/avatar.png" alt="Profile">
          <div class="products__reviews_text">${elem.reviews[i]}</div>
        </div>
        `;
          }
        }
      }


      let hashtagsHTML = '';
      elem.hashTags.forEach((elem, i) => {
        hashtagsHTML += `
        <div class="tag tag_${i}">#${elem}</div>
        `;
      });

      adItem.innerHTML = `
      <div id="${elem.id}" class="products__item_wrapper">
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
              <div class="products__item_title">${elem.title}</div>
              <div class="products__item_text">${elem.desciption}</div>
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
    });

    itemsCollection.forEach(elem => {
      itemsWrapper.appendChild(elem);
    });
  }

  removeTweet(id, user) {
    if (this._adCollection.remove(id)) {
      this.viewTweets(user);
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

  createEditScreen(id, user) {
    this.cleanBody();
    this.createHeader(user);

    const item = this._adCollection.get(id);

    const body = document.querySelector('body');

    const section = document.createElement('section');
    section.classList.add('edit');
    section.innerHTML = `
      <div class="container">
      <h2 class="edit__logo">EDIT</h2>
      <div class="edit__wrapper">
          <div class="edit__wrapper_left">
              <form action="">
                  <input type="file" class="file">
                  <input readonly type="text" class="name" placeholder="Vendor" value="${item.vendor}">
              </form>
          </div>
          <div class="edit__wrapper_right">
              <form class="edit-form" action="">
                  <div class="input__wrapper">
                      <input type="text" class="title" placeholder="Title" value="${item.desciption}">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="descr" placeholder="Desription" value="${item.desciption}">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="link" placeholder="Link" value="${item.link}">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="tags" placeholder="Tags" value="${item.hashTags}">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="sale" placeholder="Sale %" value="${item.discount}">
                  </div>
                  <div class="input__wrapper">
                      <input type="date" class="date" placeholder="Due Date" value="${this.formatDate(item.validUntil)}">
                  </div>
                  <button type="submit" class="edit__wrapper_confirm">Publish</button>
              </form>
          </div>
      </div>
      <div class="edit__wrapper_date">
          Published ${this.formatDate(item.createdAt)}
      </div>
      </div>
    `;

    body.appendChild(section);

    const editForm = document.querySelector('.edit-form');

    editForm.addEventListener('submit', (e) => {
      const title = document.querySelector('.title').value;
      const descr = document.querySelector('.descr').value;
      const link = document.querySelector('.link').value;
      const tags = document.querySelector('.tags').value.split(',');
      const sale = document.querySelector('.sale').value;
      const date = new Date(document.querySelector('.date').value);

      this._adCollection.edit(id, {
        title: title,
        desciption: descr,
        link: link,
        hashTags: tags,
        discount: sale,
        validUntil: date
      })

      this.enterInSystem(user);
    });

    this.programEvents(user);
  }

  createReviewScreen(id, user) {
    this.cleanBody();
    this.createHeader(user);

    const item = this._adCollection.get(id);

    const body = document.querySelector('body');

    const section = document.createElement('section');
    section.classList.add('review');
    section.innerHTML = `
    <div class="container">
    <h2 class="review__logo">ADD REVIEW</h2>
    <div class="review__wrapper">
        <div class="review__wrapper_user">
            <img src="img/ava.png" alt="" class="user_avatar">
            <div class="user_name">${user.name}</div>
        </div>
        <form action="" class="review__wrapper_form">
            <input type="text" class="review_input" placeholder="Review">
            <div class="review__wrapper_rating">
                Rate
                <select name="rating" class="rating_select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="review__wrapper_date">
                Published 11.12.1078
            </div>
            <button type="submit" class="review__wrapper_confirm">Publish</button>
        </form>
      </div>
    </div>
    `;

    body.appendChild(section);

    const publishForm = document.querySelector('.review__wrapper_form');

    publishForm.addEventListener('submit', (e) => {
      const review = document.querySelector('.review_input').value;

      let newReviews = item.reviews;

      if (newReviews === undefined) {
        newReviews = [review];
      } else {
        newReviews.unshift(review);
      }

      this._adCollection.edit(id, {
        reviews: newReviews
      });

      this.enterInSystem(user);
    });

    this.programEvents(user);
  }

  creareNewTweetScreen(user) {
    this.cleanBody();
    this.createHeader(user);

    const body = document.querySelector('body');

    const section = document.createElement('section');
    section.classList.add('edit');
    section.innerHTML = `
      <div class="container">
      <h2 class="edit__logo">ADD</h2>
      <div class="edit__wrapper">
          <div class="edit__wrapper_left">
              <form action="">
                  <input type="file" class="file">
              </form>
          </div>
          <div class="edit__wrapper_right">
              <form class="edit-form" action="">
                  <div class="input__wrapper">
                  <input type="text" class="vendor" placeholder="Vendor" value="">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="title" placeholder="Title" value="">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="descr" placeholder="Desription" value="">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="link" placeholder="Link" value="">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="tags" placeholder="Tags" value="">
                  </div>
                  <div class="input__wrapper">
                      <input type="text" class="sale" placeholder="Sale %" value="">
                  </div>
                  <div class="input__wrapper">
                      <input type="date" class="date" placeholder="Due Date" value="">
                  </div>
                  <button type="submit" class="edit__wrapper_confirm">Publish</button>
              </form>
          </div>
      </div>
      <div class="edit__wrapper_date">
          Published ${this.formatDate(new Date())}
      </div>
      </div>
    `;

    body.appendChild(section);

    const editForm = document.querySelector('.edit-form');

    editForm.addEventListener('submit', (e) => {
      const title = document.querySelector('.title').value;
      const vendor = document.querySelector('.vendor').value;
      const descr = document.querySelector('.descr').value;
      const link = document.querySelector('.link').value;
      const tags = document.querySelector('.tags').value.split(',');
      const sale = document.querySelector('.sale').value;
      const date = document.querySelector('.date').value;

      if (date && tags.length !== 0 && title && vendor && descr && link && sale) {

        if (this._adCollection.add({
            id: this.makeid(),
            title: title,
            desciption: descr,
            createdAt: new Date(),
            vendor: vendor,
            link: link,
            hashTags: tags,
            discount: sale,
            validUntil: new Date(date)
          })) {
          this.enterInSystem(user);
        }
      } else {
        this.creareNewTweetScreen(user);
      }
    });

    this.programEvents(user);
  }

  createLogInScreen() {
    const body = document.querySelector('body');

    const login = document.createElement('section');
    login.classList.add('login')
    login.innerHTML = `
      <div class="container">
          <h2 class="login__logo">PROFIT!</h2>
          <div class="login__form">
              <div class="login__form_title">Glad To See You!</div>
              <div class="login__form_descr">Please enter info below:</div>
              <form action="">
                  <input class="username" type="text" placeholder="Username">
                  <input class="password" type="password" placeholder="Password">	
                  <div class="status"></div>
                  <input type="submit" class="submit" value="Log In">
              </form>
          </div>
      </div>
  
      <img src="img/login_bg1.png" alt="" class="products__bg1">
      <img src="img/login_bg2.png" alt="" class="products__bg2">
    `;

    body.appendChild(login);
  }

  logIn() {
    this.cleanBody();
    this.createHeader();
    this.createLogInScreen();
    this._numberOfShownTweets = 10;

    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('.username').value;
      const password = form.querySelector('.password').value;


      const status = form.querySelector('.status');

      const user = this._userList.find(elem => elem.name === name);

      if (user === undefined || user.password !== password) {
        //console.log('Wrong Password or Username');
        status.innerHTML = 'Wrong Password or Username';
        form.reset();
      } else {
        //console.log('Hello');
        status.innerHTML = 'Good!';
        user.ifLogIn = true;
        this.enterInSystem(user);
      }
    });
  }

  programEvents(user) {
    const logInBtn = document.querySelector('.header__wrapper_btn');

    if (user === undefined || user.ifLogIn === false) {
      logInBtn.addEventListener('click', (e) => {
        this.logIn();
      });
    } else {
      logInBtn.addEventListener('click', (e) => {
        user.ifLogIn = false;
        this.enterInSystem(user);
      });
    }

    if (user !== undefined && user.ifLogIn) {
      const createBtn = document.querySelector('.header__wrapper_btn-create');

      createBtn.addEventListener('click', (e) => {
        this.creareNewTweetScreen(user);
      });
    }

    const moreBtn = document.querySelector('.products__btnAdd')

    moreBtn.addEventListener('click', (e) => {

      if (this._numberOfShownTweets + 10 >= this._adCollection.getSize()) {
        this._numberOfShownTweets = this._adCollection.getSize();
      } else {
        this._numberOfShownTweets += 10;
      }

      this.enterInSystem(user, 0, this._numberOfShownTweets);
    });

    //Filter--------------------
    const searchForm = document.querySelector('.search-form');

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = searchForm.querySelector('.search-input');
      const tag = input.value.toLowerCase();
      console.log(tag);

      this.viewTweets(user, 0, 10, {
        hashTags: tag
      })
    });

    const vendorFilter = document.querySelector('select');

    vendorFilter.addEventListener('change', (e) => {
      const input = searchForm.querySelector('.search-input');
      input.value = '';

      let selectedOption = vendorFilter.options[vendorFilter.selectedIndex];
      let key = selectedOption.text;

      this.viewTweets(user, 0, 10, {
        vendor: key
      });
    });


    const resetFilter = document.querySelector('.main__filter_reset');

    resetFilter.addEventListener('click', (e) => {
      const input = searchForm.querySelector('.search-input');
      input.value = '';
      this.viewTweets(user);
    });

    //-------------------------

    const itemsWrapper = document.querySelector('.products__wrapper');

    if (user !== undefined && user.ifLogIn) {
      itemsWrapper.addEventListener('click', (e) => {
        let target = e.target;

        if (target.className === 'products__item_btnDelete') {
          let item = target.closest('.products__item_wrapper');
          this.removeTweet(item.id, user);
        }

        if (target.className === 'products__item_btnEdit') {
          let item = target.closest('.products__item_wrapper');
          this.createEditScreen(item.id, user);
        }

        if (target.className === 'products__item_btnReview') {
          let item = target.closest('.products__item_wrapper');
          this.createReviewScreen(item.id, user);
        }
      });
    } else {
      itemsWrapper.addEventListener('click', (e) => {
        let target = e.target;

        if (target.className === 'products__item_btnReview') {
          let item = target.closest('.products__item_wrapper');
          this.logIn();
        }
      });
    }
  }
}

class User {
  constructor(name, password, ifLogIn = false) {
    this.name = name;
    this.password = password.toString();
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


const createLogInScreen = () => {
  const body = document.querySelector('body');

  body.innerHTML = `
    <section class="login">
    <div class="container">
        <h2 class="login__logo">PROFIT!</h2>
        <div class="login__form">
            <div class="login__form_title">Glad To See You!</div>
            <div class="login__form_descr">Please enter info below:</div>
            <form action="">
                <input class="username" type="text" placeholder="Username">
                <input class="password" type="password" placeholder="Password">	
                <div class="status"></div>
                <input type="submit" class="submit" value="Log In">
            </form>
        </div>
    </div>

    <img src="img/login_bg1.png" alt="" class="products__bg1">
    <img src="img/login_bg2.png" alt="" class="products__bg2">
  </section>
  `;

}

const logIn = (userList) => {
  createLogInScreen();

  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('.username').value;
    const password = form.querySelector('.password').value;


    const status = form.querySelector('.status');

    const user = userList.find(elem => elem.name === name);

    if (user === undefined || user.password !== password) {
      //console.log('Wrong Password or Username');
      status.innerHTML = 'Wrong Password or Username';
      form.reset();
    } else {
      //console.log('Hello');
      status.innerHTML = 'Good!';
    }
  });
}
// --------------PROGRAM--------------//

adList = [{
    id: '1',
    title: 'Sale PHOTOSHOP',
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
    title: 'Sale Steam',
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
    title: 'Sale Spotify',
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
    title: 'Sale Tilda',
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
    title: 'Sale Apple',
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
    title: 'Sale PHOTOSHOP',
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
    title: 'Sale Steam',
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
    title: 'Sale Spotify',
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
    title: 'Sale Tilda',
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
    title: 'Sale Apple',
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
    title: 'Sale PHOTOSHOP',
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
    title: 'Sale Steam',
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
    title: 'Sale Spotify',
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
    title: 'Sale Tilda',
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
    title: 'Sale Apple',
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
    title: 'Sale PHOTOSHOP',
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
    title: 'Sale Steam',
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
    title: 'Sale Spotify',
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
    title: 'Sale Tilda',
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
    title: 'Sale Apple',
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
const userList = [new User('Abuba', 123), new User('Qwe', 'asd'), new User('ZZZ', '1q2w3e')];
const viewer = new View(userList, adCollection);

viewer.enterInSystem();