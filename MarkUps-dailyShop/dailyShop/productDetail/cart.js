
isAddCart = true;

function showCart() {
    let username = document.getElementById("username").innerText;
    $.ajax({
        type: "Get",
        headers: {
            'Accept':'application/json',
            // 'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/cart/listByAccount/"+ username,
        success : function (data){
            console.log(data)
            let str =""
            for (const cart of data){
                str+=`
                    <tr>
                        <td hidden="true"><a id="username">${cart.username}</a> </td>
                        <td><a class="remove" href="#"><fa class="fa fa-close">${cart.productDetail_id}</fa></a></td>
                        <td><a href="#"><img src="${cart.img}" alt="img"></a></td>
                        <td><a class="aa-cart-title" href="#">${cart.name}</a></td>
                        <td>${cart.price}</td>
                        <td><p class="aa-cart-quantity" >${cart.quantity}</td>
                        <td>${cart.size}</td>
                        <td><button class="btn btn-warning" onclick="deleteCartItem(${cart.id})">Delete</button></td>
                    </tr>
                `
            }
            document.getElementById("showCart").innerHTML = str
        },
        error: function (err){
            console.log(err)
        }
    })
}

showCart()

function addToCart(x){
alert("cart")
    let username =document.getElementById("username").innerText

    $.ajax({
        type:"POST",
        headers:{
            'Accept': 'application/json',
            'Content_Type':'application/json'
        },
        url:"http://localhost:8080/cart/"+x +"&" + username,
        success: function (data){
            alert(data)

        },
        error : function (err){
            console.log(err)
        }
    })
}

function deleteCartItem(x){
    alert("ok")
    $.ajax({
        type:"DELETE",
        headers: {
            'Accept': 'application/json'
        },
        url:"http://localhost:8080/cart/delete/"+x,
        success:function (data){
            console.log("ok")
            showCart()
            sum()
        }, error : function (err){
            console.log(err)
        }
    })
}

function sum(){
    let user = document.getElementById("username").innerText
    console.log("ok")
    $.ajax({
        type:"GET",
        headers:{
            'Accept': 'application/json'
        },
        url :"http://localhost:8080/cart/sum/"+user,
        success:function (sum){
            let str=""
            str+= `
                   <tr>
                     <th>Subtotal</th>
                     <td>$ ${sum}</td>
                   </tr>
            `
            document.getElementById("showTotalMoney").innerHTML=str
        },
        error : function (err){
            console.log(err)
        }
    })
}
sum()
