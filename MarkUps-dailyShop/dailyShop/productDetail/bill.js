let username = document.getElementById("username").innerText
function Bill() {
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content_Type':'application/json'
        },url: "http://localhost:8080/bill/save/"+username,
        success:function (data){
            alert("create bill ok")
        }
    })
}

function deleteBillStatus1(){
    $.ajax({
        type:"POST",
        headers:{
            'Accept': 'application/json',
            'Content_Type':'application/json'
        },
        url:"http://localhost:8080/bill/deleteBillStatus",
    })
}


function billDetail(x){
    alert("init")

    $.ajax({
        type:"POST",
        headers:{
            'Accept': 'application/json',
            'Content_Type':'application/json'
        },
        url:"http://localhost:8080/billDetail/save/"+ x+"&"+ username,
        success:function (data){
            alert("create detail ok")
            if (data==null){

            }
        },
        error : function (err){
            console.log(err)
        }
    })
}

function deleteAfterBill(id){
    $.ajax({
        type:"DELETE",
        headers:{
            'Accept': 'application/json'
        },
        url:"http://localhost:8080/cart/delete/"+id,
        success:function (){
            alert("delete")
        }
    })
}

function changeStatus(username){
    $.ajax({
        type:"POST",
        headers: {
            'Accept': 'application/json'
        },
        url:"http://localhost:8080/bill/changeStatus/"+username,
        success:function (){
            alert("change")
        }
    })
}




function createBill(){
    Bill()

    $.ajax({
        type:"GET",
        headers:{
            'Accept':'application/json',
            // 'Authorization':'Bearer ' + localStorage.getItem("token")
        },
        url:"http://localhost:8080/cart/listByAccount/"+username,
        success:function (data){
            for (const c of data){
                billDetail(c.id)
                deleteAfterBill(c.id)
            }
            changeStatus(username)
            deleteBillStatus1()
        }, error:function (err){
            console.log(err)
        }
    })
}