class Address {
  constructor(line1, line2, region, city, userID) {
    this.id = null;
    this.line1 = line1;
    this.line2 = line2;
    this.region = region;
    this.city = city;
    this.userID = userID;
  }
}

class PaymentMethod {
  constructor(name, num, expiryDate, cvv, userID) {
    this.name = name;
    this.num = num;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
    this.userID = userID;
  }
}

class Order {
  constructor(OrderId, Status, Cost, Count, userId, PromoCode, AddressId) {
    this.OrderId = OrderId;
    this.Status = Status;
    this.Cost = Cost;
    this.Count = Count;
    this.UserId = userId;
    this.PromoCode = PromoCode;
    this.AddressId = AddressId;
  }
}
var items=[];
var orderId;

function getUserId() {
  tempid = sessionStorage.getItem("USER_ID");
  //console.log("userid is" + tempid);
  return tempid; // untill the login for now
}
var userID=getUserId();
console.log(userID);

//// want to write the data like the total pri ce`(*>﹏<*)′
document.addEventListener("DOMContentLoaded", function () {
  items=getCount(JSON.parse(sessionStorage.getItem("cart")));
  console.log(items);
  var totalPrice = sessionStorage.getItem("totalPrice");
  var totalcount = sessionStorage.getItem("totalCount");

  var totalPriceElement = document.getElementById("totalPriceDisplay");
  if (totalPrice !== null) {
    console.log("sessionStorage:", totalPrice);
    totalPriceElement.textContent = "the total price is : " + totalPrice;
  } else {
    console.log("Total price not found in the URL.");
  }
});

// buy method (❁´◡`❁)
// buy method (❁´◡`❁)
async function BUY() {
  const userId = getUserId();
  if (!validateForm()) {
    return; // Exit if validation fails
  }

  // Get selected payment method
  const paymentMethod = document.getElementById("paymentMethod").value;

  // Get credit card details (if applicable)
  const creditCardNumber = document.getElementById("creditCardNumber").value;
  const expirationDateC = document.getElementById("expirationDateC").value;
  const depitCardNumber = document.getElementById("depitCardNumber").value;
  const expirationDateD = document.getElementById("expirationDateD").value;

  // Get delivery information
  const addressLine1 = document.getElementById("addressLine1").value;
  const addressLine2 = document.getElementById("addressLine2").value;
  const Region = document.getElementById("Region").value;
  const city = document.getElementById("city").value;

  // Get other necessary details for order
  const deliveryOption = document.querySelector(
    'input[name="deliveryOption"]:checked'
  ).value;
  const totalPrice = sessionStorage.getItem("totalPrice");
  const totalcount = sessionStorage.getItem("totalCount");

  console.log("Payment Method:", paymentMethod);
  console.log("Delivery Address:", addressLine1, addressLine2, Region, city);
  console.log("Delivery Option:", deliveryOption);
  console.log("Total Price:", totalPrice);
  console.log("Total Count:", totalcount);

  try {
    // Add address
    const address = new Address(
      addressLine1,
      addressLine2,
      Region,
      city,
      userId
    );
    console.log("before addres");
    // await addAddress(address);
    console.log("after addres");
    console.log(document.getElementById("CVV").value);
    // Add payment method
    const paymentMethodObj = new PaymentMethod(
      paymentMethod,
      paymentMethod === "creditCard" ? creditCardNumber : depitCardNumber,
      paymentMethod === "creditCard" ? expirationDateC : expirationDateD,
      paymentMethod === "creditCard"
        ? document.getElementById("CVV").value
        : document.getElementById("CVV").value,
      userId
    );
    console.log("enterd order");
    console.log("enterd order");
    // Add order
    
    console.log(address);
    await addPMethod(paymentMethodObj);
    await addAddress(address);
    order = new Order(
      3,
      "Pending",
      totalPrice,
      totalcount,
      userId,
      "6", // Promo code (You may include this if applicable)
      address.AddressID // Use the ID of the added address
    );
    order.PaymentMethod=paymentMethodObj.num;
    await addOrder(order);
    

    // For demonstration purposes, open a new page
    window.open("/confirmation.html", "_blank");
  } catch (error) {
    console.error("Error adding address, payment method, or order:", error);
    alert("An error occurred during the checkout process. Please try again.");
  }
}

function validateForm() {
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (paymentMethod === "") {
    alert("Please select a payment method");
    return false;
  }

  if (paymentMethod === "creditCard") {
    const creditCardNumber = document.getElementById("creditCardNumber").value;
    const expirationDateC = document.getElementById("expirationDateC").value;

    if (!creditCardNumber || !expirationDateC) {
      alert("Please enter valid credit card details");
      return false;
    }
  }

  if (paymentMethod === "debitCard") {
    const depitCardNumber = document.getElementById("depitCardNumber").value;
    const expirationDateD = document.getElementById("expirationDateD").value;

    if (!depitCardNumber || !expirationDateD) {
      alert("Please enter valid debit card details");
      return false;
    }
  }

  const addressLine1 = document.getElementById("addressLine1").value;
  const Region = document.getElementById("Region").value;
  const city = document.getElementById("city").value;

  if (!addressLine1 || !Region || !city) {
    alert("Please fill in all required address fields");
    return false;
  }

  return true; // Submit the form if all validations pass
}

// Show/hide credit card details based on the selected payment method
document
  .getElementById("paymentMethod")
  .addEventListener("change", function () {
    const creditCardDetails = document.getElementById("creditCardDetails");
    const depitCardDetails = document.getElementById("depitCardDetails");

    if (this.value === "creditCard") {
      creditCardDetails.style.display = "block";
      depitCardDetails.style.display = "none";
    } else if (this.value === "debitCard") {
      creditCardDetails.style.display = "none";
      depitCardDetails.style.display = "block";
    } else {
      creditCardDetails.style.display = "none";
      depitCardDetails.style.display = "none";
    }
  });

// now e want to add all this data to data base

///////////////////////
//////////////////////////

async function addOrder(order) {
  const res=await fetch("http://localhost:3000/addOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });
  const data = await res.json();
  orderId = data.insertId;
  console.log("succfully");
  await addOrderItems(items);
  showSuccessNotification();
}


async function addAddress(address) {
  try {
    const response = await fetch("http://localhost:3000/addAddressssD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    address.AddressID = data.insertId;
    console.log(address);

    console.log("Address added successfully!");
  } catch (error) {
    console.error("Error adding address:", error);
    throw error; // Rethrow the error to indicate a failure in the function
  }
}

async function addPMethod(method) {
  try {
    const response = await fetch("http://localhost:3000/addPMethodDD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ method, userID }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Payment Method added!");
  } catch (error) {
    console.error("Error adding payment method:", error);
    throw error; // Rethrow the error to indicate a failure in the function
  }
}

function showSuccessNotification() {
  alert("Order completed successfully!");
  window.location.href="/";
  userID=getUserId();
  sessionStorage.clear();
  sessionStorage.setItem("USER_ID",userID);
}

function getCount(jsonArray){
// Create an object to store merged items using ItemID as the key
const mergedItemsMap = {};

// Iterate through the items array
jsonArray.forEach(item => {
  // Check if an item with the same ItemID already exists in the mergedItemsMap
  if (mergedItemsMap.hasOwnProperty(item.ItemID)) {
    // Increment the count attribute
    mergedItemsMap[item.ItemID].count++;
  } else {
    // If it doesn't exist, create a new entry with count set to 1
    mergedItemsMap[item.ItemID] = { ...item, count: 1 };
  }
});

// Convert the values of the mergedItemsMap back to an array
const mergedItemsArray = Object.values(mergedItemsMap);

return mergedItemsArray;
}

async function addOrderItems(orderItems) {
  console.log(order.OrderID)
  await orderItems.forEach(item=>{
    fetch("http://localhost:3000/addOrderItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item,orderId }),
    });
  })
}