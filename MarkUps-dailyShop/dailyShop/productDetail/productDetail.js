let isCreate = true;
let divShow=document.getElementById("show")

function showProductDetail(){
    $.ajax({
        type: "GET",
     headers:{
            'Accept':'application/json',
         'Authorization': 'Bearer' + localStorage.setItem("token")
     },
    url:"http://localhost:8080/productDetail",
        success: function (data){
            console.log(data)
            let str=""
            for (const productDetail of data) {
                str+=``
            }


            divShow.innerHTML = str;
        },
        error: function (erro){
            console.log(erro)
        }
    }
    )
}
showProductDetail();


function clearEdit(){
    isCreate= true
    document.getElementById("id").value=0;
    $("#name").val("");
    $("#price").val("");
    $("#img").val("");
}


function  create(img){
    let productDetail = {
        "id": document.getElementById("id").value,
        "name" : $("#nameProductDetail")
    }
}