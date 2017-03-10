/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ],
    init: function() {
      this.currentCat = model.cats[0];
    }
};


/* ======= Octopus ======= */

var octopus = {
  init: function() {
    model.init();
    catView.init();
    catListView.init();
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  getCats: function() {
    return model.cats;
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  incrementCounter: function() {
    model.currentCat.clickCount ++;
    catView.render();
  }
};


/* ======= View ======= */

var catView = {
  catNameElement: document.getElementById('cat-name'),
  catCountElement: document.getElementById('cat-count'),
  catImageElement: document.getElementById('cat-img'),
  init: function() {
    this.catImageElement.addEventListener('click', function(e) {
      octopus.incrementCounter();
    });
    this.render();
  },
  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.catNameElement.textContent = currentCat.name;
    this.catCountElement.textContent = currentCat.clickCount;
    this.catImageElement.src = currentCat.imgSrc;
  }
};

var catListView = {
  catListViewElement: document.getElementById('cat-list'),
  init: function() {
    this.render();
  },
  render: function() {
    var cat;
    var cats = octopus.getCats();

    this.catListViewElement.innerHTML = '';

    for (var i = 0; i < cats.length; i++) {
      cat = cats[i];

      var catItem = document.createElement('li');
      catItem.textContent = cat.name;

      catItem.addEventListener('click', (function(catCopy) {
        return function(){
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));

      this.catListViewElement.appendChild(catItem);
    }


  }
};

octopus.init();
