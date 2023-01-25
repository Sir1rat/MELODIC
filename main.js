// JSON
import products from './products.json' assert {type: 'json'};

const productBoxes = products.map((product) => {
    return `<div class="product-box">
              <img id="image2" src="${product.thumbnail}" alt="${product.productname}" class="product-img">
              <h2 class="product-title">${product.productname}</h2>
              <span class="price bottom">${product.price}0</span>
              <i class='bx bx-shopping-bag add-cart'></i>
           </div>`;
  });

  const container = document.getElementById("container");
productBoxes.forEach(box => {
    let div = document.createElement('div');
    div.innerHTML = box;
    container.appendChild(div);
});


// Cart Ver 1
//let cartIcon = document.querySelector("#cart-icon");
//let cart = document.querySelector(".cart");
//let closeCart = document.querySelector("#close-cart");

// Open Cart Ver 1
//cartIcon.onclick = () => {
//cart.classList.add("active");
//}

// Close Cart Ver 1
// closeCart.onclick = () => {
//cart.classList.remove("active");
//}

// Cart Ver 2
const cart = {
    icon: document.querySelector("#cart-icon"),
    element: document.querySelector(".cart"),
    closeButton: document.querySelector("#close-cart")
};

// Open Cart Ver 2
cart.icon.onclick = () => {
    cart.element.classList.add("active");
}

// Close Cart Ver 2
cart.closeButton.onclick = () => {
    cart.element.classList.remove("active");
}


// Cart Working JS
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}


// Making Function
function ready(){
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addcartClicked);
    }
    // Buy Button Work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked(){
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// Remove Items From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity Changes
function quantityChanged(event){
    var input = event.target;
    // Total Preis
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1;}
    updatetotal();
}

// Add To Cart
function addcartClicked(event){
    var button= event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            // Already added
            alert("You have already add this item to cart");
            return;
        }
    }

    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove -->
                        <i class='bx bx-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("0",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        document.getElementsByClassName("total-price")[0].innerText = "CHF" + total.toFixed(2);
    }



    document.getElementsByClassName("total-price")[0].innerText = "CHF" + total.toString();


}





