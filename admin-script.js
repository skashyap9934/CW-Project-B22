let tbodyEL = document.querySelector("tbody");
let orders = JSON.parse(localStorage.getItem("order")) || [];
displayData(orders);
console.log(orders)
function displayData(data) {
    tbodyEL.innerHTML = null;
    data.forEach((order) => {
        let tableRow = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = order.name;
        let mobile = document.createElement("td");
        mobile.innerText = order.mob;
        let address = document.createElement("td");
        address.innerText = order.add;
        let paymentAmount = document.createElement("td");
        paymentAmount.innerText = order.amt;

        tableRow.append(name, mobile, address, paymentAmount);
        tbodyEL.append(tableRow);
    })
}