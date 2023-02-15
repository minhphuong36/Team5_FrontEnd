

function addToCart(x){
    event.preventDefault();
    let username = document.getElementById("username").value

    let cart = {
        username : username,


    }
    $.ajax({
        type:"GET",
        headers:{
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url:"http://localhost:8080/productDetail/findById/"+x,
        success: function (data){

        }
    })
}