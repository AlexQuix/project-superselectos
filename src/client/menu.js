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


// IMPORT VIDEO
import "./video/publicidad.mp4"


// INIT PROGRAMING
function initMenu(){
    informationAcoout();
    let btnHome = document.querySelector("#cont-menu > #home");
    btnHome.onclick = ()=>{
        location.href = "/";
    }
    serchKeyWord();
    visibleOptMenuBtn()
    chageDesingMenu();
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
            contOptMenu.style.left = "0%";
            btnOptMenu.dataset.opt = "false";
        }
        btnClose.onclick = ()=>{
            body.style.overflowY = "visible";
            contOptMenu.style.left = "-100%";
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

// CHANGE DESING THE MENU
function chageDesingMenu(){
    let contMenu = document.getElementById("cont-menu").style;
    let btnUserSvg = document.querySelector("#cont-menu > #user > #btn-user > svg");
    let btnMenuSvg = document.querySelector("#cont-menu > #menu > #btn-menu > svg");
    let btnUserP = document.querySelector("#cont-menu > #user > #btn-user > p");
    let btnMenuP = document.querySelector("#cont-menu > #menu > #btn-menu > p");
    let inputSearch = document.querySelector("#cont-menu > #buscar > #buscar-search > input").style;
    let btnSearch = document.querySelector("#cont-menu > #buscar > #buscar-search > #btn-serch").style;
    let homeSvg = document.querySelector("#cont-menu > #home svg").style;
    let contPublicidad = document.querySelector("#container-publicidad");
    
    if(location.pathname === "/"){
        function changeColor(){
            
            if(scrollY >= contPublicidad.clientHeight - 100){
                contMenu.background = "rgba(255, 255, 255)";
                contMenu.boxShadow = "3px 3px 15px rgb(94, 94, 94)";
            
                btnUserSvg.style.fill = "#759126";
                btnMenuSvg.style.fill = "#759126";
                btnUserP.style.color = "#759126";
                btnMenuP.style.color = "#759126";
        
                inputSearch.background = "rgb(236, 236, 236)";
                inputSearch.color = "#759126";
            
                btnSearch.background = "#759126";
                homeSvg.fill = "#759126";

                controlsVideoPublicidadPause();
            }else{
                contMenu.background = "rgba(255, 255, 255, 0)";
                contMenu.boxShadow = "none";
            
                btnUserSvg.style.fill = "#fff";
                btnMenuSvg.style.fill = "#fff";
                btnUserP.style.color = "#fff";
                btnMenuP.style.color = "#fff";
        
                inputSearch.background = "rgb(0, 0, 0, 32%)";
                inputSearch.color = "#fff";
            
                btnSearch.background = "#757575";
                homeSvg.fill = "#fff";
            }
            
        }
        document.onscroll = changeColor;

        document.querySelector("#cont-menu > #menu").onmouseenter = ()=>{
            btnMenuSvg.style.fill = "#fff";
            btnMenuP.style.color = "#fff";
        }
        document.querySelector("#cont-menu > #menu").onmouseleave = changeColor;

        document.querySelector("#cont-menu > #user").onmouseenter = ()=>{
            btnUserSvg.style.fill = "#fff";
            btnUserP.style.color = "#fff";
        }
        document.querySelector("#cont-menu > #user").onmouseleave = changeColor;

        document.querySelector("#cont-menu > #home").onmouseenter = ()=>{
            homeSvg.fill = "#fff";
        }
        document.querySelector("#cont-menu > #home").onmouseleave = changeColor;

        document.querySelector("#cont-menu > #buscar > #buscar-search > #btn-serch").onmouseenter = ()=>{
            btnSearch.background = "rgba(11,156,77,1)";
        }
        document.querySelector("#cont-menu > #buscar > #buscar-search > #btn-serch").onmouseleave = changeColor;

        changeColor();
        controlsVideoPublicidadPlay();
    }
};
function controlsVideoPublicidadPlay(){
    let video = document.querySelector("video");
    let contControlsPlay = document.querySelector("#container-publicidad > #cont-controls-play");
    contControlsPlay.onclick = async ()=>{
        document.querySelector("#container-publicidad > #cont-controls-play").style.display = "none";
        await video.play();
    }
}
async function controlsVideoPublicidadPause(){
    let video = document.querySelector("video");
    document.querySelector("#container-publicidad > #cont-controls-play").style.display = "grid";
    await video.pause();
}

window.addEventListener("DOMContentLoaded", initMenu);