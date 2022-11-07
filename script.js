// ----- Declare drink menu variable, which is an array of objects:
const drinkMenu = [
  {
    id: "CLB",
    name: "Espresso",
    kj: "1630",
    item: [
      { size: "Sml", price: 2.5 },
      { size: "Med", price: 4.5 },
      { size: "Lge", price: 6.5 },
    ],
  },
  {
    id: "CSB",
    name: "Cappacino",
    kj: "1630",
    item: [
      { size: "Sml", price: 2.5 },
      { size: "Med", price: 4.5 },
      { size: "Lge", price: 6.5 },
    ],
  },
  {
    id: "CMO",
    name: "Mocha",
    kj: "2630",
    item: [
      { size: "Sml", price: 3 },
      { size: "Med", price: 5 },
      { size: "Lge", price: 7 },
    ],
  },
  {
    id: "TDB",
    name: "Dilmah Black Tea",
    kj: "630",
    item: [
      { size: "Sml", price: 2 },
      { size: "Med", price: 4 },
      { size: "Lge", price: 6 },
    ],
  },
  {
    id: "TDW",
    name: "Dilmah White Tea",
    kj: "620",
    item: [
      { size: "Sml", price: 2 },
      { size: "Med", price: 4 },
      { size: "Lge", price: 6 },
    ],
  },
];

// ----- Declare variables to access the DOM:
const shopProducts = document.querySelector(".products");
const checkoutList = document.querySelector(".checkout-list");
const checkoutTotal = document.querySelector(".checkout-total");
const checkout = [];
const pictures = document.querySelector(".pictures");

// ----- For loop to diplay the menu of drinks, known as PRODUCT class:
for (let i = 0; i < drinkMenu.length; i += 1) {
  const template = `
    <div class="product-item">
      <div class="product-item-inner">
        <div class="col info">
          <div class="name"><h3>${drinkMenu[i].name}</h3></div>
          <div class="kj"><p>${drinkMenu[i].kj}Kj</p></div>
          <button data-id="${drinkMenu[i].id}" data-size="${
    drinkMenu[i].item[0].size
  }">
            ${drinkMenu[i].item[0].size} ${format(drinkMenu[i].item[0].price)}
          </button>
          <button data-id="${drinkMenu[i].id}" data-size="${
    drinkMenu[i].item[1].size
  }">
            ${drinkMenu[i].item[1].size} ${format(drinkMenu[i].item[1].price)}
          </button>
          <button data-id="${drinkMenu[i].id}" data-size="${
    drinkMenu[i].item[2].size
  }">
            ${drinkMenu[i].item[2].size} ${format(drinkMenu[i].item[2].price)}
          </button>
        </div>
      </div>
    </div>
    `;
  shopProducts.innerHTML += template;
}
// ----- End of for loop for MENU.

// ----- Declare variable to access an array of buttons
const buttons = shopProducts.querySelectorAll("button");
// console.log(buttons);

// ----- Loop through the button array to capture each click
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // console.log(event.target);
    const itemId = event.target.dataset.id;
    const itemSize = event.target.dataset.size;
    // console.log(itemId, itemSize);
    addToCart(itemId, itemSize);
    console.log(itemId);
    // --------Declare function to select correct coffee picture:
    function selectPic(itemId) {
      if (itemId === "CLB") {
        return "https://i.imgur.com/mYiW8uE.png";
      } else if (itemId === "CSB") {
        return "https://i.imgur.com/uGEGzte.png";
      } else if (itemId === "CMO") {
        return "https://i.imgur.com/8ZfbCRd.png";
      } else if (itemId === "TDB") {
        return "https://i.imgur.com/d8iOzVz.png";
      } else if (itemId === "TDW") {
        return "https://i.imgur.com/Zi9YhMQ.png";
      }
    }
    // pictures.removeAttribute('src');
    // const newImage = document.createElement('img')
    const newImage = document.querySelector("#pics");

    newImage.setAttribute("src", selectPic(itemId));
    // const divTarget = document.querySelector('.pictures');
    // pictures.append(newImage);
  });
});

// ----- Declare the addToCart function:
function addToCart(id, size) {
  // Declare the variables: selectedItem, selectedSize and cartFound
  const selectedItem = drinkMenu.find((drink) => {
    return drink.id === id;
  });
  // console.log(selectedItem);
  const selectedSize = selectedItem.item.find((drink) => {
    return drink.size === size;
  });
  // console.log(selectedSize);
  //  const cartFound = checkout.find( (x) => {return x.id === id} ); other option
  const cartFound = checkout.find((x) => x.id === id);
  console.log("Found", cartFound);
  // If/else statement if cartFound exists:
  if (!cartFound) {
    // Create an object that is first item in the cart:
    const addItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      [size]: {
        price: selectedSize.price,
        quantity: 1,
        total: selectedSize.price,
      },
    };
    // Add the item to the checkout list
    checkout.push(addItem);
  } else {
    // cartFound may not have the new size clicked,
    // Existing cartFound item may have Sml but if adding Lge it will need quantity set to 1
    // We do need to check the quantity with the ternary operator
    // We also need to add in a "Optional Chaining" "?" I will explain further on Thursday

    const quantity = cartFound[size]?.quantity
      ? (cartFound[size].quantity += 1)
      : 1;

    cartFound[size] = {
      price: selectedSize.price,
      quantity: quantity,
      total: quantity * selectedSize.price,
    };
  }

  console.log(checkout);

  buildCart();
}
// -----End of addToCart function

// ----- Declare buildCart function:
function buildCart() {
  checkoutList.innerHTML = "";

  checkout.forEach((drink, size) => {
    const template = `
      <div class="checkout-item">
        <div><u>${drink.name}</u></div>
        <div>${
          drink.Sml
            ? "Sml " +
              format(drink.Sml.price) +
              " x " +
              drink.Sml.quantity +
              " <strong>" +
              format(drink.Sml.total) +
              "</strong>"
            : ""
        }</div>
        <div>${
          drink.Med
            ? "Med " +
              format(drink.Med.price) +
              " x " +
              drink.Med.quantity +
              " <strong>" +
              format(drink.Med.total) +
              "</strong>"
            : ""
        }</div>
        <div>${
          drink.Lge
            ? "Lge " +
              format(drink.Lge.price) +
              " x " +
              drink.Lge.quantity +
              " <strong>" +
              format(drink.Lge.total) +
              "</strong>"
            : ""
        }</div>
      </div>
    `;

    checkoutList.innerHTML += template;
  });
  runTotal();
}
// ----- End of function

// ----- Declare runTotal function for final tally:
function runTotal() {
  let total = 0;
  checkout.forEach((product) => {
    if (product.Sml) total += product.Sml.total;
    if (product.Med) total += product.Med.total;
    if (product.Lge) total += product.Lge.total;
  });
  checkoutTotal.innerText = format(total);
}

// Create function to add the dollar signs:
function format(value) {
  return `$${value.toFixed(2)}`;
}

// buttons.forEach( (btn, index, array) - the for each function, also:
// buttons.forEach( (element, index, array)

// ${drink[size].quantity}

/*
 const cartFound = checkout.find( x => x.id === id);
 
 is the same as!:
 
   const selectedItem = drinkMenu.find( (drink) => {
    return drink.id === id;
  } );
  
  */
