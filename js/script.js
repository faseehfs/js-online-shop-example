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
