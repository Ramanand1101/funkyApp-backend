

// const url = "http://localhost:3000"
const url = "https://backend-funky.onrender.com"
// Get DOM elements
let fName = document.getElementById("fullname");
let pNo = document.getElementById("phonenumber");
let altNo = document.getElementById("altphonenumber");
let add = document.getElementById("address");
let zip = document.getElementById("pincode");
let state = document.getElementById("state");
let city = document.getElementById("city");
let country = document.getElementById("country");
let addressBtn = document.getElementById("saveAddressBtn");

function fetchAddressItems() {
    return fetch(`${url}/order/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                console.log("44433", data)
                addressV(data)

            } else {
                console.error("Invalid response format from the server.");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error fetching address data", error.message);
            return null;
        });
}


function addressV(data) {
    data.forEach(element => {

        addressMultiuser(element._id)
    });

}
function addressMultiuser(id) {
    let userId = id
    console.log("ssss222", userId)
    addressBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const userId = id;
        console.log("s123ss", userId)
        const dataToSend = {
            userId: userId,
            name: fName.value,
            phoneNumber: pNo.value,
            altPhoneNumber: altNo.value,
            fullAddress: add.value,
            city: city.value,
            state: state.value,
            zipCode: zip.value,
            country: country.value
        };

        console.log("Data to Send:", dataToSend);
        postAddressData(dataToSend);

    });


    function postAddressData(addressData) {
        console.log("11111")
        // Check if all required fields have values
        if (!addressData.name || !addressData.phoneNumber || !addressData.fullAddress || !addressData.city || !addressData.state || !addressData.zipCode || !addressData.country) {
            console.error("All address fields are required.");
            return; // Stop further execution if any required field is missing
        }

        fetch(`${url}/address/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(addressData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Address added successfully. Address Data:", data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Address added successfully!',
                    timer: 2000, // Auto close notification after 2 seconds
                    showConfirmButton: false
                });
                window.location.href = "./orderSummary.html";
                console.log("mkll0")
                // Handle the success response if needed
            })
            .catch((error) => {
                console.error("Error occurred while adding address. Please try again.", error);
                // Show SweetAlert error notification
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error occurred while adding address. Please try again.'
                });
                // Handle the error if needed
            });
        }
}



// Fetch address data initially
fetchAddressItems();