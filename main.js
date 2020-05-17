/* eslint-disable quotes */
Vue.component("hello", {
  props: {
    cart: {
      type: Number,
      required: true
    }
  },
  template: `<div class="cart">
        <p>Cart ({{cart.length}})</p>
  </div>`,
});

Vue.component("productDetails", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">
        {{detail}}
      </li>
    </ul>
  `
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      <span v-show="onSale" class="sale">{{nowOnSale}}</span>
        <p v-if="quantity > 10">In Stock</p>
      <p v-else-if="quantity <= 10 && quantity> 0" :style="red">Almost Sold Out!</p>
        <p class='line' v-else>Out of Stock</p>
        <p>Shipping: {{shipping}}</p>

        <productDetails :details="details"></productDetails>

        <div class="color-box"
             v-for="(variant, i) in variants"
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="handleChange(i)"
        ></div>

        <p v-for="size in sizes">{{ size }}</p>

        <button @click="addToCart"
                  :disabled="!inStock"
                  :class="{disabledButton : !inStock}"
         >Add to Cart</button>
        <button @click="remove">Remove</button>
     </div>

    </div>
  `,
  data() {
    return {
      brand: "Crispina's",
      onSale: true,
      product: "Socks",
      description: "Comfortable stylish men's socks!",
      selectedVariant: 0,
      link:
        "https://www.argylesocks.co/wp-content/uploads/2013/02/1110x1266-VU102.jpg",
      red: {
        color: "red",
      },
      sizes: ["size 5-8", "size 8-10", "size 11-14"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage:
            "https://m.media-amazon.com/images/I/61zSO8KY7hL._SR500,500_.jpg",
          variantQuantity: 30,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage:
            "https://www.argylesocks.co/wp-content/uploads/2013/02/1110x1266-VU102.jpg",
          variantQuantity: 100,
        },
      ],
    };
  },
  methods: {
    handleChange(i) {
      this.selectedVariant = i;
    },
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    remove() {
      this.$emit('remove-from-cart');
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    quantity() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity > 0;
    },
    nowOnSale() {
      return `${this.brand} ${this.product} now on sale!`;
    },
    shipping() {
      if (this.premium) return "Free";
      return "5.99";
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    premium: true,
    details: ["80% cotton", "20% polyester", "Gender neutral"],
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeCart() {
      if (this.cart.length > 0) this.cart.pop();
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
<a :href="link">Other styles</a>
when we use :href="link" we are data binding and using a dynamic variable 'link' to access some data as an expression

----------------
-Components

components are reusable blocks of code used to create are more modular and maintainable code base

-Nested Components

components may contain several components within itself

- Creating a Component

-Register the component:

Vue.component('componentName', {options Object});

- Component Options Object

nearly identical to the object inserted when creating the Vue instance

- Component Template Property

Vue.component('componentName', {
    template: `<h1>I'm a component</h1>`
});

Instead of plugging into an element in the DOM like we do in the Vue instance, a component has a template property. Which specifies the structure of your component. There are different ways to construct a template but for now we can use a template literal using backticks.

-  Template Root Element

Warning: Component template should contain exactly one root element.

Vue.component('componentName', {
    template: `<h1>I'm a component</h1>
               <h2>Arn't I beautiful?</h2>`
});

The backtics will allow us to add another element but the template needs to be wrapped in a div. This will allow us to have a single parent element for all of the elements in our template. This will avoid the warning: Component template should contain exactly one root element.

Vue.component('componentName', {
    template: `<div>
                  <h1>I'm a component</h1>
                  <h2>Arn't I beautiful?</h2>
               </div>`
});

-Component Data function

Just like the Vue instance our component can contain data as well. But notice here that data is a function that returns a data object. If it was just a data object and we were using that component throughout our app, each  copy of that component would have the same data object with the same data and would not be dynamic.

Using  a data function will return a fresh data object for each component. This will give each component instance it's own uniuqe data.

- Passing Props

What if our component is nested somewhere, inside a parent component which has some message data. since our component has it's own isolated scope, it cannot reach up outside of itself for it's parents message data.

- Props

Instead we can use props to pass data down to the child component. A prop is a custom attribute for passing data into our components.

In order to recieve props, a component needs to explicitly declare the props it expects to recieve in the props option. So here we're saying that our product component will recieve the prop called 'message'

Vue.component('product', {
  props:[message],
  template: `<div>
                {{message}}
             </div>`
});

now we can use message in our components template

- Parent passes the props down to child component

      <product message="hello!"></product>

- Prop Validation

When declaring your component's props it is recommended to specify requirements with vue's built-in prop validation. In order to do this we can switch our props array into a props object.

- props Object

Vue.component('product', {
    props: {
        message: {
            type: String,
            required: true,
            default: "Hi"
        }
    }
});


Inside here we can make an object for our message prop, and specify it's data type, if it's required or not, or give it a default value.

-------------

code for new components:

1) Register Component:

Vue.component('product', {
  template: `<div>all of your component goes here</div>`
});

2) Add data, methods, and computed propterties options to component

    Vue.component('product', {
      template: `<div>all of your component goes here</div>`,
      data() {
        return {
          product: 'socks'
        }
      },
      methods: {
        addToCart() {}
      },
      computed: {
        title() {}
      }
    });

3) Add expected props option

    Vue.component('componentName', {
      props: {
        firstProp:{
          type: String,
          required: true,
          default: 'hello'
        },
      },
      template: `<div>...</div>`,
      data() {
        return {}
      },
      methods: {
        addToCart() {},
      },
      computed: {
        title() {},
      }
    });

    -------------

- Event Emitters

To communicate with parent componets when a button (on click) has happened, we can emit an event.

1. Inside of the child component we can add a method to a button like so:

<button @Click="addToCart"></button>

2. Then in our child component we add a method addToCart

methods: {
  addToCart() {
    this.$emit('add-to-cart');
  }
}

3. Now we should listen for this event emitter on our parent component. To do this we add an attribute with the v-on decorator for the event we emitted on our button.

<product @add-to-cart="updateCart" @remove-from-cart="removeCart"

4. We also need to write our method updateCart on our Vue root instance options object under methods.

const app = new Vue({
  el: '#app',
  data: {},
  methods: {updateCart() {}}
})

*/
