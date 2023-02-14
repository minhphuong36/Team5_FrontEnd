const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

function getSize(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept':'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/productDetail/size/"+id,
        success:function (data){
            console.log("ok")
            let str=""
            for (const s of data){
                str +=`
                <option value="${s.id}">${s.name}</option>`
            }
            document.getElementById("listSize").innerHTML=str;
        },
        error:function (err){
            console.log(err)
        }
    })
}


function showProductDetail(){
    $.ajax({
        type:"GET",
        headers :{
            'Accept':'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url:"http://localhost:8080/productDetail/SingleProduct/"+id,
        success: function (data){
            console.log(data)
            let str=""
            for (const pd of data){
                str+=`
                                <div class="col-md-5 col-sm-5 col-xs-12">                              
                  <div class="aa-product-view-slider">                                
                    <div  class="simpleLens-gallery-container">
                      <div class="simpleLens-container">
                        <div class="simpleLens-big-image-container"><a data-lens-image="img/view-slider/large/polo-shirt-1.png" class="simpleLens-lens-image"><img src="img/view-slider/medium/polo-shirt-1.png" class="simpleLens-big-image"></a></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal view content -->
                <div class="col-md-7 col-sm-7 col-xs-12">
                  <div class="aa-product-view-content">
                    <h3>T-Shirt</h3>
                    <div class="aa-price-block">
                      <span class="aa-product-view-price">$34.99</span>
                      <p class="aa-product-avilability">Avilability: <span>In stock</span></p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis animi, veritatis quae repudiandae quod nulla porro quidem, itaque quis quaerat!</p>
                    <h4>Size</h4>
                    <div class="aa-prod-view-size" id="listSize">
                    </div>
                  
                    <div class="aa-prod-quantity">
                      <form action="">
                        <select  name="">
                          <option selected="1" value="0">1</option>
                          <option value="1">2</option>
                          <option value="2">3</option>
                          <option value="3">4</option>
                          <option value="4">5</option>
                          <option value="5">6</option>
                        </select>
                      </form>
                      <p class="aa-prod-category">
                        Category: <a href="#">Polo T-Shirt</a>
                      </p>
                    </div>
                    <div class="aa-prod-view-bottom">
                      <a class="aa-add-to-cart-btn" href="#">Add To Cart</a>
                      <a class="aa-add-to-cart-btn" href="#">Wishlist</a>
                      <a class="aa-add-to-cart-btn" href="#">Compare</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                `
            }
        }
    })
}

showProductDetail()
getSize()