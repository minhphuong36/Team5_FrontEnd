isCreateSize= true;
let divShowSize =document.getElementById("listSize")

function listSize(){
    $.ajax({
        type:"GET",
        headers:{
          'Accept':'application/json',
            'Authorization':'Bearer '+ localStorage.getItem("token")
        },
        url:"http://localhost:8080/size",
        success:function (data){
            console.log(data)
            let str = ""
            for (const size of data){
                str+=`
                <option value="${size.id}">${size.name}</option>
                `
            }
            divShowSize.innerHTML=str
        }
    })
}

listSize()

function create(){
    let size = {
        "id": document.getElementById("id").value,
        "name":$("#nameSize").val()
    }
    if (!isCreateSize){
        size.id = $("#id").val();
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept':'application/json',
            'Authorization':'Bearer '+ localStorage.getItem("token")
        },
        url: "http://localhost:8080/size",
        success: function (data){
            alert("success")
        },
        error:function (err){
            console.log(err)
        }
    })
}



