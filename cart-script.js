let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
let container = document.getElementById("grid");
let totalAmt = document.getElementById("total-cost");
totalCost(cartData);
displayData(cartData);
console.log(cartData)
function displayData(data) {
    container.innerHTML = null;
    data.forEach((products) => {     
        let itemBox = document.createElement("div");
        let image = document.createElement("img");
        image.src = products.avatar;
        image.style.width = "100%";
        let name = document.createElement("h2");
        name.innerText = products.name;
        name.style.marginLeft = "11px";
        let category = document.createElement("h4");
        category.innerText = "Category: " + products.category;
        category.style.marginLeft = "11px";
        let description = document.createElement("p");
        description.innerText = products.description;
        description.style.marginLeft = "11px";
        description.style.textAlign = "justify";
        description.style.marginRight = "20px";
        let price = document.createElement("h2");
        price.innerText = "₹ " + products.price;
        price.style.marginLeft = "11px";
        
        let updateQty = document.createElement("div");
        let increase = document.createElement("button");
        increase.innerText = "+";
        let quantity = document.createElement("h4");
        quantity.innerText = products.quantity;
        let decrease = document.createElement("button");
        decrease.innerText = "-";
        let remove = document.createElement("button");
        remove.style.width = "fit-content";
        remove.innerText = "Remove";
        
        increase.addEventListener("click", () => {
            products.quantity = products.quantity + 1;
            localStorage.setItem("cart-data", JSON.stringify(cartData));
            totalCost(cartData);
            quantity.innerText = products.quantity;
        })

        decrease.addEventListener("click", () => {
            if(products.quantity == 1) alert("Least Possible Count. You Can Only Remove.");
            else {
                products.quantity = products.quantity - 1;
                localStorage.setItem("cart-data", JSON.stringify(cartData));
                totalCost(cartData);
                quantity.innerText = products.quantity;
            }
        })

        remove.addEventListener("click", () => {
            cartData = cartData.filter((element) => {
                if(element != products) return true;
            })
            localStorage.setItem("cart-data", JSON.stringify(cartData));
            totalCost(cartData);
            displayData(cartData);
        })

        updateQty.append(increase, quantity, decrease, remove);
        itemBox.append(image, name, category, description, price, updateQty);
        container.append(itemBox);
    })
}

function totalCost(data) {
    let cost = 0;
    totalAmt.innerHTML = null;
    data.forEach((product) => {
        cost += (product.price * product.quantity);
    })
    totalAmt.innerText = cost;
}