const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const salebtn=document.getElementById("sale")

let slideIndex = 0;
let slidesToShow = calculateSlidesToShow();




function calculateSlidesToShow() {
    if (window.innerWidth >= 992) {
        return 3; // Show 3 slides on large screens (992px and above)
    } else if (window.innerWidth >= 768) {
        return 2; // Show 2 slides on medium screens (768px to 991px)
    } else {
        return 1; // Show 1 slide on small screens (less than 768px)
    }
}

function showSlide(index) {
    if (index < 0) {
        slideIndex = 0;
    } else if (index >= slider.children.length - slidesToShow) {
        slideIndex = slider.children.length - slidesToShow;
    } else {
        slideIndex = index;
    }

    const slideWidth = 100 / slidesToShow;
    const offset = -slideIndex * slideWidth + '%';
    slider.style.transform = `translateX(${offset})`;
}

function updateSlidesToShow() {
    slidesToShow = calculateSlidesToShow();
    showSlide(slideIndex);
}

prevBtn.addEventListener('click', () => {
    showSlide(slideIndex - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(slideIndex + 1);
});

// Call showSlide initially to set the correct position
showSlide(slideIndex);

// Update the number of visible slides on window resize
window.addEventListener('resize', updateSlidesToShow);


// Get the user icon element by its ID



salebtn.addEventListener("click",()=>{
    const tok=localStorage.getItem("token")
if(!tok){
    alert("Please login First")
}
else{
    window.location.href="product.html"
}

})
const productImg=document.querySelector("#products-img")
productImg.addEventListener("click",()=>{
    const tok=localStorage.getItem("token")
    if(!tok){
        alert("Please Login first")
        }
        else{
            window.location.href="product.html"
        }

})