import EventEmitter from "./services/event-emitter";
import Pageable from "pageable";
import Animations from "./animations";
import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
import "babel-polyfill";

export default class View extends EventEmitter {
  constructor() {
    super();
    this.animation = new Animations();
    this.anchors = [];
    this.pageable = "";
    this.upBtn = document.querySelector(".js-upButton");
  }

  loadAboutScreenAnimation(screenName) {
    this.animation.about(screenName);
  }

  loadFirstScreenAnimation() {
    this.animation.firstScreen();
  }

  loadProductsScreensAnimation(productName) {
    this.animation.products(productName);
  }

  loadProductsSlide() {
    const prev = document.querySelector(".slider-prev");
    const next = document.querySelector(".slider-next");
    const slider = tns({
      container: document.getElementById("js-slider"),
      items: 1,
      slideBy: "page",
      controls: false,
      nav: false,
      controlsContainer: "#slider-controls",
      touch: true,
      speed: 500,
      responsive: {
        640: {
          items: 2
        },

        768: {
          items: 3
        }
      }
    });
    if (prev)
      prev.addEventListener("click", () => {
        slider.goTo("prev");
        console.log("hi");
      });
    if (next)
      next.addEventListener("click", () => {
        slider.goTo("next");
      });
  }

  handleScrollToTop(evt) {
    evt.preventDefault();
    this.pageable.scrollToPage(1);
  }

  loadOnePageScroll(page) {
    if (page === "main") {
      this.anchors = [
        "main",
        "calcivit",
        "multivit",
        "immunovit",
        "smartvit",
        "omega",
        "hello-kitty",
        "spider-man",
        "about-products"
      ];
    } else if (page === "main-about") {
      this.anchors = [
        "main-product",
        "about-product",
        "products-list",
        "footer"
      ];
    }
    const container = document.getElementById("container");
    this.pageable = new Pageable(container, {
      childSelector: "[data-anchor]", // CSS3 selector string for the pages
      anchors: this.anchors, // define the page anchors
      animation: 450, // the duration in ms of the scroll animation
      delay: 0, // the delay in ms before the scroll animation starts
      orientation: "vertical", // or horizontal
      swipeThreshold: 50, // swipe / mouse drag distance (px) before firing the page change event
      freeScroll: true, // allow manual scrolling when dragging instead of automatically moving to next page
      events: {
        wheel: true, // enable / disable mousewheel scrolling
        mouse: true, // enable / disable mouse drag scrolling
        touch: true, // enable / disable touch / swipe scrolling
        keydown: true // enable / disable keyboard navigation
      },

      easing: function(currentTime, startPos, endPos, interval) {
        // the easing function used for the scroll animation
        return (
          -endPos * (currentTime /= interval) * (currentTime - 2) + startPos
        );
      },

      onFinish: () => {
        const href = window.location.href;
        const screen = href
          .split("#")
          .splice(1, 2)
          .join("/");
        if (screen === "main" || screen === "main-product") {
          this.upBtn.style.display = "none";
        } else {
          this.upBtn.style.display = "block";
        }
      }
    });
    if (this.upBtn)
      this.upBtn.addEventListener("click", this.handleScrollToTop.bind(this));
  }
}
