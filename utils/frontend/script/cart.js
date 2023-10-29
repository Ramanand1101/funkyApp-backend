// const url = "http://localhost:3000";
const url = "https://backend-funky.onrender.com"


const cart = document.querySelector(".cart-data");
let cartCount = document.querySelector(".cartCount");
let totalQuantityElement = document.getElementById("totalQuantity");
let totalAmountElement = document.getElementById("totalAmount");
let ordPlaced = document.getElementById("placeOrder")

updateCartCount()
function updateCartCount() {
    fetch(`${url}/cart/`, {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("token"),
        }
    })
        .then((res) => res.json())
        .then((cartData) => {
            cartCount.innerText = cartData.cartItems.length;

        })
        .catch((err) => console.log("Error fetching cart data:", err));
}



function updateCart() {
    let totalQuant = 0;
    let totalCost = 0;

    cart.forEach(product => {
        totalQuant += product.quantity || 1;
        totalCost += (product.quantity || 1) * product.price;
    });

    totalQuantityElement.innerText = totalQuant;
    totalAmountElement.innerText = totalCost.toFixed(2);

    cartCount = totalQuant;
    cartShow.innerText = cartCount;
    console.log(cartCount)


    localStorage.setItem("cart-count", totalQuant);
    localStorage.setItem("cart-products", JSON.stringify(cart));

    swal.fire("Success!", "Cart updated successfully.", "success");
}



let productId = "";
let userId = "";
let totalCost = 0;
let quantity = 0;


async function fetchCartItems() {
    try {
        const response = await fetch(`${url}/cart/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:localStorage.getItem("token"),
            },
        });

        if (response.ok) {
            const cartItems = await response.json();
            console.log("cart:", cartItems);
            
            productsForCart(cartItems);

        } else {
            throw new Error(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching cart items:", error);
        // Handle the error, show an error message to the user, etc.
    }
}



function productsForCart(data) {
    cart.innerHTML = "";
    let totalQuant = 0; // Declare totalQuant variable here to avoid ReferenceErro
    let totalCost = 0;
        data.cartItems.forEach(cartItem => {

            const product = data.products.find(product => product._id === cartItem.productId);
           
            if (product) {
                let div = document.createElement("div");
                div.classList.add("cartProducts");

                let img = document.createElement("img");
                img.src = product.image;
                img.alt = "product";
                img.setAttribute("class", "p-image");

                let name = document.createElement("h2");
                name.innerText = product.name;

                let cat = document.createElement("p");
                cat.innerText = product.category;

                let desc = document.createElement("p");
                desc.innerText = product.description;

                let rating = document.createElement("p");
                rating.innerText = product.rating;
                let price = document.createElement("p");
                price.innerText = ` Rs.${product.price}`;

                let quantityDiv = document.createElement("div");
                quantityDiv.classList.add("quantity-div");


                let plusBtn = document.createElement("button");
                plusBtn.className = "qnty"
                plusBtn.innerText = "+";
                plusBtn.addEventListener("click", async (e) => {
                    e.preventDefault()
                    try {
                        await updateCartItemQuantity(cartItem._id, cartItem.quantity + 1);
                        await fetchCartItems()
                    } catch (error) {
                        console.error("Error updating item quantity:", error);
                    }
                });



                let quantityDisplay = document.createElement("span");
                quantityDisplay.innerText = cartItem.quantity;
                quantityDisplay.classList.add("quantity-display");



                let minusBtn = document.createElement("button");
                minusBtn.className = "qnty"
                minusBtn.innerText = "-";

                minusBtn.addEventListener("click", async (e) => {
                    e.preventDefault()
                    if (cartItem.quantity > 1) {
                        try {
                            await updateCartItemQuantity(cartItem._id, cartItem.quantity - 1);
                            await fetchCartItems()
                        } catch (error) {
                            console.error("Error updating item quantity:", error);
                        }
                    }
                });

                let deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "dlt");
                deleteBtn.innerText = "🗑 Delete";
                deleteBtn.addEventListener("click", async (event) => {
                    event.preventDefault();
                    try {
                        await removeFromCart(cartItem._id);
                        // Remove the item from the cart and update the UI accordingly
                        await fetchCartItems();
                        // updateCartCount()
                    } catch (error) {
                        console.error("Error removing item from cart:", error);
                    }
                });



                quantityDiv.append(plusBtn, quantityDisplay, minusBtn)

                div.append(img, name, desc, cat, price, rating, quantityDiv, deleteBtn);
                cart.append(div);
                totalQuant += cartItem.quantity || 1;
                totalCost += (cartItem.quantity || 1) * product.price;
                let priceTotal=(cartItem.quantity || 1) * product.price;
                console.log(data.products)
                // Flag to track whether an order is already placed
           
        }

        });
        let isOrderPlaced = false; 
        ordPlaced.addEventListener("click", async (e) => {
          
            e.preventDefault();
        
            if (!isOrderPlaced) {
                try {
                    const detailedOrderItems = [];
        
                    // Iterate over cartItems and create detailed order items
                    for (const cartItem of data.cartItems) {
                        const product = data.products.find(product => product._id === cartItem.productId);
                        if (product) {
                            const orderItem = { 
                                userId: cartItem.userId,
                                productId: product._id,
                                productName: product.name,
                                productImg: product.image,
                                productDescription: product.description,
                                productPrice: product.price,
                                quantity: cartItem.quantity,
                                totalPrice:cartItem.quantity*product.price
                            };
                            detailedOrderItems.push(orderItem);
                        }
                    } 
                    
                   const cartTotal=totalCost
                  
                    
                    // Create the order with detailedOrderItems, userId, total cost
                    await createOrder(detailedOrderItems,cartTotal);

        
                    isOrderPlaced = true;
                } catch (err) {
                    console.error("Error while Placing Order", err.message);
                }
            } else {
                console.log("Order is already placed.");
            }
        });
        
        totalQuantityElement.innerText = totalQuant;
        totalAmountElement.innerText = totalCost.toFixed(2);
        var d = totalCost.toFixed(2);

        // console.log(d)
        cartCount = totalQuant;
        cartShow.innerText = cartCount;

    }






async function removeFromCart(cartItemId) {
    try {
        const response = await fetch(`${url}/cart/remove/${cartItemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization:localStorage.getItem("token"),
            },
        });

        if (response.ok) {
            // Item removed successfully, update UI as needed
            updateCartCount();
           
            swal.fire("Success!", "Item removed from the cart.", "success");
        } else {
            // Handle error when removing item from the cart
            console.error("Failed to remove item from cart:", response.statusText);
            swal.fire("Error!", "Failed to remove item from the cart.", "error");
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        swal.fire("Error!", "Failed to remove item from the cart.", "error");
    }
}



/* above this all right */



async function updateCartItemQuantity(cartItemId, newQuantity) {
    try {
        const response = await fetch(`${url}/cart/update/${cartItemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ quantity: newQuantity }),
        });

        if (response.ok) {
            // Quantity updated successfully, update UI as needed
            
            swal.fire("Success!", "Quantity updated successfully.", "success");
        } else {
            // Handle error when updating cart item quantity
            console.error("Failed to update cart item quantity:", response.statusText);
            swal.fire("Error!", "Failed to update cart item quantity.", "error");
        }
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        swal.fire("Error!", "Failed to update cart item quantity.", "error");
    }
}


async function createOrder(items,cartTotal){
    console.log(items)
    try {
        const response = await fetch(`${url}/order/placed`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:localStorage.getItem('token'),
            },
            body: JSON.stringify({
                items:items,
                cartTotal:cartTotal
            })
        });

        if (response.ok) {
            // Display success message using Swal
            swal.fire("Success!", "Order placed successfully!", "success");
            window.location.href="./address.html"
            return await response.json();
        } else {
            // Display error message using Swal
            swal.fire("Error!", "Failed to place the order.", "error");
            throw new Error("Could not place an Order!");
        }
    } catch (err) {
        console.error(err);
        // Display error message using Swal
        swal.fire("Error!", "Failed to place the order.", "error");
        throw err;
    }
}





// updateCartUI();

fetchCartItems();