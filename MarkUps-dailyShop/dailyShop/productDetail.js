let isCreateProductDetail = true;

function showProductsDetail() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/productsDetail",
        success: function (productsDetail) {
            let str = '';
            for (const p of productsDetail) {
                let quantity = p.quantity;
                str += `<div class="col-sm-4">
                        <h2>${p.product.name} Size ${p.size.name}</h2>
                        <img src="${p.product.img}" width="300" height="200">
                         <p>Price:${p.product.price}$</p>
                         <p>Quantity:${p.quantity}</p>`
                if (quantity < 0 && quantity < 10) {
                    str += "Status: Warning"
                } else if (quantity == 0) {
                    str += "Status: Out of stock"
                } else {
                    str += "Status: In stock"
                }
                str += `<br><button class="btn btn-warning" onclick="showEditProductDetail(${p.id})" data-toggle="modal" data-target="#modalCreateProductDetail">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProductDetail(${p.id})">Delete</button>
                        </div>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function clearEditProductDetail() {
    isCreateProductDetail = true;
    document.getElementById("idProductDetail").value = 0;
    $("#productDetailName").val("");
    $("#sizeDetailName").val("");
    $("#quantity").val(0)
}

function createProductDetail() {
    let productDetail = {
        "product": {"id": document.getElementById("productDetailName").value},
        "size": {"id": document.getElementById("sizeDetailName").value},
        "quantity":document.getElementById("quantity").value
    }
    if (!isCreateProductDetail) {
        productDetail.id = $("#idProductDetail").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/admin/addProductDetail",
        data: JSON.stringify(productDetail),
        success: function (producDetail) {
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEditProductDetail(id){
    isCreateProductDetail = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/productDetail/" + id,
        success: function (productDetail) {
            document.getElementById("idProductDetail").value = productDetail.id;
            $("#productDetailName").val(productDetail.product.id);
            $("#sizeDetailName").val(productDetail.size.id);
            $("#quantity").val(productDetail.quantity)
        }
        ,
        error: function (err) {
            console.log(err)
        }
    })

}
function deleteProductDetail(id) {
    $.ajax({
        type: "delete",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/productDetail/" + id,
        success: function (productDetail) {
        },
        error: function (err) {
            console.log(err)
        }
    })
}
