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
        }
    })
}