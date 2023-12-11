// we gona make this js to make classes for the products in nutshell (⊙_⊙;)

class Fruit {
  constructor(name, price, picture, expiryDate) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
  }

  displayInfo() {
    console.log(`Fruit: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class Vegetable {
  constructor(name, price, picture, expiryDate) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
  }

  displayInfo() {
    console.log(`Vegetable: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class Bread {
  constructor(name, price, picture, expiryDate) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
  }

  displayInfo() {
    console.log(`Bread: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class Meat {
  constructor(name, price, picture, expiryDate) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
  }

  displayInfo() {
    console.log(`Meat: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class CannedGood {
  constructor(name, price, picture, expiryDate) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
  }

  displayInfo() {
    console.log(`Canned Good: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

/// now we gonna do some enstates (sorry for spelling (＠＾０＾) as we was talking to try to list it on the products list of the page

const wholeWheatBread = new Bread(
  "Whole Wheat Bread",
  3.0,
  "whole_wheat_bread.jpg",
  "2023-01-10"
);
const beef = new Meat(
  "Beef",
  8.5,
  "assets/products/Product3.jpg",
  "2023-01-05"
);
const cannedBeans = new CannedGood(
  "Canned Beans",
  1.8,
  "canned_beans.jpg",
  "2023-02-28"
);
const apple = new Fruit(
  "Apple",
  2.5,
  "assetsassets/products/apple.jpg",
  "2023-01-15"
);
const tommato = new Fruit(
  "tommato",
  2.5,
  "assets/products/tomatoes.jpg",
  "2023-01-15"
);
const carrot = new Vegetable(
  "Carrot",
  1.2,
  "assets/products/carrots.jpg",
  "2023-01-20"
);
