let container = document.getElementById("grid");
let searchBox = document.getElementById("search-box");
let formEl = document.querySelector("form");
let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];

let myAPI = "https://63c7bab6075b3f3a91d1aaba.mockapi.io/prod";

fetchData(myAPI);
async function fetchData(myAPI) {
    let streamData = await fetch(myAPI);
    let data = await streamData.json();
    if(searchBox.value !== "") searchedData(data);
    else displayData(data);
}

function displayData(data) {
    container.innerHTML = null;
    data.forEach((products) => {
        let itemBox = document.createElement("div");
        itemBox.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
        itemBox.style.borderRadius = "10px";

        let image = document.createElement("img");
        image.src = products.avatar;
        image.style.width = "100%";
        let name = document.createElement("h2");
        name.innerText = products.name;
        let category = document.createElement("h3");
        category.innerText = "Category: " + products.category;
        let description = document.createElement("p");
        description.innerText = products.description;
        let price = document.createElement("h3");
        price.innerText = "₹ " + products.price;
        let addToCart = document.createElement("button");
        addToCart.innerText = "Buy Now";

        name.style.marginLeft = "25px";
        category.style.marginLeft = "25px";
        description.style.marginLeft = "25px";
        description.style.textAlign = "justify";
        description.style.marginRight = "11px";
        price.style.marginLeft = "25px";

        addToCart.addEventListener("click", () => {
            let flag = true;
            cartData.forEach((element) => {
                if(element.id == products.id) flag = false;
            })
            if(flag) {
                let newProd = {...products, quantity: 1};
                cartData.push(newProd);
                localStorage.setItem("cart-data", JSON.stringify(cartData));
                alert("Product Added To The Cart Successfully");
            } else alert("Product Already In The Cart");
        })

        itemBox.append(image, name, category, description, price, addToCart);
        container.append(itemBox);
    })
}

function searchedData(data) {
    data = data.filter((element) => {
        if(element.category.toUpperCase().includes(searchBox.value.toUpperCase())) return true;
    })
    displayData(data);
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchData(myAPI);
})