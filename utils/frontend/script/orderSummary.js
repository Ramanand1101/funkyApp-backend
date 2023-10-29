// const url="http://localhost:3000"
const url = "https://backend-funky.onrender.com"

const orderList = document.getElementById("orderList");
let totalAmount=document.getElementById("totalAmount")

// Fetch orders from the server
fetch(`${url}/order/`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(orders => {
        let totalPrice = 0;
        // Iterate through the orders and create list items for each order
        orders.forEach(order => {
            const orderTotalPrice = order.cartTotalPrice;
            totalPrice += orderTotalPrice;
            totalAmount.innerText=totalPrice
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Order ID:</strong> ${order._id}<br>
                <strong>Total Price:</strong> ₹ ${order.cartTotalPrice.toFixed(2)}<br>
                <strong>Payment Status:</strong> ${order.paymentStatus}<br>
                <strong>Shipping Address:</strong> ${order.shippmentAddress[0].fullAddress}, ${order.shippmentAddress[0].city}, ${order.shippmentAddress[0].state}, ${order.shippmentAddress[0].zipCode}, ${order.shippmentAddress[0].country}<br>
                <strong>Order Items:</strong><br>
                <ul>
                    ${order.items.map(item => `<li>
                                                   <img src="${item.productImg}" alt="${item.productName}" style="max-width: 100px; max-height: 100px;"><br>
                                                   ${item.productName} - Quantity: ${item.quantity} - Price: ₹ ${item.totalPrice.toFixed(2)}
                                               </li>`)}
                </ul>
            `;
            
            orderList.appendChild(listItem);
        });
        
    })
    .catch(error => {
        console.error("Error fetching orders:", error);
        // Handle the error, e.g., display an error message to the user
    });

    

let amount=localStorage.getItem("cart-amount")






/* ------------------------------------------------------ Payment logic done here ------------------------------------ */
let button=document.querySelector("#checkOut")
let form=document.querySelector(".totalSummary")
let otpui=document.querySelector(".otp-ui")
let abort=document.querySelector("#link");
let otpcheck=document.getElementById("otp-check");
let otpbtn=document.getElementById("submit");
let inputs=document.querySelectorAll("input")


let one=document.getElementById("1")
let two=document.getElementById("2")
let three=document.getElementById("3")
let four=document.getElementById("4")





button.addEventListener("click",(e)=>{
e.preventDefault()
if(one.value!="" && two.value!=""&& three.value!=""&& four.value!=""){


let x="0123456789";
let otp="";
for(let i=0;i<4;i++){
    otp+=x[Math.floor(Math.random()*10)]
}
alert(`Your OTP is: ${otp}`);
form.style.display = 'none';
button.classList.add("none");
otpui.style.display='block'

localStorage.setItem("otp",JSON.stringify(otp))
}
else{
    swal("*Please fill all fields correctly");
}
})

abort.addEventListener("click",()=>{
    alert("Redirecting To The Payments Page")
    form.classList.remove("none");
    button.classList.remove("none");
    otpui.classList.remove("block");
})

otpbtn.addEventListener("click",()=>{
    let value=otpcheck.value;
    let store=JSON.parse(localStorage.getItem("otp"))
    if(value==store){
       alert("Payment Successful");
        setTimeout(()=>{
            window.location.href="index.html"
        },2000)
    }else{
        swal("Please Enter Correct OTP");
    }
})