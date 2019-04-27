<template>
  <transition name="image-box">
    <div
      class="imgBox"
      @click="close"
      v-if="imageIndex !== null"
      :style="imgBox_style"
    >
      <button type="button" class="imgBox__close" @click="close">
        &times;
      </button>
      <button
        type="button"
        class="imgBox__previous"
        v-if="hasMultipleImages"
        @click.stop="previousImage"
      >
        &lsaquo;
      </button>
      <div class="imgBox__container" v-if="images">
        <transition name="image-fade">
          <img :src="imageUrl" :key="imageUrl" @click.stop="nextImage" />
        </transition>
      </div>
      <button
        type="button"
        class="imgBox__next"
        v-if="hasMultipleImages"
        @click.stop="nextImage"
      >
        &rsaquo;
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["images", "index", "bgcolor"],
  data() {
    return {
      imageIndex: this.index,
      image: null
    };
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        // Left Arrow
        this.previousImage();
      }
      if (e.keyCode === 39) {
        // Right Arrow
        this.nextImage();
      }
      if (e.keyCode === 27) {
        // Escape Key
        this.close();
      }
    });
  },
  watch: {
    index(value) {
      this.imageIndex = value;
    }
  },
  methods: {
    close: function() {
      this.imageIndex = null;
      this.$emit("close");
    },
    previousImage: function() {
      if (this.imageIndex === null) return;
      this.imageIndex =
        this.imageIndex > 0 ? this.imageIndex - 1 : this.images.length - 1;
    },
    nextImage: function() {
      if (this.imageIndex === null) return;
      this.imageIndex =
        this.imageIndex < this.images.length - 1 ? this.imageIndex + 1 : 0;
    }
  },
  computed: {
    imageUrl() {
      return this.images[this.imageIndex];
    },
    hasMultipleImages() {
      return this.images.length > 1;
    },
    imgBox_style() {
      let style = "";
      if (this.bgcolor !== null) style += `background-color: ${this.bgcolor};`;
      return style;
    }
  }
};
</script>

<style lang="scss">
$black: #000;
$white: #fff;
$modal__bg: rgba($black, 0.9);

/* Modal Styles */
@mixin modal__base() {
  transition: opacity 0.2s ease;
  position: fixed;
  z-index: 1000;
}
@mixin modal__mask() {
  @include modal__base();
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100vh;
  background-color: $modal__bg;
  display: table;
}

// Modal Entrance Transition
.image-box-enter {
  opacity: 0;
}

// Modal Container & Image
.imgBox {
  @include modal__mask();
  &__container {
    position: absolute;
    overflow: hidden;
    cursor: pointer;
    max-width: 100vw;
    height: 100vh;
    margin: auto;
    left: 0.5rem;
    right: 0.5rem;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__close {
    color: $white;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    font-size: 25px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 900;
    &:focus {
      outline: 0;
    }
  }
  &__previous,
  &__next {
    position: absolute;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
    z-index: 900;
    cursor: pointer;
    color: $white;
    font-size: 40px;
    background-color: transparent;
    border: none;
    &:focus {
      outline: 0;
    }
  }
  &__previous {
    left: 0;
  }
  &__next {
    right: 0;
  }
}

// Image Change Transition
.image-fade-enter {
  opacity: 0;
}

.image-fade-enter-active {
  transition: all 0.5s ease;
}

@media (max-width: 500px) {
  .imgBox {
    &__close {
      top: 85vh;
      right: calc(50% - 36px);
      font-size: 36px;
    }
    &__previous,
    &__next {
      top: 80vh;
      font-size: 64px;
    }
  }
}
</style>
