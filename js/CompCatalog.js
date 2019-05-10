Vue.component('catalog', {
  data(){
    return{
      catalog: [],
    }
  },
  mounted(){
    this.$parent.getJson(`getCatalog.json`)
      .then(data => {
        for (let el of data) {
          this.catalog.push(el);
        }
      })
  },

  template: `<div class="catalog">
                <product
                v-for="product of catalog" 
                :key="product.id_product"
                :product="product"></product>
            </div>`
});

Vue.component('product', {
  props: ['product'],
  template: `<div class="goods"><a href="SinglePage.html" class="good-cart"><img class="goods-img" :src="product.img_product" alt="pic">
                            <p class="clothes">{{ product.product_name }}</p>
                            <p class="price">$ {{ product.price }}</p>
                        </a>
                        <div class="goods-buttons">
                        <button class="add-to-cart-button" @click="$root.$refs.cart.addProduct(product)"><img src="img/add-to-cart.svg" alt="add"> add to cart</button>
                        <div class="two-buttons">
                            <a class="product-page-button" href="#"><img src="img/Icon1.svg" alt="pic"></a>
                            <a class="product-favorite-button" href="#"><img src="img/Icon2.svg" alt="pic"></a>
                        </div>
                        </div>
                    </div>`
})


