let isCreate=true;
let divShow = document.getElementById("showProduct")

function showProduct(){
    $.ajax({
        type:"GET",
        headers:{
            'Accept':'application/json'
            // 'Authorization': 'Bearer' + localStorage.setItem("token")
        },
        url:"http://localhost:8080/product",
        success: function (data) {
            console.log(data)
            let str=""
            for (const product of data){
                str+= `
                <li>
                  <figure>
                    <a class="aa-product-img" href="./product-detail.html?id=${product.id}"><img src="${product.img}" alt="loading"></a>
                    <a class="aa-add-card-btn"href="#"><span class="fa fa-shopping-cart"></span>Add To Cart</a>
                    <figcaption>
                      <h4 class="aa-product-title"><a href="#">${product.name}</a></h4>
                      <span class="aa-product-price">$ ${product.price}</span>
                    </figcaption>
                  </figure>
                  <div class="aa-product-hvr-content">
                    <a href="#" data-toggle="tooltip" data-placement="top" title="Add to Wishlist"><span class="fa fa-heart-o"></span></a>
                    <a href="#" data-toggle="tooltip" data-placement="top" title="Compare"><span class="fa fa-exchange"></span></a>
                    <a href="#" data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>
                  </div>
                </li>
                      `
            }
            divShow.innerHTML =str;
        },
        error: function (err){
            console.log(err)
        }
    })
}

showProduct()


function clearEdit() {
    isCreate =true
    document.getElementById("id").value=0;
    $("#name").val("");
    $("#price").val();
    $("#img").val();
}

function upImg() {
    let fileImg = document.getElementById("img").files;
    let formData = new FormData();
    formData.append("fileImg",fileImg[0]);

    $.ajax({
        contentType: false,
        processData: false,
        headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("token")
        },
        type:"Post",
        data: formData,
        success: function (img){
            create(img)
        }
    })
}

upImg()

function create(img){
    let product = {
        "id": document.getElementById("id").value,
        "name": $("#nameProduct").val(),
        "img": img
    }

    if (!isCreate){
        product.id = $("#id").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        url: "http://localhost:8080/product",
        data:JSON.stringify(product),
        success:function (data){
            alert("success")
            showProduct()
        },
        error:function (err){
            console.log(err)
        }
    })
}

function showEditProduct(id) {
    isCreate=false;
    $.ajax({
        type:"Get",
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer ' + localStorage.setItem("token")
        },
        url:"http://localhost:8080/product/"+id,
        success:function (data){
            document.getElementById("id").value=data.id;
        }
    })
}

