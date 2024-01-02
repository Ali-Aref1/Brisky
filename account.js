var paymentMethods = [];
var addresses = [];
var modal;
var modalText;
var pMethodForm;
var addressForm;
var pmtable;
var addtable;
var edit=false;
var valToEdit;
var oldNum;
const userID = sessionStorage.getItem("USER_ID");

var modalFlag = false;

//Dynamic modal, shows for for either new address or new payment method
function toggleModal(action) {
  modalFlag = !modalFlag;
  if (modalFlag) {
    modal.style = "display:flex;";
    if (action === "pMethod") {
      pMethodForm.style = "display:flex";
      modalText.innerText = "Add Payment Method";
    }
    if (action === "address") {
      addressForm.style = "display:flex";
      modalText.innerText = "Add new address";
    }
  } else {
    modalFlag = false;
    modal.style = "display:none;";
    modalText.innerText = "";
    pMethodForm.style = "display:none";
    addressForm.style = "display:none";
  }
}

//On DOM load, payment methods and addresses are loaded from memory, and listeners are assigned
document.addEventListener("DOMContentLoaded", function () {
  console.log("USER ID IS: " + userID);
  getPMethods();
  getAddresses();
  modal = document.getElementById("modal");
  modalText = document.getElementById("modalText");
  pMethodForm = document.getElementById("pMethodForm");
  addressForm = document.getElementById("addressForm");
  pmtable = document.getElementById("paymentMethods");
  addtable = document.getElementById("addressBook");
  renderPMethods();
  renderAddressBook();
  document.getElementById("addPMethod").addEventListener("click", function () {
    toggleModal("pMethod");
    edit=false;
    valToEdit=null;
  });
  document.getElementById("addAddress").addEventListener("click", function () {
    toggleModal("address");
    edit=false;
    valToEdit=null;
  });
  document.getElementById("modal").addEventListener("click", function (event) {
    var modalDiv = document.getElementById("modalDiv1");

    if (
      event.target !== modalDiv &&
      !modalDiv.contains(event.target) &&
      modalFlag
    ) {
      toggleModal();
      pMethodForm.reset();
      addressForm.reset();
    }
  });

  pMethodForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if(!edit){
    let cardName = document.forms["pMethodForm"]["cardName"].value;
    let cardNum = document.forms["pMethodForm"]["cardNum"].value;
    let expMonth = document.forms["pMethodForm"]["expMonth"].value;
    let expYear = document.forms["pMethodForm"]["expYear"].value;
    let cvv = document.forms["pMethodForm"]["cvv"].value;
    addPMethod(
      new PaymentMethod(cardName, cardNum, `${expMonth}/${expYear}`, cvv, 1)
    );
    }
    else{
      let cardName = document.forms["pMethodForm"]["cardName"].value;
      let cardNum = document.forms["pMethodForm"]["cardNum"].value;
      let expMonth = document.forms["pMethodForm"]["expMonth"].value;
      let expYear = document.forms["pMethodForm"]["expYear"].value;
      let cvv = document.forms["pMethodForm"]["cvv"].value;
      oldNum=valToEdit.num;
      valToEdit.edit(cardName, cardNum, `${expMonth}/${expYear}`, cvv);
      editPMethod(valToEdit);
      edit=false;
      valToEdit=null;
    }
    toggleModal();
    pMethodForm.reset();
    addressForm.reset();
    
  });
  addressForm.addEventListener("submit", function (event) {
    if(!edit){
    event.preventDefault();
    let line1 = document.forms["addressForm"]["line1"].value;
    let line2 = document.forms["addressForm"]["line2"].value;
    let region = document.forms["addressForm"]["region"].value;
    let city = document.forms["addressForm"]["city"].value;
    addAddress(new Address(line1, line2, region, city, 1));
    }
    else{
      event.preventDefault();
      let line1 = document.forms["addressForm"]["line1"].value;
      let line2 = document.forms["addressForm"]["line2"].value;
      let region = document.forms["addressForm"]["region"].value;
      let city = document.forms["addressForm"]["city"].value;
      valToEdit.edit(line1, line2, region, city);
      editAddress(valToEdit);
      edit=false;
      valToEdit=null;
    }
    toggleModal();
    pMethodForm.reset();
    addressForm.reset();
  });
  


  Array.from(document.getElementsByClassName("cancelbutton")).forEach( //Adds listeners to all the cancel buttons in each modal form
    (button) => {
      button.addEventListener("click", function (event) {
        toggleModal();
        pMethodForm.reset();
        addressForm.reset();
      });
    }
  );
});

//Updates the paymentMethods array and the localstorage automatically
class PaymentMethod {
  constructor(name, num, expiryDate, cvv, userID) {
    this.name = name;
    this.num = num;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
    this.userID = userID;
    paymentMethods.push(this);
    renderPMethods();
  }
  delete() {
    const index = paymentMethods.indexOf(this);
    if (index !== -1) {
      paymentMethods.splice(index, 1);
    }
    deletePMethod(this);
    delete this;
  }
  edit(name, num, expiryDate, cvv){
    this.name = name;
    this.num = num;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
    renderPMethods();
  }
}
class Address {
  constructor(line1, line2, region, city, userID) {
    this.id = null;
    this.line1 = line1;
    this.line2 = line2;
    this.region = region;
    this.city = city;
    this.userID = userID;
    addresses.push(this);
    renderAddressBook();
  }
  delete() {
    const index = addresses.indexOf(this);
    if (index !== -1) {
      addresses.splice(index, 1);
    }
    deleteAddress(this);
    delete this;
  }
  edit(line1, line2, region, city){
    this.line1 = line1;
    this.line2 = line2;
    this.region = region;
    this.city = city;
    renderAddressBook();
  }
}
//Maps all the payment methods to a table
function renderPMethods() {
  pmtable.replaceChildren();
  if (paymentMethods.length != 0) {
    const hrow = document.createElement("tr");
    hrow.classList.add("headerRow");
    pmtable.appendChild(hrow);
    const th1 = document.createElement("th");
    th1.textContent = "Name";
    hrow.appendChild(th1);
    const th2 = document.createElement("th");
    th2.textContent = "Number";
    hrow.appendChild(th2);
    const th3 = document.createElement("th");
    th3.textContent = "Expiry Date";
    hrow.appendChild(th3);
  }

  paymentMethods.map((method) => { 
    const tableRow = document.createElement("tr");
    pmtable.appendChild(tableRow);
    const t1 = document.createElement("td");
    const t2 = document.createElement("td");
    const t3 = document.createElement("td");
    const t4 = document.createElement("td");
    const s1 = document.createElement("span");
    const s2 = document.createElement("span");
    const s3 = document.createElement("span");
    s1.textContent = method.name;
    s2.textContent = `●●●● ●●●● ●●●● ${method.num.toString().slice(-4)}`;
    s3.textContent = method.expiryDate;
    tableRow.appendChild(t1);
    tableRow.appendChild(t2);
    tableRow.appendChild(t3);
    tableRow.appendChild(t4);

    const icon = document.createElement("img");
    icon.src = "assets/credit-card.png";
    icon.classList.add("cardIcon");
    t1.appendChild(icon);
    t1.appendChild(s1);
    t1.classList.add("nameCell");

    t2.appendChild(s2);

    t3.appendChild(s3);

    t4.classList.add("invisCell");
    t1.style = "width:600px";
    t2.style = "width:150px";
    t3.style = "width:50px";

    const deleteBtn = document.createElement("button");
    const trashCan = document.createElement("img");
    trashCan.src = "assets/trash-can.png";
    trashCan.classList.add("trashCan");
    deleteBtn.classList.add("deleteButton");
    deleteBtn.appendChild(trashCan);

    const editBtn = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.src = "assets/edit.png";
    editBtn.classList.add("editButton");
    editIcon.classList.add("editIcon");
    editBtn.appendChild(editIcon);

    t4.appendChild(editBtn);
    t4.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
      method.delete();
      renderPMethods();
    });
    editBtn.addEventListener("click", function () {
      editPmModal(method);
    });

  });
}
function renderAddressBook() { //Maps all the addresses to a table
  addtable.replaceChildren();
  if (addresses.length != 0) {
    const hrow = document.createElement("tr");
    hrow.classList.add("headerRow");
    addtable.appendChild(hrow);
    const th1 = document.createElement("th");
    th1.textContent = "Line 1";
    hrow.appendChild(th1);
    const th2 = document.createElement("th");
    th2.textContent = "Line 2";
    hrow.appendChild(th2);
    const th3 = document.createElement("th");
    th3.textContent = "Region";
    hrow.appendChild(th3);
    const th4 = document.createElement("th");
    th4.textContent = "City";
    hrow.appendChild(th4);
  }

  addresses.map((address) => {
    const tableRow = document.createElement("tr");
    addtable.appendChild(tableRow);
    const t1 = document.createElement("td");
    const t2 = document.createElement("td");
    const t3 = document.createElement("td");
    const t4 = document.createElement("td");
    const t5 = document.createElement("td");
    const s1 = document.createElement("span");
    const s2 = document.createElement("span");
    const s3 = document.createElement("span");
    const s4 = document.createElement("span");

    s1.textContent = address.line1;
    s2.textContent = address.line2;
    s3.textContent = address.region;
    s4.textContent = address.city;
    const deleteBtn = document.createElement("button");
    const trashCan = document.createElement("img");
    trashCan.src = "assets/trash-can.png";
    trashCan.classList.add("trashCan");
    deleteBtn.classList.add("deleteButton");
    deleteBtn.appendChild(trashCan);

    const editBtn = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.src = "assets/edit.png";
    editBtn.classList.add("editButton");
    editIcon.classList.add("editIcon");
    editBtn.appendChild(editIcon);

    tableRow.appendChild(t1);
    tableRow.appendChild(t2);
    tableRow.appendChild(t3);
    tableRow.appendChild(t4);
    tableRow.appendChild(t5);
    t1.appendChild(s1);
    t2.appendChild(s2);
    t3.appendChild(s3);
    t4.appendChild(s4);
    t5.classList.add("invisCell");
    t5.appendChild(editBtn);
    t5.appendChild(deleteBtn);
    t1.style = "width:200px";
    t2.style = "width:200px";
    t3.style = "width:200px";
    t4.style = "width:200px";

    deleteBtn.addEventListener("click", function () {
      address.delete();
      renderAddressBook();
    });
    editBtn.addEventListener("click", function () {
      editAddModal(address);
    });
  });
}

function editPmModal(method){ //Opens the modal with the payment method info filled in
  edit=true;
  valToEdit=method;
  toggleModal("pMethod");
  modalText.innerText = "Edit Payment Method";
  document.forms["pMethodForm"]["cardName"].value = method.name;
  document.forms["pMethodForm"]["cardNum"].value = method.num;
  document.forms["pMethodForm"]["expMonth"].value = method.expiryDate.split("/")[0];
  document.forms["pMethodForm"]["expYear"].value = method.expiryDate.split("/")[1];
  document.forms["pMethodForm"]["cvv"].value = method.cvv;
  
}
function editAddModal(address){ //Opens the modal with the address info filled in
  edit=true;
  valToEdit=address;
  toggleModal("address");
  modalText.innerText = "Edit Address";
  document.forms["addressForm"]["line1"].value = address.line1;
  document.forms["addressForm"]["line2"].value = address.line2;
  document.forms["addressForm"]["region"].value = address.region;
  document.forms["addressForm"]["city"].value =  address.city;
  
}

//Backend interactions:

async function getPMethods(e) {
  const res = await fetch("http://localhost:3000/getPMethod", {
    method: "GET",
  });
  const data = await res.json();
  console.log("Payment Methods:");
  console.log(data);
  data.forEach((method) => {
    new PaymentMethod(
      method.name,
      method.num,
      method.expiryDate,
      method.cvv,
      method.userID
    );
  });
}

async function deletePMethod(method) {
  await fetch("http://localhost:3000/delPMethod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ method: method.num }),
  });
}
async function addPMethod(method) {
  await fetch("http://localhost:3000/addPMethod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ method }),
  });
}
async function editPMethod(method) {
  await fetch("http://localhost:3000/editPMethod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ method, oldNum }),
  });
}

async function getAddresses(e) {
  const res = await fetch("http://localhost:3000/getAddress", {
    method: "GET",
  });
  const data = await res.json();
  console.log("Addresses:");
  console.log(data);
  data.forEach((address) => {
    let add = new Address(
      address.line1,
      address.line2,
      address.region,
      address.city
    );
    add.id = address.id;
  });
}

async function addAddress(address) {
  const res = await fetch("http://localhost:3000/addAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });
  const data = await res.json();
  address.id = data.insertId;
}

async function deleteAddress(address) {
  await fetch("http://localhost:3000/delAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: address.id }),
  });
}

async function editAddress(address) {
  await fetch("http://localhost:3000/editAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({address}),
  });
}