# vue-image-box

Lightweight and simple-ish image gallery component for Vue.js.

Images can be cycled throgh using the left & right arrow keys, and closed with the escape key.

Demo: [vue-image-box.netlify.com](https://vue-image-box.netlify.com)

## Installation

CDN

`<script src="https://unpkg.com/vue-image-box"></script>

NPM

`npm install vue-image-box`

## Example usage

This component works by waiting for `index` to be populated with a non-null value. Images are constructed from an array of URLs (`images`) and the click handler updates the value of `index`, triggering the display of the larger modal of the image.

Vue Template:

```html
<template>
  <div>
    <img
      v-for="(image, idx) in images"
      :key="idx"
      :src="image"
      @click="onClick(idx)"
    />
    <ImageBox :images="images" :index="index" @close="index = null"></ImageBox>
  </div>
</template>
```

JavaScript:

```javascript
import ImageBox from "vue-image-box";

export default {
  name: "app",
  components: {
    ImageBox
  },
  methods: {
    onClick: function(idx) {
      this.index = idx;
    }
  },
  data() {
    return {
      index: null,
      images: [
        "https://placekitten.com/800/800",
        "https://placekitten.com/825/800",
        "https://placekitten.com/803/800"
      ]
    };
  }
};
```

## Author

Adam Romig

## License

vue-image-box is available under the MIT license. See the LICENSE file for details.
