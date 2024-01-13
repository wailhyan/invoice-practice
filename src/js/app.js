// Selectors

const app = document.querySelector("#app");
const productAddForm = app.querySelector("#productAddForm");
const productSelect = app.querySelector("#productSelect");
const quantityInput = app.querySelector("#quantityInput");
const recordGroup = app.querySelector("#recordGroup");
const recordTotal = app.querySelector(".record-total");
const printBtn = app.querySelector("#printBtn");
const drawerBtn = app.querySelector("#drawerBtn");
const productDrawer = app.querySelector("#productDrawer");
const closeDrawer = app.querySelector("#closeDrawer");
const productTemplate = app.querySelector("#productTemplate");
const productGroup = app.querySelector("#productGroup");
const addProductForm = app.querySelector("#addProductForm");

// Data

const Products = [
  {
    id: 1,
    name: "Apple",
    price: "500",
  },
  {
    id: 2,
    name: "Orange",
    price: "400",
  },
  {
    id: 3,
    name: "Mango",
    price: "800",
  },
  {
    id: 4,
    name: "Banana",
    price: "200",
  },
  {
    id: 5,
    name: "lime",
    price: "100",
  },
];

// Functions

const productUi = ({ name, price }) => {
  const drawerProduct = productTemplate.content.cloneNode(true);
  productName = drawerProduct.querySelector(".product-name");
  productPrice = drawerProduct.querySelector(".product-price");
  productName.innerText = name;
  productPrice.innerText = price;
  return drawerProduct;
};

const calculateRecordTotal = () => {
  const records = [...document.querySelectorAll(".record-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  recordTotal.innerText = records;
};

const productRender = (items) => {
  items.forEach((item) => {
    const option = new Option(item.name, item.id);
    productSelect.append(option);
    productGroup.append(productUi(item));
  });
};

const recordUi = (productId, productName, productPrice, quantity) => {
  const cost = productPrice * quantity;
  const record = document.createElement("tr");
  record.setAttribute("productId", `${productId}`);
  record.className =
    "  group odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ";
  record.innerHTML = `
         <td class="px-6 py-4 section"></td>
         <th
         scope="row"
         class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          ${productName}
         </th>
         <td class="px-6 py-4 text-end">
           <span class="record-price">${productPrice}</span>
         </td>
         <td class=" group px-6 py-4 text-end">
           <button class="q-less bg-green-100 rounded -translate-x-5 opacity-0 pointer-events-none duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-x-0">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
             viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
             class="w-4 h-4 pointer-events-none">
             <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
             </svg>         
           </button>
           <span class=" w-2 record-quantity">${quantity}</span>
           <button class="q-add bg-green-100 rounded translate-x-5 opacity-0 pointer-events-none duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-x-0">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
             viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
             class="w-4 h-4 pointer-events-none">
             <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
             </svg>         
           </button>
         </td>
         <td class="px-6 py-4 text-end relative">
          <span class="record-cost">${cost}</span>
          <button class="record-del absolute bg-green-100 duration-200 rounded right-0 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="w-4 h-4 pointer-events-none">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        
          </button>
         </td>
    `;
  return record;
};

// Renders

productRender(Products);

// Handlers

const productAddFormHandler = (event) => {
  event.preventDefault();
  const addProduct = Products.find(
    (product) => product.id == productSelect.value
  );

  const isExited = document.querySelector(`[productId = "${addProduct.id}"]`);

  if (isExited) {
    const exitedProductQ = isExited.querySelector(".record-quantity");
    const exitedProductPrice = isExited.querySelector(".record-price");
    const exitedProductCost = isExited.querySelector(".record-cost");
    exitedProductQ.innerText =
      parseInt(exitedProductQ.innerText) + quantityInput.valueAsNumber;
    exitedProductCost.innerText =
      exitedProductPrice.innerText * exitedProductQ.innerText;
    calculateRecordTotal();
  } else {
    recordGroup.append(
      recordUi(
        addProduct.id,
        addProduct.name,
        addProduct.price,
        quantityInput.valueAsNumber
      )
    );
    calculateRecordTotal();
    productAddForm.reset();
  }
};

const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-del")) {
    if (confirm("Are U sure to delete ?")) {
      event.target.closest("tr").remove();
      calculateRecordTotal();
    }
  } else if (event.target.classList.contains("q-add")) {
    const currentRow = event.target.closest("tr");
    const currentRowQ = currentRow.querySelector(".record-quantity");
    const currentRowPrice = currentRow.querySelector(".record-price");
    const currentRowCost = currentRow.querySelector(".record-cost");
    currentRowQ.innerText = parseInt(currentRowQ.innerText) + 1;
    currentRowCost.innerText =
      currentRowPrice.innerText * currentRowQ.innerText;
    calculateRecordTotal();
  } else if (event.target.classList.contains("q-less")) {
    const currentRow = event.target.closest("tr");
    const currentRowQ = currentRow.querySelector(".record-quantity");
    const currentRowPrice = currentRow.querySelector(".record-price");
    const currentRowCost = currentRow.querySelector(".record-cost");
    if (currentRowQ.innerText > 1) {
      currentRowQ.innerText = parseInt(currentRowQ.innerText) - 1;
      currentRowCost.innerText =
        currentRowPrice.innerText * currentRowQ.innerText;
      calculateRecordTotal();
    }
  }
};

const printBtnHandler = () => {
  print();
};

const drawerBtnHandler = () => {
  productDrawer.classList.toggle("translate-x-full");
};

const addProductFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(addProductForm);
  const newProduct = {
    id: Date.now(),
    name: formData.get("new_product_name"),
    price: formData.get("new_price"),
  };
  productGroup.append(productUi(newProduct));
  productSelect.append(new Option(newProduct.name, newProduct.id));
  Products.push(newProduct);
  addProductForm.reset()
};

// Listeners

productAddForm.addEventListener("submit", productAddFormHandler);
recordGroup.addEventListener("click", recordGroupHandler);
printBtn.addEventListener("click", printBtnHandler);
drawerBtn.addEventListener("click", drawerBtnHandler);
closeDrawer.addEventListener("click", drawerBtnHandler);
addProductForm.addEventListener("submit", addProductFormHandler);
