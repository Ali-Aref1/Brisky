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
  "assets/products/Product5.jpg",
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
  "assets/products/Product6.jpg",
  "2023-02-28"
);
const apple = new Fruit(
  "Apple",
  2.5,
  "assets/products/apple.jpg",
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

//-----------------------------------------------------------------------------------//

/// now lets try to modify the Products web page made by hazem （。＾▽＾）

const products = [wholeWheatBread, beef, cannedBeans, apple, tommato, carrot];

function displayProducts() {
  var productImages = document.getElementById("productImages");

  productImages.innerHTML = "";

  //  now create a new div for each product be carful

  products.forEach(function (product) {
    var productDiv = document.createElement("div");
    productDiv.className = "product";

    var productLink = document.createElement("a");
    productLink.href = "Item.html";
    productLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default navigation behavior
      openItemPage(product);
    });

    var productImage = document.createElement("img");
    productImage.src = product.picture;
    productImage.alt = product.name;

    // appending each one on the other looks the same on the html ＜（＾－＾）＞

    productLink.appendChild(productImage);
    productDiv.appendChild(productLink);
    productImages.appendChild(productDiv);
  });
}

// lets call this function to try it
displayProducts();

// this is 7azoo function he put it at end of the html page and fff (*￣3￣)╭ its just moved

function showAllProducts() {
  // Show all products
  var productImages = document.getElementById("productImages");
  productImages.style.display = "flex";
}

// soo its working right now because the problem i was loading it before the html page but after putting the
// java script file in the end it works for now e need to make it looks better also adjust the page of the item.htnml
// also the horizental list

// now for the item.html page
//(*￣3￣)╭(*￣3￣)╭－O－☆⌒(*＾-゜)v(￣o￣) . z Zヾ(^▽^*)))*_*=_=-0-:-*>.<^^Y.YY.YY.Y;D

function displayProductDetails(selectedProduct) {
  var productDetailsContainer = document.getElementById(
    "productDetailsContainer"
  );

  if (productDetailsContainer && selectedProduct) {
    productDetailsContainer.innerHTML = `
            <img src="${selectedProduct.picture}" alt="${
      selectedProduct.name
    }" class="product-image">
            <h2>Product name: ${selectedProduct.name}</h2>
            <p>Price: $${selectedProduct.price.toFixed(2)}</p>
            <p>Expiry Date: ${selectedProduct.expiryDate}</p>
            <!-- Add other product properties as needed -->
            <div class="review-stars">
                ★★★★★
            </div>
        `;
  }
}

function openItemPage(selectedProduct) {
  sessionStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  window.location.href = "item.html";
}

// now it works well with item.html page its now visible to be dynamic we only need to adjust the look and go all the way to the cart
// （￣︶￣）↗　（￣︶￣）↗　（￣︶￣）↗　（￣︶￣）↗　（￣︶￣）↗　（￣︶￣）↗

//--------------------------------------------------------------------------------------------------------------------------//
