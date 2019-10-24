import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueImageBox from "../../vue-image-box.vue";

const localVue = createLocalVue();
let images = [
  { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" },
  { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }
];

describe("Images Array", () => {
  test("If only one record, hasMultipleImages is false", () => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.vm.hasMultipleImages).toBe(false);
  });

  test("If only one record, do not display previous & next buttons", () => {
    images = [{ imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }];
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.find(".imgBox__previous").exists()).toBe(false);
    expect(wrapper.find(".imgBox__next").exists()).toBe(false);
  });

  test("If more than one record, hasMultipleImages is true", () => {
    images = [
      { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" },
      { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }
    ];
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.vm.hasMultipleImages).toBe(true);
  });

  test("If more than one record, display previous & next buttons", () => {
    images = [
      { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" },
      { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }
    ];
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    expect(wrapper.vm.hasMultipleImages).toBe(true);
    expect(wrapper.find(".imgBox__previous").exists()).toBe(true);
    expect(wrapper.find(".imgBox__next").exists()).toBe(true);
  });
});

describe("Button Clicks", () => {
  test("Clicking 'previous image' button should call previousImage()", () => {
    const previousImage = jest.fn();
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setMethods({ previousImage: previousImage });
    wrapper.find(".imgBox__previous").trigger("click");
    expect(previousImage).toHaveBeenCalled();
  });

  test("Clicking 'next image' button should call nextImage()", () => {
    const nextImage = jest.fn();
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setMethods({ nextImage: nextImage });
    wrapper.find(".imgBox__next").trigger("click");
    expect(nextImage).toHaveBeenCalled();
  });

  test("Clicking 'X' button should call close()", () => {
    const close = jest.fn();
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 }
    });
    wrapper.setMethods({ close: close });
    wrapper.find(".imgBox__close").trigger("click");
    expect(close).toHaveBeenCalled();
  });
});

describe("Keyboard Events", () => {
  images = [
    { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" },
    { imageUrl: "xxxx", thumbUrl: "xxxx", caption: "xxxx" }
  ];

  test("Pressing the Left Arrow key should call previousImage()", () => {
    const previousImage = jest.fn();
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 },
      attachToDocument: true
    });
    wrapper.setMethods({ previousImage: previousImage });
    wrapper.trigger("keydown.left");
    expect(previousImage).toHaveBeenCalled();
  });

  test("Pressing the Right Arrow key should call nextImage()", () => {
    const nextImage = jest.fn();
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 },
      attachToDocument: true
    });
    wrapper.setMethods({ nextImage: nextImage });
    wrapper.trigger("keydown.right");
    expect(nextImage).toHaveBeenCalled();
  });

  test("Pressing the ESC key should call close()", () => {
    const close = jest.fn();
    const wrapper = shallowMount(VueImageBox, {
      localVue,
      propsData: { images: images, index: 0 },
      attachToDocument: true
    });
    wrapper.setMethods({ close: close });
    wrapper.trigger("keydown.esc");
    expect(close).toHaveBeenCalled();
  });
});
