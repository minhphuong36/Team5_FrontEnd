let isCreate = true;

function ListSize(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer' + localStorage.setItem("token")
        },
        url: "http://localhost:8080/size",
        success: function (data) {
            console.log(data)
            let str = ""
            for (const size of data) {
                str += `<option value={size.id}>${size.name}</option>`

            }
            document.getElementById("showSize").innerHTML = str;
        }
    })
}showProductDetail();

function createSize(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer' + localStorage.setItem("token")
        },
        url: "http://localhost:8080/size",
        success: function (data) {
            console.log(data)
            let str = ""
            for (const size of data) {
                str +=`<option value={size.id}>${size.name}</option>`
            }

            document.getElementById("").innerHTML= str;
        }

    })
}

function editSize() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer' + localStorage.setItem("token")
        },
        url: "http://localhost:8080/size",
        success: function (data) {
            console.log(data)
            let str = ""
            for (const  size of  data) {
                str += `<option value={size.id}>${size.name}</option>`
            }

            document.getElementById("editSize").innerHTML= str;
        }
    })
}
