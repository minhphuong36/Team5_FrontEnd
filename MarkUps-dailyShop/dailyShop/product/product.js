let isCreate=true;
let divShow = document.getElementById("show")

function showProduct(){
    $.ajax({
        type:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Bearer' + localStorage.setItem("token")
        },
        url:"http://localhost:8080/product",
        success: function (data) {
            console.log(data)
            let str=""
            for (const product of data){
                str+= `
                <div class="card" style="width:400px">
                  <img class="card-img-top" src="${product.img}" alt="Card image" style="width:100%">
                  <div class="card-body">
                     <h4 class="card-title">${product.name}</h4>
                     <p class="card-text">${product.price}</p>
                     <p class="card-text" hidden>${product.id}</p>
                     <a href="#" class="btn btn-primary">See Product</a>
                  </div>
                </div> `
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
            show()
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

