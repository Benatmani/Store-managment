let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [];
let categories = JSON.parse(localStorage.getItem("categories"))
  ? JSON.parse(localStorage.getItem("categories"))
  : [];

document.querySelector("#create-product").addEventListener("click", () => {
  let count = document.querySelector("#product-count").value;
  let product = {
    id: products.length,
    name: document.querySelector("#product-name").value,
    price: document.querySelector("#product-price").value,
    taxes: document.querySelector("#product-taxes").value,
    ads: document.querySelector("#product-adg").value,
    discount: document.querySelector("#product-discount").value,
    total: document.querySelector(".result").innerHTML,
    category: document.querySelector("#product-category").value,
  };
  testFields(product);
  // let tbody = document.querySelector("tbody");

  // for (let i = 0; i < count; i++) {
  //   product.id = products.length;
  //   tbody.append(
  //     productTableRow(
  //       product.id,
  //       product.name,
  //       product.price,
  //       product.taxes,
  //       product.ads,
  //       product.discount,
  //       product.total,
  //       product.category
  //     )
  //   );
  //   products.push(product);
  // }
});
function productTableRow(
  id,
  name,
  price,
  taxes,
  ads,
  discount,
  total,
  category
) {
  let row = document.createElement("tr");
  row.innerHTML = `<td>${id}</td>
              <td>${name}</td>
              <td>${price}</td>
              <td>${taxes}</td>
              <td>${ads}</td>
              <td>${discount}</td>
              <td>${total}</td>
              <td>${category}</td>
              <td><button class="update">Update</button></td>
              <td><button class="delete" >Delete</button></td>`;
  return row;
}

function testFields(product) {
  let fields = [
    document.querySelector("#product-name"),
    ...Array.from(
      document.querySelectorAll(
        ".product-price-controllers input:not(:last-of-type)"
      )
    ),
    document.querySelector("#product-count"),
  ];
  let isEmpty = fields.some((ele) => ele.value === "");
  let isNegative = fields.slice(1).some((ele) => ele.value <0 );
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
      product.id = products.length;
      tbody.append(
        productTableRow(
          product.id,
          product.name,
          product.price,
          product.taxes,
          product.ads,
          product.discount,
          product.total,
          product.category
        )
      );
      products.push(product);
    }
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
  document.querySelector(".popup-container").style.display = "block";
})