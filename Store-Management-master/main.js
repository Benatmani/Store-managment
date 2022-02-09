let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [];
let categories = JSON.parse(localStorage.getItem("categories"))
  ? JSON.parse(localStorage.getItem("categories"))
  : [];
  updateCategorys();
  updateProducts();
document.querySelector("#create-product").addEventListener("click", () => {
  testFields();
});
function productTableRow(product) {
  let row = document.createElement("tr");
  Object.values(product).forEach(e => {
    row.innerHTML+=`<td>${e}</td>`;
  })
  row.innerHTML+='<td><button class="update">Update</button></td> <td><button class="delete" >Delete</button></td>'
  /*row.innerHTML = `<td>${id}</td>
              <td>${name}</td>
              <td>${price}</td>
              <td>${taxes}</td>
              <td>${ads}</td>
              <td>${discount}</td>
              <td>${total}</td>
              <td>${category}</td>
              <td><button class="update">Update</button></td>
              <td><button class="delete" >Delete</button></td>`;*/
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
    }
    updateProducts();
  }
}

document.querySelectorAll(".product-price-controllers input").forEach((ele) => {
  ele.addEventListener("change", (e) => {
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
      updateCategorys();
    }else{
      alert("type a category name");
    }
    
  });
});
function updateCategorys (){
  let categorySelectBox = document.querySelector("#product-category");
  categorySelectBox.innerHTML = "";
  let categorysSet = new Set(categories);
  categories = Array.from(categorysSet);
  categories.forEach(e => {
    let option = document.createElement("option");
    option.value = e;
    option.textContent = e;
    categorySelectBox.append(option);
  });
  window.localStorage.setItem("categories",JSON.stringify(categories));
}
function updateProducts(){
  let productsList = document.querySelector("table tbody");
  productsList.innerHTML = "";
  products.forEach(e => {
    productsList.append(productTableRow(e));
  });
  console.log(products);
  window.localStorage.setItem("products",JSON.stringify(products));
}
