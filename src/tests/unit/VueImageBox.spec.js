import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueImageBox from "../../vue-image-box.vue";

const localVue = createLocalVue();
let images = [];
let wrapper;

describe("Images Array", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
  });

  test("If no records, do not preload the first image", () => {
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: [], index: null }
    });
  });

  test("If only one record, hasMultipleImages is false", () => {
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.vm.hasMultipleImages).toBe(false);
  });

  test("If only one record, do not display previous & next buttons", () => {
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.find(".imgBox__previous").exists()).toBe(false);
    expect(wrapper.find(".imgBox__next").exists()).toBe(false);
  });

  test("If more than one record, hasMultipleImages is true", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.vm.hasMultipleImages).toBe(true);
  });

  test("If more than one record, display previous & next buttons", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.vm.hasMultipleImages).toBe(true);
    expect(wrapper.find(".imgBox__previous").exists()).toBe(true);
    expect(wrapper.find(".imgBox__next").exists()).toBe(true);
  });
});

describe("Button Clicks", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
  });

  test("Clicking 'previous image' button should call previousImage()", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    const previousImage = jest.fn();
    wrapper.setMethods({ previousImage: previousImage });
    wrapper.find(".imgBox__previous").trigger("click");
    expect(previousImage).toHaveBeenCalled();
  });

  test("Clicking 'next image' button should call nextImage()", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    const nextImage = jest.fn();
    wrapper.setMethods({ nextImage: nextImage });
    wrapper.find(".imgBox__next").trigger("click");
    expect(nextImage).toHaveBeenCalled();
  });

  test("Clicking 'X' button should call close()", () => {
    const close = jest.fn();
    wrapper.setMethods({ close: close });
    wrapper.find(".imgBox__close").trigger("click");
    expect(close).toHaveBeenCalled();
  });
});

describe("Keyboard Events", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 },
      attachToDocument: true
    });
  });

  test("Pressing the Left Arrow key should call previousImage()", () => {
    const previousImage = jest.fn();
    wrapper.setMethods({ previousImage: previousImage });
    wrapper.trigger("keydown.left");
    expect(previousImage).toHaveBeenCalled();
  });

  test("Pressing the Right Arrow key should call nextImage()", () => {
    const nextImage = jest.fn();
    wrapper.setMethods({ nextImage: nextImage });
    wrapper.trigger("keydown.right");
    expect(nextImage).toHaveBeenCalled();
  });

  test("Pressing the ESC key should call close()", () => {
    const close = jest.fn();

    wrapper.setMethods({ close: close });
    wrapper.trigger("keydown.esc");
    expect(close).toHaveBeenCalled();
  });
});

describe("previousImage()", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
  });

  test("should decrement imageIndex by 1", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 1 });
    wrapper.vm.previousImage();
    expect(wrapper.vm.imageIndex).toBe(0);
  });

  test("should set imageIndex to the last image's index, if currently at first image", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    const lastIndex = images.length - 1;
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 0 });
    wrapper.vm.previousImage();
    expect(wrapper.vm.imageIndex).toBe(lastIndex);
  });

  test("from [2] should call preLoad() with imageUrl of [0]", () => {
    images.push({ imageUrl: "yyyy", thumbUrl: "yyyy", caption: "yyyy" });
    images.push({ imageUrl: "zzzz", thumbUrl: "zzzz", caption: "zzzz" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 2 });
    wrapper.vm.preLoad = jest.fn();
    wrapper.vm.previousImage();
    expect(wrapper.vm.preLoad).toHaveBeenCalledWith("xxxx");
  });
});

describe("nextImage()", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
  });

  test("should increment imageIndex by 1", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 0 });
    wrapper.vm.nextImage();
    expect(wrapper.vm.imageIndex).toBe(1);
  });

  test("should set imageIndex to the first image's index, if currently at the last image", () => {
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    images.push({ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 2 });
    wrapper.vm.nextImage();
    expect(wrapper.vm.imageIndex).toBe(0);
  });

  test("from [0] should call preLoad with imageUrl of [2]", () => {
    images.push({ imageUrl: "yyyy", thumbUrl: "yyyy", caption: "yyyy" });
    images.push({ imageUrl: "zzzz", thumbUrl: "zzzz", caption: "zzzz" });
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 0 });
    wrapper.vm.preLoad = jest.fn();
    wrapper.vm.nextImage();
    expect(wrapper.vm.preLoad).toHaveBeenCalledWith("zzzz");
  });
});

describe("close()", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
  });

  test("should set imageIndex to null", () => {
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 0 });
    wrapper.vm.close();
    expect(wrapper.vm.imageIndex).toBe(null);
  });

  test("should hide the imgBox div", () => {
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setData({ imageIndex: 0 });
    wrapper.vm.close();
    expect(wrapper.find(".imgBox").exists()).toBe(false);
  });
});

describe("mounted()", () => {
  beforeEach(() => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
  });

  test("should have called preLoad using the first imageUrl", () => {
    images.push({ imageUrl: "yyyy", thumbUrl: "yyyy", caption: "yyyy" });
    images.push({ imageUrl: "zzzz", thumbUrl: "zzzz", caption: "zzzz" });
    const preLoad = jest.fn();
    wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 },
      methods: { preLoad }
    });
    expect(preLoad).toHaveBeenCalledWith("xxxx");
  });
});
