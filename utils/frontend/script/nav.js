

const menu = document.querySelector(".menu");
const menuMain = menu.querySelector(".menu-main");
const goBack = menu.querySelector(".go-back");
const menuTrigger = document.querySelector(".mobile-menu-trigger");
const closeMenu = menu.querySelector(".mobile-menu-close");



let subMenu;
menuMain.addEventListener("click", (e) =>{
    if(!menu.classList.contains("active")){
        return;
    }
  if(e.target.closest(".menu-item-has-children")){
       const hasChildren = e.target.closest(".menu-item-has-children");
     showSubMenu(hasChildren);
  }
});
goBack.addEventListener("click",() =>{
     hideSubMenu();
})
menuTrigger.addEventListener("click",() =>{
     toggleMenu();
})
closeMenu.addEventListener("click",() =>{
     toggleMenu();
})
document.querySelector(".menu-overlay").addEventListener("click",() =>{
    toggleMenu();
})
function toggleMenu(){
    menu.classList.toggle("active");
    document.querySelector(".menu-overlay").classList.toggle("active");
}
function showSubMenu(hasChildren){
   subMenu = hasChildren.querySelector(".sub-menu");
   subMenu.classList.add("active");
   subMenu.style.animation = "slideLeft 0.5s ease forwards";
   const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
   menu.querySelector(".current-menu-title").innerHTML=menuTitle;
   menu.querySelector(".mobile-menu-head").classList.add("active");
}

function  hideSubMenu(){  
   subMenu.style.animation = "slideRight 0.5s ease forwards";
   setTimeout(() =>{
      subMenu.classList.remove("active");	
   },300); 
   menu.querySelector(".current-menu-title").innerHTML="";
   menu.querySelector(".mobile-menu-head").classList.remove("active");
}

window.onresize = function(){
    if(this.innerWidth >991){
        if(menu.classList.contains("active")){
            toggleMenu();
        }

    }
}

/* ===================================================== logout functionality done here ================================= */



// Event listener for the "Sign-Out" link
document.addEventListener('DOMContentLoaded', function() {
    const logOutLink = document.getElementById('logOut');
    
    if (logOutLink) {
        logOutLink.addEventListener("click", function(event) {
            event.preventDefault();
            console.log("dddd");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "index.html";
        });
    } else {
        console.error("logOutLink element not found in the DOM");
    }
});


const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const username1 = urlParams.get('uname')

if (token) {
    localStorage.setItem('token', token);
    console.log('Token stored in localStorage:', token);
    console.log("username",username1)
} else {
    console.error('Token not found in the URL.');
}



let user = localStorage.getItem("username")||username1;
let profile = document.getElementById("profile");

if (user) {
    profile.innerText = user.split('@')[0];
} else {
    profile.innerText = " ";
}

console.log(user);



    let t = localStorage.getItem("token");
    let check = document.getElementById("shopcheck");

        check.addEventListener("click", () => {
            if (!t) {
                alert("Please Login First");
            } else {
                window.location.href = "product.html";
            }
        });
   


const logo = document.querySelector('.logo');
logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})
