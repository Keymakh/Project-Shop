Vue.component('cart', {
  data(){
    return {
      filtered: [],
      cartItems: [],
      showCart: false,
    }
  },
  methods: {
    addProduct(product){
      this.$parent.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
              find.quantity++;
            } else {
              let prod = Object.assign({quantity: 1}, product);
              this.cartItems.push(prod);
            }
          }
        })
    },
    remove(product){
      this.$parent.getJson(`getCart.json`)
        .then(data => {
            if(product.quantity > 1){
              product.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(product), 1);
            }
        })
    },
  },
  mounted(){
    this.$parent.getJson(`getCart.json`)
      .then(data => {
        for(let el of data){
          this.cartItems.push(el);
        }
      });
  },
  template: `<div>
                <img class="btn-cart" @click="showCart = !showCart" src="img/cart.svg" alt="cart">
                <div class="cart-block" v-show="showCart">
                    <p v-if="!cartItems.length">Cart is empty</p>
                    <cart-item 
                    v-for="product of cartItems"  
                    :key="product.id_product"
                    :cart-item="product"
                    @remove="remove"></cart-item>
                    <div class="drop-cart-total-sum">
                        <p class="drop-cart-total">TOTAL</p>
                        <p class="drop-cart-sum">$500</p>
                    </div>
                    <div class="cart-buttons">
                        <a class="checkout-cart-button" href="checkout.html">checkout</a>
                        <a class="go-to-cart-button" href="cart.html">go to cart</a>
                    </div>
                </div>
            </div>`
});
Vue.component('cart-item', {
  props: ['cartItem'],
  template:
    `<div class="drop-cart-item">
        <a class="drop-cart-item-link" href="SinglePage.html"><img class="drop-cart-item-img" :src="cartItem.img_product" alt="photo"></a>
        <div class="drop-cart-item-description">
            <a class="drop-name-product-link" href="SinglePage.html"><h3 class="drop-name-product">{{cartItem.product_name}}</h3></a>
            <p class="drop-cost-product">{{cartItem.quantity}} x $ {{cartItem.price}}</p>
        </div>
        <div class="delete-circle">
            <button class="fas fa-minus-circle" @click="$emit('remove', cartItem)"></button>
        </div>
    </div>`
})