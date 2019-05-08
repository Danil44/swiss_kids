import EventEmitter from "./services/event-emitter";
import Pageable from "pageable";
import Glider from "./glider";
import Animations from "./animations";
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
    const prevBtn = document.querySelector(".glider-prev");
    const nextBtn = document.querySelector(".glider-next");
    new Glider(document.querySelector(".products-list"), {
      slidesToShow: 1,
      slidesToScroll: 1,
      scrollLock: true,
      duration: 5,
      arrows: {
        prev: prevBtn,
        next: nextBtn
      },
      responsive: [
        {
          // screens greater than >= 775px
          breakpoint: 775,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: "auto",
            slidesToScroll: "auto",
            itemWidth: 150,
            duration: 2
          }
        },
        {
          // screens greater than >= 1024px
          breakpoint: 1024,
          settings: {
            slidesToShow: 0,
            slidesToScroll: 0,
            itemWidth: 150,
            duration: 2
          }
        }
      ]
    });
  }

  handleScrollToTop(evt) {
    evt.preventDefault();
    console.log(this.pageable);
    this.pageable.scrollToAnchor("#main");
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
    } else if (page === "main-smartvit") {
      this.anchors = [
        "main-smartvit",
        "about-smartvit",
        "product-list",
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

        if (screen === "main") {
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
