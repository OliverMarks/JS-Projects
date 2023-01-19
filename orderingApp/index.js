import { menuArray } from '/orderingApp/data.js'

const menuContainer = document.getElementById("menu-container")
const orderedItems = document.getElementById("ordered-items")
const totalPrice = document.getElementById("total-price")
const paymentDetails = document.getElementById("payment-details")
const paymentForm = document.getElementById ("payment-form")

document.addEventListener("DOMContentLoaded", menuItems);


let orderArray = []

function menuItems() {
    menuArray.forEach(item => {
    menuContainer.innerHTML += `<div class="menu-item">
    <div class="emoji" >${item.emoji}</div>
    <div class="description>
    <div class="name" >${item.name}</div>
    <div class="ingredients">${item.ingredients}</div>
    <div class="price" >$${item.price}</div>
    </div>
    <button class="addToMenu" data-item="${item.id}">+</button>
    </div>`    
    })
}
    




document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        addItemToOrder(Number(e.target.dataset.item))
    }
    else if(e.target.id === 'complete-order'){   
        completeOrder()
    }
    else if(e.target.classList.contains("remove-item")){
        removeItem((Number(e.target.dataset.id)))
    }
    else if(e.target.id === 'pay') {
        pay()
    }
})

function addItemToOrder(itemId) {
    const targetItemObj = menuArray.filter(function(item){
       return  item.id === Number(itemId)
    })[0]
   
        orderArray.unshift(targetItemObj) 
        renderOrder()   
    }


function renderOrder() {
    let orderTotal = 0
    orderArray.forEach(item => { 
        orderTotal += item.price
    })
    orderedItems.innerHTML = ''
    for (let i = 0; i < orderArray.length; i++) {
        orderedItems.innerHTML += `<div>
        ${orderArray[i].name} ${orderArray[i].price} 
        <button data-id="${orderArray[i].id}" class="remove-item">remove item</button>
        </div>`
         
}
    totalPrice.innerHTML= `Total Price $${orderTotal}`
    

}

function removeItem(itemId) {
   const itemToBeRemoved = orderArray.findIndex(findItem)
    function findItem(item) {
        return  item.id === Number(itemId)
    }
    orderArray.splice(itemToBeRemoved, 1)
    renderOrder()
}


function completeOrder() {
    paymentDetails.style.display = 'inline'
}

function pay() {
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')
    paymentDetails.style.display = "none"
    orderedItems.innerHTML = `<div class="order-complete"><p>Thanks, ${name}! Your order is on its way!</p></div>`

}