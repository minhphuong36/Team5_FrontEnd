let imgInp = document.getElementById("imgProduct");
let blah = document.getElementById("blah");
let isCreate = true;

function showProducts() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/products",
        success: function (products) {
            let str = '';
            for (const p of products) {
                str += `<div class="col-sm-4">
                        <h2>${p.name}</h2>
                        <img src="${p.img}" width="300" height="200">
                         <p>Price:${p.price}$</p>
                        <button class="btn btn-warning" onclick="showEditProduct(${p.id})" data-toggle="modal" data-target="#modalCreateProduct">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
                        </div>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function clearEdit() {
    isCreate = true;
    document.getElementById("idProduct").value = 0;
    $("#nameProduct").val("");
    $("#priceProduct").val("");
    $("#imgProduct").val("");
}

function showImg() {
    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
}

function upImg() {
    let fileImg = document.getElementById("imgProduct").files;
    var formData = new FormData();
    formData.append("fileImg", fileImg[0]);

    $.ajax({
        contentType: false,
        processData: false,
        headers: {},
        type: "POST",
        data: formData,
        url: "http://localhost:8080/admin/upImg",
        success: function (img) {
            create(img)
        }
    });
}

function create(img) {
    let product = {
        "name": $("#nameProduct").val(),
        "price": $("#priceProduct").val(),
        "img": img,
    }

    if (!isCreate) {
        product.id = $("#idProduct").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/admin/addProducts",
        data: JSON.stringify(product),
        success: function (product) {
            let showProductsEdit;
            showProductsEdit= `<div class="col-sm-4">
                        <h1 style="color: #0aa60f">Done!</h1>
                        <h2>${product.name}</h2>
                        <img src="${product.img}" width="300" height="200">
                         <p>Price:${product.price}$</p>
                        <button class="btn btn-warning" onclick="showEditProduct(${product.id})" data-toggle="modal" data-target="#modalCreateProduct">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                        </div>`
            document.getElementById("show").innerHTML=showProductsEdit
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function selectProduct() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/products",
        success: function (products) {
            let productName = '';
            for (const p of products) {
                productName += `<option value="${p.id}">${p.name}</option>`
            }

            document.getElementById("productDetailName").innerHTML = productName;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEditProduct(id) {
    isCreate = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/product/" + id,
        success: function (product) {
            document.getElementById("idProduct").value = product.id;
            $("#nameProduct").val(product.name);
            $("#priceProduct").val(product.price);
            $("#imgProduct").val(product.img);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function deleteProduct(id) {
    $.ajax({
        type: "delete",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/product/" + id,
        success: function (product) {
        },
        error: function (err) {
            console.log(err)
        }
    })
}