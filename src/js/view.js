import EventEmitter from "./services/event-emitter";
import Parallax from "parallax-js";
import Pageable from "pageable";
import Glider from "./glider";
import "babel-polyfill";

export default class View extends EventEmitter {
  constructor() {
    super();
  }

  preloaderAnimation() {
    const rollerCircle = document.getElementById("load-roller");

    TweenMax.to(rollerCircle, 1.5, {
      delay: 0,
      rotation: 360,
      ease: Linear.easeNone,
      repeat: -1
    }).timeScale(1.2);
  }

  applyFirstScreenAnimation() {
    const mainScreen = document.querySelector(".main-screen");
    const bottles = mainScreen.querySelectorAll(".bottles__item");
    const title = mainScreen.querySelector(".js-title");
    const subtitle = mainScreen.querySelector(".js-subtitle");
    const mainTimeline = new TimelineMax();

    bottles.forEach(item => {
      const tl = new TimelineMax();
      tl.from(
        item,
        1,
        {
          delay: 0.5,
          alpha: 0,
          opacity: 0,
          y: -250,
          ease: Elastic.easeOut.config(0.3, 0.3)
        },
        0
      );
      mainTimeline.add(tl, "-=0.6");
    });

    TweenMax.from(title, 2.5, {
      delay: 1,
      opacity: 0,
      y: 100,
      ease: Elastic.easeOut.config(0.8, 0.3)
    });

    TweenMax.from(subtitle, 2.5, {
      delay: 2,
      opacity: 0,
      y: 20,
      ease: Power2.easeOut,
      onComplete: () => {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          this.runParallax("main");
        }
      }
    });
  }

  loadProductsScreensAnimation(productName) {
    function togglePicturesVissibility(elements) {
      elements.forEach(elem => {
        if (elem) {
          if (elem.classList.contains("hidden")) {
            elem.classList.remove("hidden");
          } else {
            elem.classList.add("hidden");
          }
        }
      });
    }
    const container = document.querySelector(
      `.second-screen > .${productName}`
    );
    const productPictures = container.querySelector(
      ".product-screen__pictures"
    );
    const vines = container.querySelector(".vines");
    const animal = productPictures.querySelector(".js-animal");
    const bottle = productPictures.querySelector(".js-bottle");
    const background = productPictures.querySelector(".js-product-background");
    togglePicturesVissibility([productPictures, vines]);
    if (vines) {
      TweenMax.from(vines, 3, {
        delay: 0,
        y: -500,
        ease: Elastic.easeOut.config(0.7, 0.3)
      });
    }
    TweenMax.from(bottle, 2, {
      scale: 0,
      ease: Elastic.easeOut.config(0.6, 0.3),
      opacity: 0
    });
    TweenMax.from(background, 2, {
      x: -500,
      ease: Elastic.easeOut.config(0.8, 0.4),
      opacity: 0,
      onComplete: () => {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          this.runParallax(productName, container);
        }
      }
    });

    if (productName === "multivit") {
      TweenMax.from(animal, 2, {
        x: 200,
        ease: Elastic.easeOut.config(0.8, 0.4),
        opacity: 0
      });
    }
    if (productName === "immunovit") {
      TweenMax.from(animal, 2, {
        delay: 0.6,
        y: -40,
        x: -20,
        ease: Elastic.easeOut.config(0.8, 0.4),
        opacity: 0
      });
    }
  }

  applyProductsSlide() {
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

  applyOnePageScroll() {
    const container = document.getElementById("container");

    new Pageable(container, {
      childSelector: "[data-anchor]", // CSS3 selector string for the pages
      anchors: [], // define the page anchors
      pips: true, // display the pips
      animation: 450, // the duration in ms of the scroll animation
      delay: 500, // the delay in ms before the scroll animation starts
      throttle: 50, // the interval in ms that the resize callback is fired
      orientation: "vertical", // or horizontal
      swipeThreshold: 50, // swipe / mouse drag distance (px) before firing the page change event
      freeScroll: true, // allow manual scrolling when dragging instead of automatically moving to next page
      navPrevEl: true, // define an element to use to scroll to the previous page (CSS3 selector string or Element reference)
      navNextEl: true, // define an element to use to scroll to the next page (CSS3 selector string or Element reference)
      infinite: false, // enable infinite scrolling (from 0.4.0)
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
      }
    });
  }

  runParallax(product, container) {
    function runMainScreen() {
      const bottles = document.getElementById("bottles-list");
      const fruits1 = document.getElementById("fruits-1");
      const fruits2 = document.getElementById("fruits-2");
      const runBottlesParallax = new Parallax(bottles);
      const runFruits1 = new Parallax(fruits1);
      const runFruits2 = new Parallax(fruits2);
    }
    function runProductsParallax() {
      if (container) {
        const productPictures = container.querySelector(`.${product}-pictures`);
        new Parallax(productPictures);
      }
    }
    runMainScreen();
    runProductsParallax();
  }
}
