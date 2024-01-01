//// want to write the data like the total pri ce`(*>﹏<*)′
document.addEventListener("DOMContentLoaded", function () {
  var totalPrice = sessionStorage.getItem("totalPrice");
  var totalcount = sessionStorage.getItem("totalcount");
  console.log("sessionStorage", totalPrice);
  console.log("sessionStorage", totalcount);

  var totalPriceElement = document.getElementById("totalPriceDisplay");
  if (totalPrice !== null) {
    console.log("sessionStorage:", totalPrice);
    totalPriceElement.textContent = "the total price is : " + totalPrice;
  } else {
    console.log("Total price not found in the URL.");
  }
});

// buy method (❁´◡`❁)
function BUY() {
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
  const address = document.getElementById("addressLine1").value;
  const deliveryOption = document.querySelector(
    'input[name="deliveryOption"]:checked'
  ).value;

  console.log("Payment Method:", paymentMethod);
  if (paymentMethod === "creditCard") {
    console.log("Credit Card Number:", creditCardNumber);
    console.log("Expiration Date:", expirationDateC);
  } else if (paymentMethod === "debitCard") {
    console.log("Debit Card Number:", depitCardNumber);
    console.log("Expiration Date:", expirationDateD);
  }
  console.log("Delivery Address:", address);
  console.log("Delivery Option:", deliveryOption);

  const form = document.querySelector("form");
  form.submit();
  // For demonstration purposes, open a new page
  window.open("confirmation.html", "_blank");
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
  const zipCode = document.getElementById("zipCode").value;
  const city = document.getElementById("city").value;

  if (!addressLine1 || !zipCode || !city) {
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
