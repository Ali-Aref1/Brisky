
class Order{
    constructor(OrderID, Status, Cost, Count, UserID, PromoCode, AddressId){
        this.OrderID = OrderID;
        this.Status = Status;
        this.Cost = Cost;
        this.Count = Count;
        this.UserID = UserID;
        this.PromoCode = PromoCode;
        this.AddressId = AddressId;
        
    }
}
var orders = [];

async function getOrders(){
    const response = await fetch("/getOrder",
    {method:"POST"
    ,headers:{"Content-Type":"application/json"},
    body:JSON.stringify({userID})
})
const data = await response.json();
    data.forEach((order) => {
        orders.push(new Order(order.OrderID, order.Status, order.Cost, order.Count, order.UserID, order.PromoCode, order.AddressId));
    });
    renderOrders();
    
}
function renderOrders(){
    console.log(orders);
    table = document.getElementById("orderHistory");
    table.replaceChildren();
    table.style.width="40%"
    if(orders.length > 0){
        const theadrow=document.createElement("tr");
        const th1=document.createElement("th");
        const th2=document.createElement("th");
        const th3=document.createElement("th");
        const th4=document.createElement("th");
        const s1=document.createElement("span");
        const s2=document.createElement("span");
        const s3=document.createElement("span");
        const s4=document.createElement("span");
        s1.innerHTML="ID";
        s2.innerHTML="Item Count";
        s3.innerHTML="Total";
        s4.innerHTML="Status";
        th1.appendChild(s1);
        th2.appendChild(s2);
        th3.appendChild(s3);
        th4.appendChild(s4);
        theadrow.appendChild(th1);
        theadrow.appendChild(th2);
        theadrow.appendChild(th3);
        theadrow.appendChild(th4);
        table.appendChild(theadrow);
        orders.forEach(order => {
            
            const row=document.createElement("tr");
            const td1=document.createElement("td");
            const td2=document.createElement("td");
            const td3=document.createElement("td");
            const td4=document.createElement("td");
            const s1=document.createElement("span");
            const s2=document.createElement("span");
            const s3=document.createElement("span");
            const s4=document.createElement("span");
            s1.innerHTML=order.OrderID;
            s2.innerHTML=order.Count;
            s3.innerHTML="$"+order.Cost.toFixed(2);
            s4.innerHTML=order.Status;
            td1.appendChild(s1);
            td2.appendChild(s2);
            td3.appendChild(s3);
            td4.appendChild(s4);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.style.width="fit-content";

            table.appendChild(row);
        });
    }
    else{
        const txt=document.createElement("h3");
        txt.innerHTML="No Orders yet!";
        box = document.getElementById("mainbox");
        box.appendChild(txt);
    }
    
}

document.addEventListener('DOMContentLoaded', function () {
    getOrders();
});