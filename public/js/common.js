const allLikes = document.querySelectorAll('.like-btn');
const alldelete = document.querySelectorAll('.delete-btn');

// to add/remove product from wishlist
async function likeButton(productId, btn){
    try{
        let response = await axios({
            method: 'post',
            url:`/products/${productId}/like`,
            headers:{'X-Requested-Width': 'XMLHttpRequest'}
        });
        if(btn.children[0].classList.contains('fa-regular')){
            btn.children[0].classList.remove('fa-regular');
            btn.children[0].classList.add('fa-solid');
        }
        else{
            btn.children[0].classList.remove('fa-solid');
            btn.children[0].classList.add('fa-regular');
        }
        console.log(response);
    }
    catch(e){
        // console.log(e);
        window.location.replace('/login'); //similar to redirect
        // console.log(e.message);
    }
}

// to remove product from cart
async function deleteButton(productId, btn){
    try{
        let response = await axios({
            method: 'post',
            url:`/user/cart/${productId}/remove`,
            headers:{'X-Requested-Width': 'XMLHttpRequest'}
        });
        window.location.replace('/user/cart');
        console.log(response);
    }
    catch(e){
        // console.log(e);
        window.location.replace('/login'); //similar to redirect
        // console.log(e.message);
    }
}

// to add/remove product to wishlist
for(let btn of allLikes){
    btn.addEventListener('click',()=>{
        let productId = btn.getAttribute('product-id');
        likeButton(productId,btn);
    })
}

// to remove product from cart
for(let btn of alldelete){
    btn.addEventListener('click',()=>{
        let productId = btn.getAttribute('product-id');
        deleteButton(productId,btn);
    })
}