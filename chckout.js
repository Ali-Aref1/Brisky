// fruit class and vegtable class did it to make it more oop lol ಠ_ಠ
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

//now i want each time i put a new product on the cart to grab it from the data base :-D but for now iam on the cart

const apple = new Fruit("Apple", 2.5, "apple.jpg", "2023-01-15");
const carrot = new Vegetable("Carrot", 1.2, "carrot.jpg", "2023-01-20");

apple.displayInfo();
console.log("---------------------");
carrot.displayInfo();
