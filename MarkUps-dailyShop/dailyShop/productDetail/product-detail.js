const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");



function showProductDetail(){
    $.ajax({
        type:"GET",
        headers :{
            'Accept': 'application/json'
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url:"http://localhost:8080/productDetail/SingleProduct/"+id,

        success: function (data){
            console.log(data)
            console.log("ok")

            let str=""
            for (const p of data){
                str +=`
            <div class="col-md-5 col-sm-5 col-xs-12">                              
                <div class="aa-product-view-slider">                                
                    <div  class="simpleLens-gallery-container">
                      <div class="simpleLens-container">
                        <div class="simpleLens-big-image-container"><a data-lens-image="img/view-slider/large/polo-shirt-1.png" class="simpleLens-lens-image"><img src="${p.product.img}" class="simpleLens-big-image"></a></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal view content -->
                <div class="col-md-7 col-sm-7 col-xs-12">
                  <div class="aa-product-view-content">
                    <h3>${p.product.name}</h3>
                    <div class="aa-price-block">
                      <span class="aa-product-view-price">$ ${p.product.price}</span>
                      <p class="aa-product-avilability">Avilability: <span>${p.quantity}</span></p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis animi, veritatis quae repudiandae quod nulla porro quidem, itaque quis quaerat!</p>
                    <h4>Size</h4>
                    <div class="aa-prod-view-size" id="listSize">
                    ${p.size.name}
                    </div>
                  
                    <div class="aa-prod-quantity">
                      <form action="">
                        
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
                if (data.length==0){
                    str += "Hết Hàng"

                }
            document.getElementById("product-detail").innerHTML=str
            }



            },
            error: function (err){
            console.log(err)
            }

    })
}
showProductDetail()