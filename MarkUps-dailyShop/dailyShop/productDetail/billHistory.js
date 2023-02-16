
let username = document.getElementById("username").innerText
function showBill(){
    console.log(username)
    $.ajax({
        type:"GET",
        headers:{
            'Accept':'application/json',
            // 'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        url:"http://localhost:8080/bill/showDoneBill/"+username,
        success: function (data){
            let str=""
            for (const bill of data){
                // sumBill(bill.id)
                str +=`
            <tr>
              <td>${bill.account.username}</td>
              <td>${bill.date}</td>
              <td ><a href="#" onclick="viewBillDetail(${bill.id})">${bill.id}</a></td>
              <td id="${bill.id}"></td>
            </tr>
            `
            }

            document.getElementById("showBill").innerHTML = str
        }, error:function (err){
            console.log(err)
        }
    })
}

function sumBill(x){
    $.ajax({
        type:"GET",
        headers:{
            'Accept':'application/json',
            // 'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        url:"http://localhost:8080/billDetail/price/"+x,
        success:function (data){
            let str=""
            str+=`
            <th>$ ${data}</th>
            `
            document.getElementById("billDetailPrice").innerHTML = str
        }
    })
}

showBill()

function viewBillDetail(x){
    $.ajax({
        type: "GET",
        headers: {
            'Accept':'application/json',
            // 'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/billDetail/showByBill/"+x,
        success: function (data){
            let str=""

            for (const billDetail of data){
                str+=`
                    <tr>
                        <th>${billDetail.id}</th>
                        <th>${billDetail.productDetail.product.name}</th>
                        <th>${billDetail.productDetail.quantity}</th>
                        <th>$ ${billDetail.productDetail.product.price}</th>
                    </tr>
                `

            }
            sumBill(x)

            document.getElementById("showBillDetail").innerHTML=str
        },
        error :function (err){
            console.log(err)
        }
    })
}