/* eslint-disable quotes */
console.log('hi');

const app = new Vue({
  el: "#app",
  data: {
    brand: 'Crispina\'s',
    onSale: false,
    product: "Socks",
    description: "Comfortable stylish men's socks!",
    image: "https://m.media-amazon.com/images/I/61zSO8KY7hL._SR500,500_.jpg",
    link:
      "https://www.argylesocks.co/wp-content/uploads/2013/02/1110x1266-VU102.jpg",
    inStock: false,
    inventory: 8,
    red: {
      color: "red",
    },
    details: ["80% cotton", "20% polyester", "Gender neutral"],
    sizes: ['size 5-8', 'size 8-10', 'size 11-14'],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage:
          "https://m.media-amazon.com/images/I/61zSO8KY7hL._SR500,500_.jpg",
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage:
          "https://www.argylesocks.co/wp-content/uploads/2013/02/1110x1266-VU102.jpg",
      },
    ],
    cart: 0
  },
  methods: {
    handleChange(img) {
      this.image = img;
    },
    addToCart() {
      this.cart++;
    },
    remove() {
      if (this.cart > 0) this.cart--;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    }
  }
});


/*

new Vue instance is the heart of the application

It plugs into an element in the dom

That element can use an {{expression}} to display that instance's data

-----------

v-bind

Dynamically binds an attribute to an expression

The attribute we're binding to is src

and the expression lies inside the quotes "image" which we are taking from our data object

If our image data were to change /green to blue/

https://www.argylesocks.co/wp-content/uploads/2013/02/1110x1266-VU102.jpg

Conditional Rendering:
<p v-if="inventory > 10">In Stock</p>

v-if will add or remove an element from the dom, if we do this freqently we should use v-show

v-show toggles visibility of element ie style="display: none"

dynamically adding a class to an element

<div :class="{ active: activeClass, 'text-danger: errorClass }">

<div :class="[activeClass, errorClass]"></div>

<div :class="[isActive ? activeClass : '']"></div>

-----

Computed Properties on the vue obj

computed properties are cached, the result is saved until it's dependancies are changed

if any dependancies are changed then the computed function is rerun and that new value is cached

with that in mind it's more efficient to use a computed property rather than a method for an expensive operation that you shouldn't rerun every time you access the data.

------------------


*/
