function addProduct(name, imgLink, description, price, madeForKids) {
    const product = {
        name,
        imgLink,
        description,
        price,
        madeForKids,
        publicationTimestamp: Date.now(),
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function clearProducts() {
    localStorage.setItem("products", JSON.stringify([]));
}

function showProductsInItemsDiv() {
    let itemsContainer = document.getElementById("items");

    let products = getProducts().reverse();
    products.forEach((product, index) => {
        if (!product) {
            return;
        }

        let productCard = document.createElement("div");
        productCard.className = "card mb-auto";

        let sold = "";
        if (Date.now() - product["publicationTimestamp"] >= 60000) {
            sold = '<span class="text-success"> Sold</span>';
        }

        productCard.innerHTML = `
            <img
                src="${product["imgLink"]}"
                class="card-img-top"
                alt="Cover Image"
            />
            <div class="card-body">
                <h5 class="card-title">${product["name"]}</h5>
                <p class="card-text">${product["description"]}</p>
                <h3>${product["price"]}$${sold}</h3>
                <button class="btn btn-success remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        itemsContainer.appendChild(productCard);
    });
}

// sell.html

if (window.location.pathname.endsWith("sell.html")) {
    const productForm = document.getElementById("productForm");

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(productForm);

        addProduct(
            formData.get("productName"),
            formData.get("imgLink"),
            formData.get("description"),
            formData.get("price"),
            formData.get("madeForKids") === "on"
        );

        productForm.reset();

        window.location.href = "dashboard.html";
    });
}

// dashboard.html

if (window.location.pathname.endsWith("dashboard.html")) {
    showProductsInItemsDiv();

    document.querySelectorAll(".remove-btn").forEach((removeBtn) => {
        removeBtn.addEventListener("click", () => {
            removeBtn.parentElement.parentElement.remove();
        });
    });
}

// test.html

if (window.location.pathname.endsWith("test.html")) {
    document
        .getElementById("logProductList")
        .addEventListener("click", function (event) {
            console.log(getProducts());
        });

    document
        .getElementById("clearProductList")
        .addEventListener("click", function (event) {
            clearProducts();
        });
}
