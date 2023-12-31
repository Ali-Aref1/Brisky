// we gona make this js to make classes for the products in nutshell (⊙_⊙;)

class Fruit {
  constructor(name, price, picture, expiryDate, className1) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
    this.className1 = "Fruit";
  }

  displayInfo() {
    console.log(`Fruit: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class Vegetable {
  constructor(name, price, picture, expiryDate, className1) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
    this.className1 = "Vegetable";
  }

  displayInfo() {
    console.log(`Vegetable: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class Bread {
  constructor(name, price, picture, expiryDate, className1) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
    this.className1 = "Bread";
  }

  displayInfo() {
    console.log(`Bread: ${this.name}`);
    console.log(`Price: $${this.price}`);
    console.log(`Picture: ${this.picture}`);
    console.log(`Expiry Date: ${this.expiryDate}`);
  }
}

class Meat {
  constructor(name, price, picture, expiryDate, className1) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.expiryDate = expiryDate;
    this.className1 = "Meat";
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

// function addProduct(product) {
//   products.push(product);
// }

// module.exports = {
//   products,
//   addProduct,
// };

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

//lets start to check out

// function to dispalty whay is on cart

function catchselected() {
  var storedProduct = sessionStorage.getItem("selectedProduct");
  var selectedProduct = storedProduct ? JSON.parse(storedProduct) : null;
  return selectedProduct;
}
/*
function addToCart() {
  var selectedProduct = catchselected();
  sessionStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

  window.location.href = "checkout.html";
}
*/

function addToCart() {
  var selectedProduct = catchselected();
  var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(selectedProduct);

  sessionStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "checkout.html";
}

//-----------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
function displayCartItems() {
  var cartContainer = document.getElementById("cartContainer");
  var totalPriceElement = document.getElementById("totalPrice");

  var cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  var productGroups = {}; // Separate products into groups based on class

  cart.forEach(function (product) {
    if (!productGroups[product.className1]) {
      productGroups[product.className1] = [];
    }
    productGroups[product.className1].push(product);
  });

  for (var productClass in productGroups) {
    var productGroup = productGroups[productClass];

    // Create a new section for each product class
    var sectionDiv = document.createElement("div");
    sectionDiv.className = "section";
    cartContainer.appendChild(sectionDiv);

    // Create a header for the section with the class name
    var header = document.createElement("h3");
    header.textContent = productClass;
    sectionDiv.appendChild(header);

    // Create a new row for each product class
    var rowDiv = document.createElement("div");
    rowDiv.className = "item-row";
    sectionDiv.appendChild(rowDiv);

    var productsInCurrentRow = 0;

    // Populate the row with products of the same class
    productGroup.forEach(function (product) {
      var productDiv = document.createElement("div");
      productDiv.className = "item";

      // Create all the elements of the HTML
      var productImage = document.createElement("img");
      productImage.src = product.picture;

      var productName = document.createElement("h4");
      productName.textContent = product.name;
      var line = document.createElement("hr");
      productName.appendChild(line);

      var productPrice = document.createElement("p");
      productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

      // Append elements to productDiv
      productDiv.appendChild(productImage);
      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);

      // Append productDiv to the current row
      rowDiv.appendChild(productDiv);

      // Increment the count of products in the current row
      productsInCurrentRow++;

      // If two products are already added to the row, create a new row
      if (productsInCurrentRow === 2) {
        rowDiv = document.createElement("div");
        rowDiv.className = "item-row";
        sectionDiv.appendChild(rowDiv);
        productsInCurrentRow = 0;
      }
    });
  }
  // Calculate and update the total price
  var totalPrice = calculateTotalPrice(cart);
  sessionStorage.setItem("totalPrice", totalPrice);
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

//----------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//

//inhancment for this function because right now we have multiple types of products

function displayCartItems_old_only_fruit_and_Vegetable() {
  var cartContainerF = document.getElementById("cartContainerFruit");
  var cartContainerV = document.getElementById("cartContainerVegetables");

  var totalPriceElement = document.getElementById("totalPrice");

  var cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  cartContainerF.innerHTML = "";
  cartContainerV.innerHTML = "";

  var productGroups = {};

  // counter for the rows to make the rows count 2 elements on it

  cart.forEach(function (product) {
    var productDiv = document.createElement("div");
    productDiv.className = "item";

    // Create all the elements of the htm;

    var productImage = document.createElement("img");
    productImage.src = product.picture;

    var productName = document.createElement("h4");
    productName.textContent = product.name;
    var line = document.createElement("hr");
    productName.appendChild(line);

    var productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

    // Append elements to productDiv
    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);

    if (product.className1 == "Fruit") cartContainerF.appendChild(productDiv);
    else if (product.className1 == "Vegetable")
      cartContainerV.appendChild(productDiv);
  });

  // Calculate and update the total price
  var totalPrice = calculateTotalPrice(cart);

  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}
//------->><<<>>><<<1111111111111111111111111111--->>>>>>>//
//we are not using the above function iam keeping it we will need it to add more products

function calculateTotalPrice(cart) {
  var totalPrice = cart.reduce((total, product) => total + product.price, 0);
  return totalPrice;
}

// now we opend the checkout page

///oof thanls god it works well fot now but nedd so,e modification

/// right now we could say we are oifficaly done with the checkout
//     ------------------------iam gonnd keep this file for this onlt and add other one for the payment method ;;
