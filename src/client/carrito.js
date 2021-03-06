window.indexMsg = 0, 
window.arrayProductAnimations = [], 
window.$index = 0;;
class CarritoClass{

    // ADD ID AND SEARCH PRODUCT
    async serchProduct(){
        let json = JSON.parse(localStorage.getItem("mi carrito"));
        if(!this.index){
            if(json){
                json.forEach(async (element, index) => {
                    await requestFetch(element, index);
                    this.index = index + 1;
                });
            }
        }else{
            requestFetch(json[this.index], this.index);
            this.index = this.index + 1;
        }
    }

    // CONTENT CARRITO VISIBLE
    visibleContCarrito(){
        this.contCarrito = document.getElementById("carrito-container-product");
        this.contCarrito.style.right = "0%";
    }

    // CONTENT CARRITO HIDDEN
    hiddenContCarrito(){
        this.contCarrito.style.right = "-100%";
    }

    // SEARCH AND ADD ID THE LOCALSTORAGE
    addIdCarritoDB(product){
        let arrayID = localStorage.getItem("mi carrito");
        if(!arrayID){
            arrayID = [];
            arrayID.push({id: product.id, clasificacion: product.dataset.classification});
            let json = JSON.stringify(arrayID);
            localStorage.setItem("mi carrito", json);
        }else{
            let addId = JSON.parse(arrayID);
            addId.push({id: product.id, clasificacion: product.dataset.classification});
            let json = JSON.stringify(addId);
            localStorage.setItem("mi carrito", json);
        }
        this.serchProduct();
    }

    // ADD PRODUCT
    addContentCarrito(json){
        let contCarrito = document.querySelector("#carrito-container-product > div > #cont-producto");
        contCarrito.innerHTML += `
                                <article id="${json["_id"]}" class="product" data-index="${json["index"]}" data-price="${json["price"]}">
                                    <div id="inf-product">
                                        <div id="cont-img">
                                            <img src="/public/uploads/${json["image"]}">
                                        </div>
                                        <div id="cont-text">
                                            <header><h1>${json["name"]}</h1></header>
                                            <p>${json["description"]}</p>
                                            <span><strong>Precio:</strong>  $${json["price"]}</span>
                                        </div>
                                    </div>
                                    <div class="btn-close" id="${json["_id"]}">
                                        <svg width="476" height="409" viewBox="0 0 476 409" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M42.9024 235.994L4.49308 73.0877C1.72002 61.3256 10.9947 50.125 23.508 50.125H342.643L350.091 15.0297C351.947 6.28207 359.932 0 369.195 0H452.5C463.27 0 472 8.41552 472 18.7969V31.3281C472 41.7095 463.27 50.125 452.5 50.125H395.72L338.644 319.104C352.298 326.674 361.5 340.867 361.5 357.141C361.5 381.364 341.129 401 316 401C290.871 401 270.5 381.364 270.5 357.141C270.5 344.865 275.738 333.774 284.169 325.812H113.831C122.262 333.774 127.5 344.865 127.5 357.141C127.5 381.364 107.129 401 81.9999 401C56.8709 401 36.4999 381.364 36.4999 357.141C36.4999 339.775 46.9714 324.769 62.1579 317.663L57.6753 298.65C54.9022 286.888 64.1769 275.688 76.6902 275.688H294.78L300.098 250.625H61.9173C52.8125 250.625 44.9198 244.552 42.9024 235.994Z" fill="black"/><path d="M343.133 50.2288L343.049 50.625H342.643H23.508C11.2934 50.625 2.28604 61.5476 4.97974 72.973L43.3891 235.879C45.3506 244.2 53.0326 250.125 61.9173 250.125H300.098H300.715L300.587 250.729L295.269 275.791L295.185 276.188H294.78H76.6902C64.4756 276.188 55.4683 287.11 58.162 298.535L62.6445 317.549L62.7377 317.944L62.3698 318.116C47.3453 325.146 36.9999 339.984 36.9999 357.141C36.9999 381.07 57.1296 400.5 81.9999 400.5C106.87 400.5 127 381.07 127 357.141C127 345.011 121.825 334.049 113.488 326.176L112.574 325.312H113.831H284.169H285.427L284.513 326.176C276.175 334.049 271 345.011 271 357.141C271 381.07 291.13 400.5 316 400.5C340.87 400.5 361 381.07 361 357.141C361 341.063 351.91 327.03 338.401 319.542L338.078 319.362L338.154 319.001L395.231 50.0212L395.315 49.625H395.72H452.5C463.011 49.625 471.5 41.4162 471.5 31.3281V18.7969C471.5 8.70881 463.011 0.5 452.5 0.5H369.195C360.156 0.5 352.384 6.62873 350.58 15.1334L350.091 15.0297L350.58 15.1335L343.133 50.2288Z" stroke="black"/></g><defs><filter id="filter0_d" x="0" y="0" width="476" height="409" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg> 
                                        <span>Eliminar del carrito</span>
                                    </div>
                                </article>`;
        this.sumarPrice(json["price"]);
    }

    // SUMAR EL PRECIO
    sumarPrice(price){
        let contPrice = document.querySelector("#carrito-container-product > div > #inf-price > span > strong");
        let totalPrice = localStorage.getItem("total price");
        if(!totalPrice){
            localStorage.setItem("total price", price);
            contPrice.innerHTML = `$${price}`;
        }else{
            let total = `${parseFloat(totalPrice) + parseFloat(price)}`.match(/([0-9]*(.[0-9]([0-9])?)?)/i)[0];
            contPrice.innerHTML = `$${total}`;
            localStorage.setItem("total price", `${total}`);
        }
    }

    // RESTAR EL PRECIO
    restPrice(price){
        let contPrice = document.querySelector("#carrito-container-product > div > #inf-price > span > strong");
        let totalPrice = localStorage.getItem("total price");
        if(totalPrice){
            let total = `${parseFloat(totalPrice) - parseFloat(price)}`.match(/([0-9]*(.[0-9]([0-9])?)?)/i);
            if(Object.is(total[0], NaN) || total[0].match(/(-)/i)){
                contPrice.innerHTML = `$0`;
                localStorage.setItem("total price", "0");
                localStorage.setItem("mi carrito", "[]");
                this.index = 0;
            }else{
                contPrice.innerHTML = `$${total[0]}`;
                localStorage.setItem("total price", total[0]);
            }
        }
    }


    // DELETE PRODUCT
    deleteContentCarrito(){
        
        let contCarrito = document.querySelectorAll("#carrito-container-product > div > #cont-producto .product .btn-close");
        contCarrito.forEach(element=>{
            element.onclick = (e)=>{
                let product = element.parentNode;
                let index = product.dataset.index;
                let price = product.dataset.price;

                let idProduct = localStorage.getItem("mi carrito");
                let json = JSON.parse(idProduct);
                json[index] = null;
                let string = JSON.stringify(json);

                localStorage.setItem("mi carrito", string);
                product.remove();

                this.restPrice(price);
                this.addMessage();
            }
        });
    }

    // MESSAGE
    addMessage(){
        let contMessage = document.querySelector("#carrito-container-product > div > #inf-price > #container-message");
        contMessage.innerHTML += `<span id="m${indexMsg++}">Has eliminado un producto</span>`;
        setTimeout(()=>{
            let span = document.querySelector(`#carrito-container-product > div > #inf-price > #container-message #m${--indexMsg}`);
            span.remove();
        }, 2000);
    }
};


window.Carrito = new CarritoClass();

// FETCH SEARCH PRODUCT
async function requestFetch(product, index){
    if(product){
        let response = await fetch(`/api/products/get/${product.id}`);
        let json = await response.json();
        json["index"] = index;
        Carrito.addContentCarrito(json);
    }
}


// BUTTON VISIBLE CONTENT CARRITO
function visibleContCarrito(){
    let btn = document.getElementById("container-carrito");
    let body = document.querySelector("body");
    if(btn.dataset.activar === "true"){
        body.style.overflowY = "hidden";
        Carrito.visibleContCarrito();
        Carrito.deleteContentCarrito();
        btn.dataset.activar = "false";
    }else{
        Carrito.hiddenContCarrito();
        body.style.overflowY = "visible";
        btn.dataset.activar = "true";
    }
}



// CALCULATE PRICE TOTAL
(function(){
    localStorage.setItem("total price", "");
    let btn = document.getElementById("container-carrito");
    let btnClose = document.querySelector("#carrito-container-product > div > #btn-close")
    
    btn.onclick = visibleContCarrito;
    btnClose.onclick = visibleContCarrito;

    Carrito.serchProduct();
    pay();
})();



// BUTTON PAY
function pay(){
    let btnPay = document.querySelector("#carrito-container-product > div > #cont-btn-pay");
    btnPay.onclick = ()=>{
        localStorage.setItem("payment", "true");
        location.href = "/payment";
    }
}


// MESSAGE ADD PRODUCT
window.$totalMsgAddProduct = 0;
window.addMessageMenu = function(name){
    let contIndex = document.querySelector("#cont-menu > #container-message > #contador-index");
    if(indexMsg > 0){
        contIndex.innerHTML = `${$totalMsgAddProduct}`;
    }else{
        contIndex.innerHTML = "";
    }

    let contMessage = document.querySelector("#cont-menu > #container-message");
    contMessage.innerHTML += `<span id="m${indexMsg++}">Has agregado un producto a tu carrito</span>`;
    $totalMsgAddProduct += 1;
    setTimeout(()=>{
        let span = document.querySelector(`#cont-menu > #container-message > #m${--indexMsg}`);
        span.remove();
        if(indexMsg == 0){
            $totalMsgAddProduct = 0;
            contIndex.innerHTML = "";
        }
    }, 2000);
}