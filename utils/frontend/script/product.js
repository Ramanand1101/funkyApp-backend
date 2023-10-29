const url = "https://backend-funky.onrender.com"
// const url = "http://localhost:3000";

const productsContainer = document.querySelector(".product-card");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
let cartCount = document.querySelector(".cartCount");



/* adding bag icon on cart */



/* all above code for cart */
let fetched = [];
let cloth = [];
updateCartCount();
function updateCartCount() {
  fetch(`${url}/cart/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((cartData) => {
      cartCount.innerText = cartData.cartItems.length;
      console.log("dddd", cartData.cartItems.length)
    })
    .catch((err) => console.log("Error fetching cart data:", err));
}

function fetchData() {
  fetch(`${url}/product/`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      fetched = data;
      // Filter products based on category filter value
      cloth = fetched.filter((ele) => {
        return ele.category === categoryFilter.value || categoryFilter.value === "all";
      });
      // Display filtered products
      getCards(cloth);
    })
    .catch((err) => console.log("Error fetching data:", err));
}

// Event listener for price sort dropdown
priceSort.addEventListener("change", (e) => {
  if (e.target.value == "asc") {
    let newData = cloth.sort((a, b) => a.price - b.price);
    getCards(newData);
  } else if (e.target.value == "desc") {
    let newData = cloth.sort((a, b) => b.price - a.price);
    getCards(newData);
  } else if (e.target.value == "sort") {
    // Reset to the original fetched data
    getCards(fetched);
  }
});
function getCards(data) {
  productsContainer.innerHTML = "";
  data.forEach((elem) => {
    const div = document.createElement("div");
    div.classList.add("products");

    let image = document.createElement("img");
    image.setAttribute("src", elem.image);
    image.setAttribute("class", "p-image");

    let name = document.createElement("h3");
    name.innerText = elem.name;

    let desc = document.createElement("p");
    desc.innerText = elem.description;

    let cat = document.createElement("p");
    cat.innerText = elem.category;

    let price = document.createElement("p");
    price.innerText = `Price: ₹ ${elem.price}`;

    let rating = document.createElement("p");
    rating.innerText = elem.rating;

    let size = document.createElement("p");
    size.innerText = elem.size;


    let btn = document.createElement("button");
    btn.innerText = "🛒 Add To Cart";
    
    btn.className = "addTocart";

    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const addToCartResponse = await fetch(`${url}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            productId: elem._id,
            quantity: 1,
          }),
        });

        const addToCartData = await addToCartResponse.json();

        if (addToCartResponse.ok) {
          // Update the cart count in the UI after adding the product to the cart
          updateCartCount();
          swal.fire("Success!", "Your Product is added to the cart", "success");

        } else {
          swal.fire("Error!", addToCartData.error || "Failed to add product to the cart", "error");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        swal.fire("Error!", "Failed to add product to the cart", "error");
      }
    });


    div.append(image, name, price, desc, cat, size, rating, btn);
    productsContainer.append(div);
  });
}


// Event listener for category filter change
categoryFilter.addEventListener("change", () => {
  // Filter products based on category filter value
  cloth = fetched.filter((ele) => {
    return ele.category === categoryFilter.value || categoryFilter.value === "all";
  });
  // Display filtered products
  getCards(cloth);
});



document.getElementById('search').addEventListener('keyup', function(event) {
  const searchInput = document.getElementById('search').value;

  // Check if the search input is empty
  if (searchInput.trim() === '') {
      // Clear search results
      clearResults();
      productsContainer.style.display = 'block';
  } else if (event.key === 'Enter') {
      // Perform search when Enter key is pressed and search input is not empty
      performSearch(searchInput);
      productsContainer.style.display = 'none';
  }
});

// Function to clear search results
function clearResults() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
}


// Function to perform the search
async function performSearch(searchInput) {
  
  try {
      const response = await fetch(`${url}/product/search`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization:localStorage.getItem("token")
          },
          body: JSON.stringify({
              text: searchInput
          }),
      });

      const data = await response.json();
      console.log("data",data)

      if (response.status === 200) {
          displayResults(data);
      } else {
          displayError(data.error);
      }
  } catch (error) {
      displayError('Internal Server Error. Please try again later.');
  }
}

// Function to display search results
function displayResults(products) {

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (products.length === 0) {
      resultsContainer.textContent = 'No products found.';
  } else {
      products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("products");
        let image = document.createElement("img");
        image.setAttribute("src", product.image);
        image.setAttribute("class", "p-image");
    
        let name = document.createElement("h3");
        name.innerText = product.name;
    
        let desc = document.createElement("p");
        desc.innerText = product.description;
    
        let cat = document.createElement("p");
        cat.innerText = product.category;
    
        let price = document.createElement("p");
        price.innerText = `Price: ₹ ${product.price}`;
    
        let rating = document.createElement("p");
        rating.innerText = product.rating;
    
        let size = document.createElement("p");
        size.innerText = product.size;
    
    
        let btn = document.createElement("button");
        btn.innerText = "🛒 Add To Cart";
        
        btn.className = "addTocart";
    
        btn.addEventListener("click", async (e) => {
          e.preventDefault();
    
          try {
            const addToCartResponse = await fetch(`${url}/cart/add`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                productId: product._id,
                quantity: 1,
              }),
            });
    
            const addToCartData = await addToCartResponse.json();
    
            if (addToCartResponse.ok) {
              // Update the cart count in the UI after adding the product to the cart
              updateCartCount();
              swal.fire("Success!", "Your Product is added to the cart", "success");
    
            } else {
              swal.fire("Error!", addToCartData.error || "Failed to add product to the cart", "error");
            }
          } catch (error) {
            console.error("Error adding product to cart:", error);
            swal.fire("Error!", "Failed to add product to the cart", "error");
          }
        });
    
    
        div.append(image, name, price, desc, cat, size, rating, btn);
        resultsContainer.append(div);
      });
  }
}

// Function to display error messages
function displayError(message) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.textContent = `Error: ${message}`;
}

// Initial fetch data function call
fetchData();

let cartIcon = document.getElementById('cartIcon');
cartIcon.addEventListener("click", () => {
  window.location.href = "./cart.html"
})



