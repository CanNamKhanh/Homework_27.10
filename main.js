const body = document.querySelector("body");

body.addEventListener("submit", (e) => {
  e.preventDefault();
});

const productBtnEl = document.querySelectorAll(".js-products-list button");

const addZone = document.querySelector(".js-added-cart");
const addZoneList = document.querySelector(".js-added-cart table");
const totalRow = document.querySelector(".js-added-cart table .totalRow");

addZone.classList.add("w-[100%]", "hidden");

const cartDes = document.querySelector(".js-cart-des");

let productNum = 1;

productBtnEl.forEach((btn) => {
  btn.classList.add(
    "px-3",
    "py-1",
    "border",
    "border-gray-400",
    "rounded",
    "hover:bg-gray-100"
  );
  const input = btn.parentElement.children[0];

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value < 0) {
      input.value = 1;
    }
    // console.log(
    //   input.parentElement.parentElement.parentElement.children[0].innerText
    // );

    addZone.classList.add("active");
    addZone.classList.remove("nonactive");

    cartDes.classList.add("nonactive");
    cartDes.classList.remove("active");

    const createProductLine = function () {
      const tr = document.createElement("tr");
      tr.innerHTML = `
    <td class="border-[2px] border-black">${productNum}</td>
    <td class="border-[2px] border-black">${
      input.parentElement.parentElement.parentElement.children[1].innerText
    }</td>
    <td class="border-[2px] border-black">${
      input.parentElement.parentElement.parentElement.children[2].innerText
    }</td>
    <td class="border-[2px] border-black">
        <input type="number" value="${
          input.value
        }" class="js-new-product-quantity w-[100%]"/>
    </td>
    <td class="border-[2px] border-black">${
      input.value *
      input.parentElement.parentElement.parentElement.children[2].innerText
    }
    </td>
    <td class="border-[2px] border-black">
        <button class="js-delete-btn px-3 py-1 border border-gray-400 rounded hover:bg-gray-100">Xóa</button>
    </td>
    `;
      tr.classList.add("added-product");
      return tr;
    };

    const newProduct = createProductLine();
    const totalRowParent = totalRow.parentElement;
    // console.log(parent);

    const newName = newProduct.children[1].innerText;

    let existedRow = Array.from(totalRowParent.querySelectorAll("tr")).find(
      (row) => {
        return row.children[1] && row.children[1].innerText === newName;
      }
    );

    if (existedRow) {
      const quantityCell = existedRow.children[3];
      const priceCell = existedRow.children[2];
      const totalCell = existedRow.children[4];

      const oldQuantity = Number(quantityCell.querySelector("input").value);
      const addQuantity = Number(
        newProduct.children[3].querySelector("input").value
      );
      const price = Number(priceCell.innerText);

      const newQuantity = oldQuantity + addQuantity;

      quantityCell.querySelector("input").value = newQuantity;
      totalCell.innerText = newQuantity * price;
      //   console.log(newQuantity);
    } else {
      totalRowParent.insertBefore(newProduct, totalRow);
      productNum += 1;
    }

    totalRow.children[1].innerText =
      +totalRow.children[1].innerText + +input.value;

    totalRow.children[2].innerText =
      +totalRow.children[2].innerText +
      +input.parentElement.parentElement.parentElement.children[2].innerText;

    const deleteProductBtn = newProduct.querySelector(".js-delete-btn");
    deleteProductBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const ok = confirm("Are you sure?");
      if (ok) {
        alert("Xóa sản phẩm thành công");

        const quantityInputRow = newProduct.querySelector(
          ".js-new-product-quantity"
        );
        const currentQuantity = Number(quantityInputRow?.value) || 0;

        const currentUnitPrice = Number(newProduct.children[2].innerText) || 0;

        totalRow.children[1].innerText =
          (+totalRow.children[1].innerText || 0) - currentQuantity;

        totalRow.children[2].innerText =
          (+totalRow.children[2].innerText || 0) -
          currentQuantity * currentUnitPrice;

        newProduct.remove();

        productNum -= 1;
        const rows = Array.from(
          totalRowParent.querySelectorAll("tr.added-product")
        );
        rows.forEach((row, idx) => {
          const productNumCell = row.children[0];
          if (productNumCell) productNumCell.innerText = idx + 1;
        });
      }
      //   console.log(totalRow.children[2].innerText);
      if (totalRow.children[1].innerText == 0) {
        addZone.classList.remove("active");
        addZone.classList.add("nonactive");
        // console.log("hello");
        cartDes.classList.remove("nonactive");
        cartDes.classList.add("active");
      }
    });
  });
});

const addZoneBtnEl = document.querySelectorAll(".js-added-cart button");
addZoneBtnEl.forEach((btn) => {
  btn.classList.add(
    "px-3",
    "py-1",
    "border",
    "border-gray-400",
    "rounded",
    "hover:bg-gray-100"
  );
});

const thEl = document.querySelectorAll("th");
thEl.forEach((th) => {
  th.classList.add("border-[2px]", "border-black", "p-2");
});

const tdEl = document.querySelectorAll("td");
tdEl.forEach((td) => {
  td.classList.add("border-[2px]", "border-black");
});

const inputEl = document.querySelectorAll("input");
inputEl.forEach((input) => {
  input.classList.add("w-[100%]", "border");
});

const submitCartBtnEl = document.querySelector(".js-submit-cart");

submitCartBtnEl.addEventListener("click", (e) => {
  e.stopPropagation();

  // Reset tổng trước khi tính lại
  totalRow.children[1].innerText = 0;
  totalRow.children[2].innerText = 0;

  // Lấy tất cả hàng sản phẩm trong giỏ
  const rows = document.querySelectorAll(".added-product");

  rows.forEach((row) => {
    const quantityInput = row.querySelector(".js-new-product-quantity");
    const quantity = Number(quantityInput.value);
    const price = Number(row.children[2].innerText);

    // Cập nhật lại tổng từng dòng
    row.children[4].innerText = quantity * price;

    // Cộng dồn vào tổng giỏ
    totalRow.children[1].innerText =
      Number(totalRow.children[1].innerText) + quantity;

    totalRow.children[2].innerText =
      Number(totalRow.children[2].innerText) + quantity * price;
  });

  alert("Cập nhật giỏ hàng thành công");
});

const deleteCartBtnEl = document.querySelector(".js-delete-cart");
deleteCartBtnEl.addEventListener("click", (e) => {
  e.stopPropagation();
  const deleteAll = confirm("Are you sure?");
  if (deleteAll) {
    addZone.classList.remove("active");
    addZone.classList.add("nonactive");
    cartDes.classList.remove("nonactive");
    cartDes.classList.add("active");

    alert("Xóa giỏ hàng thành công");
  }
});
