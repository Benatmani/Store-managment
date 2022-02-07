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
    total: document.querySelector(".result").value,
    category: document.querySelector("#product-category").value,
  };
  testFields();
  let tbody = document.querySelector("tbody");
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

function testFields() {
  let fields = [
    document.querySelector("#product-name"),
    ...Array.from(
      document.querySelectorAll(
        ".product-price-controllers input:not(:last-of-type)"
      )
    ),
    document.querySelector("#product-count"),
  ];
  fields.forEach((ele) => {
    ele.style.border = "none";
    if (ele.value === "") {
      ele.style.border = "1px solid red";
    }
  });
  alert("fill those fields");
}
