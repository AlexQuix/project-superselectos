// IMPORT CSS
import "./style/home.scss";
import "./style/about.scss";
import "./style/login.scss";
import "./style/menu.css";
import "./style/carrito.scss";
import "./style/loader.scss";
import "./style/payment.css";
import "./style/product.css";


// IMPORT IMAGES
import "./img/logo.png";
import "./img/portada.jpg";
import "./img/portada.png";
import "./img/clasification/alimentos.jpg";
import "./img/clasification/aseo.jpg";
import "./img/clasification/carnes.jpg";
import "./img/clasification/electronica.jpg";
import "./img/clasification/juguetes.jpeg";
import "./img/clasification/mas.jpeg";


// IMPORT PARTIALS HTML
import "./views/parts/carrito.html";
import "./views/parts/footer.html";
import "./views/parts/loader.html";
import "./views/parts/menu.html";


// INIT PROGRAMING
function initMenu(){
    informationAcoout();
    let btnHome = document.querySelector("#cont-menu > #home");
    btnHome.onclick = ()=>{
        location.href = "/";
    }
    serchKeyWord();
    visibleOptMenuBtn()
}


// ACTIVE OR DESACTIVE THE OPTION THE NAVIGATION
function visibleOptMenuBtn(){
    let body = document.querySelector("body");
    let contOptMenu = document.querySelector("#container-opt-menu");
    let btnClose = document.querySelector("#container-opt-menu > #btn-close");
    let btnOptMenu = document.querySelector("#cont-menu > #menu");
    btnOptMenu.onclick = ()=>{
        if(btnOptMenu.dataset.opt === "true"){
            body.style.overflowY = "hidden";
            contOptMenu.style.display = "grid";
            btnOptMenu.dataset.opt = "false";
        }
        btnClose.onclick = ()=>{
            body.style.overflowY = "visible";
            contOptMenu.style.display = "none";
            btnOptMenu.dataset.opt = "true";
        }
    }
}


// ADD KEY WORD THE CONTENT
function addContKeyWord(json){
    let contKeyWord = document.querySelector("#cont-menu > #buscar > #search-result");
    contKeyWord.innerHTML += `
        <a href="/product/clasification/search?id=${json["_id"]}">${json["wordkey"]}</a>
    `;
}

// SEARCH KEY WORD
function serchKeyWord(){
    let input = document.querySelector("#cont-menu > #buscar > #buscar-search > input")
    input.oninput = async function(e){
        let contKeyWord = document.querySelector("#cont-menu > #buscar > #search-result");
        contKeyWord.innerHTML = "";
        let btnSerch = document.querySelector("#cont-menu > #buscar > #buscar-search > #btn-serch");
        
        /* BUSCAR KEYWORD */
        let serchWord = e.target.value;
        if(serchWord !== ""){
            let response = await fetch(`/api/products/keyword/${serchWord}`);
            let json = await response.json();
            btnSerch.href = `/product/clasification/search?id=${json[0]["_id"]}`;
            for(let element of json){
                addContKeyWord(element);
            }
        }
    }
}


// URL FOR CREATE ACCOUNT
function urlCreateAccount(){
    let btn = document.querySelector("#cont-menu > #user");
    btn.onclick = (e)=>{
        location.href = "/login/signup"
    }
}

// DETERMINE IF EXIST ONE ACCOUNT
function informationAcoout(){
    let btn = document.querySelector("#cont-menu > #user");
    if(localStorage.getItem("user")){
        btn.onclick = (e)=>{
            if(localStorage.getItem("user")){
                location.replace("/login/informacioncuenta");
            }else{
                urlCreateAccount();
            }
        }
    }else{
        urlCreateAccount();
    }
}

window.onload = initMenu();