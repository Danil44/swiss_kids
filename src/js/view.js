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
    this.isAnimationComplete = {};

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    this.animation.burger();

    this.handlePicturesVisibility();
  }

  handlePicturesVisibility() {
    const isMobile = window.matchMedia(
      "(min-width: 320px) and (min-height: 320px) and (max-width: 768px) and (max-width: 768px)"
    ).matches;

    const isTablet = window.matchMedia(
      "(min-width: 768px) and (min-height: 768px) and (max-width: 1366px) and (max-height: 1366px)"
    ).matches;

    if (isMobile || isTablet) {
      const hiddenAnimation = document.querySelectorAll(
        ".js-animation-container .hidden"
      );
      this.animation.togglePicturesVissibility(hiddenAnimation);
    }
  }

  getPath() {
    const href = window.location.href;
    return href
      .split("#")
      .splice(1, 2)
      .join("/");
  }

  onPageLoad() {
    document.body.onload = () => {
      const rollerCircle = document.getElementById("load-roller");
      const animation = TweenMax.to(rollerCircle, 1.5, {
        delay: 0,
        rotation: 360,
        ease: Linear.easeNone,
        repeat: -1
      }).timeScale(1.2);

      const currentPage = document.querySelector("body").className;
      const path = this.getPath() || currentPage;

      if (window.matchMedia("(min-width: 1279px)").matches) {
        window.location.href = `#${path}`;
      }

      const preloaderCircle = document.getElementById("preloader");

      setTimeout(() => {
        if (
          window.matchMedia("(min-width: 1279px) and (max-height: 1023px)")
            .matches &&
          currentPage
        ) {
          this.loadFirstScreenAnimation();
          this.loadOnePageScroll(path);
        }
        if (currentPage === "main-product") {
          this.loadProductsSlide();
          this.upBtn.style.display = "none";
        }
        if (
          currentPage === "main" &&
          window.matchMedia("(max-width: 767px)").matches
        ) {
          this.loadProductsSlide();
        }
        if (
          window.matchMedia("(max-width: 1367px) and (max-height: 1025px)")
            .matches
        ) {
          if (this.upBtn) {
            this.upBtn.style.display = "none";
          }
        }

        TweenMax.to(preloaderCircle, 0.8, {
          delay: 0,
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            animation.kill();
            preloaderCircle.classList.toggle("done");
            document.body.onscroll = () => {
              this.loadCurrentScreenAnimation();
            };
            this.loadCurrentScreenAnimation();
          }
        });
      }, 1500);
    };
  }

  loadCurrentScreenAnimation() {
    const currentScreen = this.getPath();

    if (this.isAnimationComplete[`${currentScreen}`]) return;
    if (currentScreen === "main") return;

    if (currentScreen === "about-products") {
      this.isAnimationComplete[`${currentScreen}`] = true;
      this.loadAboutScreenAnimation(currentScreen);
    } else {
      this.isAnimationComplete[`${currentScreen}`] = true;
      this.loadProductsScreensAnimation(currentScreen);
    }
  }

  loadAboutScreenAnimation(screenName) {
    this.animation.about(screenName);
  }

  loadFirstScreenAnimation() {
    this.animation.firstScreen();
  }

  loadProductsScreensAnimation(productName) {
    const currentPage = document.querySelector("body").className;
    if (currentPage === "main") this.animation.products(productName);
  }

  loadProductsSlide() {
    const prev = document.querySelector(".slider-prev");
    const next = document.querySelector(".slider-next");
    const container = document.querySelector(".js-slider");
    if (container) {
      const slider = tns({
        container: container,
        items: 1,
        slideBy: "page",
        controls: false,
        nav: false,
        controlsContainer: "#slider-controls",
        touch: true,
        speed: 500,
        responsive: {
          320: {
            items: 1
          },

          568: {
            items: 1
          },
          1024: {
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
      this.anchors = ["main", "about-product", "products-list", "footer"];
    }
    const container = document.getElementById("container");
    this.pageable = new Pageable(container, {
      childSelector: "[data-anchor]", // CSS3 selector string for the pages
      throttle: 50,
      anchors: this.anchors, // define the page anchors
      animation: 600, // the duration in ms of the scroll animation
      delay: 0, // the delay in ms before the scroll animation starts
      orientation: "vertical", // or horizontal
      swipeThreshold: 500, // swipe / mouse drag distance (px) before firing the page change event
      freeScroll: true, // allow manual scrolling when dragging instead of automatically moving to next page
      events: {
        wheel: true, // enable / disable mousewheel scrolling
        mouse: true, // enable / disable mouse drag scrolling
        touch: false, // enable / disable touch / swipe scrolling
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
