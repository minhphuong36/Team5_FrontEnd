
let isCreateSize = true;
function showSizes() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/sizes",
        success: function (sizes) {
            let str = '';
            for (const p of sizes) {
                str += `<div class="col-sm-4">
                        <h2>${p.name}</h2>
                        <button class="btn btn-warning" onclick="showEditSize(${p.id})" data-toggle="modal" data-target="#modalCreateSize">Edit</button>
                        <button class="btn btn-danger" onclick="deleteSize(${p.id})">Delete</button>
                        </div>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}
function clearEditSize() {
    isCreateSize = true;
    document.getElementById("idSize").value = 0;
    $("#nameSize").val("");
}


function createSize() {
    let size = {
        "name": $("#nameSize").val()
    }

    if (!isCreateSize) {
        size.id = $("#idSize").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/admin/addSizes",
        data: JSON.stringify(size),
        success: function (size) {

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function selectSize() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/sizes",
        success: function (sizes) {
            let sizeName = '';
            for (const p of sizes) {
                sizeName += `<option value="${p.id}">Size ${p.name}</option>`
            }

            document.getElementById("sizeDetailName").innerHTML = sizeName;

        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showEditSize(id){
    isCreateSize = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/size/" + id,
        success: function (size) {
            document.getElementById("idSize").value = size.id;
            $("#nameSize").val(size.name);
        },
        error: function (err) {
            console.log(err)
        }
    })

}
function deleteSize(id) {
    $.ajax({
        type: "delete",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/admin/size/" + id,
        success: function (size) {
            showSizes()
        },
        error: function (err) {
            console.log(err)
        }
    })
}
