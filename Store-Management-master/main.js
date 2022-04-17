let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [];
let categories = JSON.parse(localStorage.getItem("categories"))
  ? JSON.parse(localStorage.getItem("categories"))
  : [];
let filteredProducts = products;
  updateCategorys(document.querySelector("#product-category"));
  updateCategorys(document.querySelector("#search-combo-box"));
  updateProducts(products,"products");
// add new product(s) functionality
document.querySelector("#create-product").addEventListener("click", () => {
  testFields();
});

// the functionality calculating the total amount of the product
document.querySelectorAll(".product-price-controllers input").forEach((ele) => {
  ele.addEventListener("change", () => {
    let result = document.querySelector(".result");
    let checkFields = Array.from(
      document.querySelectorAll(
        ".product-price-controllers input:not(:last-of-type)"
      )
    );
    let isEmpty = checkFields.some((ele) => ele.value === "");
    if (isEmpty) {
      result.textContent = "";
    } else {
      console.log(checkFields);

      let total = checkFields
        .map((ele) => Number(ele.value))
        .reduce(function (previousValue, currentValue) {
          return previousValue + currentValue;
        }, 0);
      result.textContent = total;
    }

    result.textContent =
      result.textContent - document.querySelector("#product-discount").value;
  });
});

// add new categorie functionality
let addCategory = document.getElementById("add-category");
addCategory.addEventListener("click", () => {
  let popupContainer = document.querySelector(".popup-container");
  popupContainer.style.display = "block";
  document.querySelector(".popup-container .close").addEventListener("click",() => {
    popupContainer.style.display = "none";
  });
  document.querySelector(".popup-container button").addEventListener("click",() => {
    let categoryName = document.querySelector(".popup-container #popup-category").value;
    if(categoryName){
      categories.push(categoryName);
     updateCategorys(document.querySelector("#product-category"));
  updateCategorys(document.querySelector("#search-combo-box"));
    }else{
      alert("type a category name");
    }
    
  });
});

// search input functionality 
const searchInput = document.querySelector("#search-field");
searchInput.addEventListener("keyup",function (){
  filterProducts();
});
// search selectbox functionality 
const searchSelectBox = document.querySelector("#search-combo-box");
searchSelectBox.addEventListener("change",() => {
  filterProducts();
})
// delete all functionality
const deleteAll = document.querySelector("#delete-product");
deleteAll.addEventListener("click",() => {
  products = [];
  updateProducts(products,"products");
})
// update of one product functionality
document.querySelectorAll(".update").forEach((e) => {
  e.addEventListener("click",() => {
    let productID = e.parentElement.parentElement.firstElementChild.textContent;
    console.log(productID);
    let hr = document.querySelector("hr");
    if(hr.previousElementSibling.id === "create-product"){
      document.querySelector("hr").previousElementSibling.remove();
      document.querySelector("#product-count").remove();
      let updateButton = document.createElement("button");
      updateButton.textContent = "update product";
      updateButton.id = "update-product";
      hr.before(updateButton);
      // confirming update of one product functionality
      updateButton.addEventListener("click",() => {

      })
    }
  })
})
function productTableRow(product) {
  let row = document.createElement("tr");
  Object.values(product).forEach(e => {
    row.innerHTML+=`<td>${e === "" ? "-" : e}</td>`; 
  })
  row.innerHTML+='<td><button class="update">Update</button></td> <td><button class="delete" >Delete</button></td>';
  return row;
}

function testFields() {
  let fields = [
    document.querySelector("#product-name"),
    document.querySelector("#product-category"),
    ...Array.from(
      document.querySelectorAll(
        ".product-price-controllers input:not(:last-of-type)"
      )
    ),
    document.querySelector("#product-count"),
  ];
  let isEmpty = fields.some((ele) => ele.value === "");
  let isNegative = fields.slice(2).some((ele) => ele.value <0 );
  if (isEmpty) {
    alert("fill those fields");
    fields.forEach((ele) => {
      ele.style.border = "none";
      if (ele.value === "") {
        ele.style.border = "1px solid red";
      }
    });
  } else if (isNegative) {
    alert("some value is negative");
    fields.forEach((ele) => {
      ele.style.border = "none";
      if (ele.value <0) {
        ele.style.border = "1px solid red";
      }
    });
  } else {
    let tbody = document.querySelector("tbody");
    let count = document.querySelector("#product-count").value;
    for (let i = 0; i < count; i++) {
      let product = {
        id: products.length,
        name: document.querySelector("#product-name").value,
        price: document.querySelector("#product-price").value,
        taxes: document.querySelector("#product-taxes").value,
        ads: document.querySelector("#product-adg").value,
        discount: document.querySelector("#product-discount").value,
        total: document.querySelector(".result").textContent,
        category: document.querySelector("#product-category").value,
      };
      tbody.append(productTableRow(product));
      products.push(product);
      document.querySelector("#search-field").value = "";
    }
    updateProducts(products,"products");
  }
}

function updateCategorys (selectBox){
  /* reseting the select box */ 
  const options = [...selectBox.children];
  options.forEach(e => {if(e.value !== "all") e.remove()});
  let categorysSet = new Set(categories);
  categories = Array.from(categorysSet);
  categories.forEach(e => {
    let option = document.createElement("option");
    option.value = e;
    option.textContent = e;
    selectBox.append(option);
  });
  window.localStorage.setItem("categories",JSON.stringify(categories));
}
function updateProducts(allProducts,allProductsName){
  let productsList = document.querySelector("table tbody");
  productsList.innerHTML = "";
  allProducts.forEach(e => {
    productsList.append(productTableRow(e));
  });
  if(allProductsName === "products") window.localStorage.setItem("products",JSON.stringify(products));
}
function filterProducts() {
    filteredProducts = filteredProducts.filter(e => {
        if(searchSelectBox.value === "all") return e.name.startsWith(searchInput.value);
        return e.name.startsWith(searchInput.value) && e.category === searchSelectBox.value;
      });
  updateProducts(filteredProducts,"filteredProducts");
  filteredProducts = products;
}
