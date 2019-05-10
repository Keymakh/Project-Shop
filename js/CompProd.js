Vue.component('products', {
  data(){
    return {
      products: [],
    }
  },
  mounted(){
    this.$parent.getJson(`getProd.json`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  },

  template: `<div class="products">
                <product
                v-for="product of products" 
                :key="product.id_product"
                :product="product"></product>
            </div>`
});

Vue.component('product', {
  props: ['product'],
  template:`<div class="goods">
                <a href="SinglePage.html" class="good-cart">
                    <img class="goods-img" :src="product.img_product" alt="photo">
                    <p class="clothes">{{ product.product_name }}</p>
                    <p class="price">$ {{ product.price }}</p>
                </a>
                <button class="product-add" @click="$root.$refs.cart.addProduct(product)"><img src="img/add-to-cart.svg" alt="add"> add to cart</button>
            </div>`
});