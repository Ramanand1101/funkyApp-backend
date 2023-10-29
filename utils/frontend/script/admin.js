// const url = "http://localhost:3000";
const url = "https://backend-funky.onrender.com"
const product=()=>{
    const payload={
        name:document.getElementById("name").value,
        price:document.getElementById("price").value,
        category:document.getElementById("category").value,
        size:document.getElementById("size").value,

        image:document.getElementById("image").value,
        description:document.getElementById("description").value,
        rating:document.getElementById("rating").value
    }

    fetch(`${url}/product/create`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":localStorage.getItem("token")
        },
        body:JSON.stringify(payload)
        
        
    })
    .then((res) => res.json())
        .then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Product Created Successfully!',
                text: res.message,
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
            });
        });
};
//Create product data code here
let container = document.querySelector("#products tbody");

fetch(`${url}/product/`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Authorization":localStorage.getItem("token"),
    },
})
    .then((responseObject) => {
        if (!responseObject.ok) {
            throw new Error("Network response was not ok");
        }
        return responseObject.json();
    })
    .then((acctualData) => {
        console.log(acctualData);
        displayProducts(acctualData);
        Swal.fire({
            icon: 'success',
            title: 'Products Fetched Successfully!',
            text: 'Product data has been loaded.',
        });
    })
    .catch((error) => {
        console.error("Error fetching products:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to fetch product data. Please try again later.',
        });
    });

    //data is to be fetch data
    function displayProducts(data){
        data.forEach(element => {
            let card=document.createElement("tr");

            const td1 = document.createElement("td");
            
            let image=document.createElement("img")
            image.setAttribute("src",element.image)
            image.setAttribute("id","product-img")
            
            let brand=document.createElement("td")
            brand.innerText=element.name     
             
            let price=document.createElement("td")
            price.innerText=element.price    

            let category=document.createElement("td")
            category.innerText=element.category    

            let desc=document.createElement("td")
            desc.innerText=element.description  

            let size=document.createElement("td")
            size.innerText=element.size  

            let rating=document.createElement("td")
            rating.innerText=element.rating 

            let td2=document.createElement("td")
            let del=document.createElement("button")
            del.innerText="Delete"
            del.setAttribute("class","del-btn")
            del.addEventListener("click", ()=>{
                console.log("sss")
                deleteNote(element._id)
            })
           
            td1.append(image)
            td2.append(del)
            card.append(td1,brand,price,category,desc,size,rating,td2);
            container.append(card)
        });
    }
    //delete product data code here

    const deleteNote = (noteID) => {
        fetch(`${url}/product/delete/${noteID}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Deleted Successfully!',
                    text: res.message,
                });
                // Optionally, you can remove the deleted product from the UI here
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
            });
    };