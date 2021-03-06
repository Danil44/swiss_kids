import Parallax from "parallax-js";

export default class Animations {
  constructor() {
    this.menuBtn = document.querySelector(".js-burger");
  }

  burger() {
    if (this.menuBtn) {
      const menuToggle = new TimelineMax({ paused: true, reversed: true });
      const top = this.menuBtn.querySelector(".top");
      const mid = this.menuBtn.querySelector(".mid");
      const bot = this.menuBtn.querySelector(".bot");
      const firstScreen = document.querySelector(".js-first-screen");

      menuToggle
        .set(this.menuBtn, { className: "-=closemenu" })
        .set(this.menuBtn, { className: "+=openmenu" })
        .to(top, 0.1, { y: "-9px", transformOrigin: "50% 50%" }, "burg")
        .to(bot, 0.1, { y: "9px", transformOrigin: "50% 50%" }, "burg")
        .to(mid, 0.1, { scale: 0.1, transformOrigin: "50% 50%" }, "burg")
        .add("rotate")
        .to(top, 0.1, { y: "5" }, "rotate")
        .to(bot, 0.1, { y: "-10" }, "rotate")
        .to(top, 0.1, { rotationZ: 45, transformOrigin: "50% 50%" }, "rotate")
        .to(bot, 0.1, { rotationZ: -45, transformOrigin: "50% 50%" }, "rotate");

      this.menuBtn.addEventListener("click", () => {
        if (menuToggle.reversed()) {
          menuToggle.restart();
          this.handleMenu(true);
          // firstScreen.style.height = "100vh";
        } else {
          menuToggle.reverse();
          this.handleMenu(false);
          // firstScreen.style.height = "unset";
        }
      });
    }
  }

  handleMenu(show) {
    const womenPicture = document.querySelector(".women-picture");
    const mainScreen = document.querySelector(".js-main-screen");
    const menu = document.querySelector(".js-menu");
    const body = document.querySelector("body");
    menu.classList.toggle("hidden");
    if (womenPicture) womenPicture.classList.toggle("hidden");
    if (show) {
      body.style.overflow = "hidden";
      mainScreen.setAttribute("style", "height: 100vh !important");
      TweenMax.from(menu, 0.3, {
        opacity: 0,
        scale: 0
      });
    } else {
      body.style.overflow = "";
      mainScreen.setAttribute("style", "height: ''");
    }
  }

  firstScreen() {
    const mainScreen = document.querySelector(".js-main-screen");
    const bottles = mainScreen.querySelectorAll(".bottles__item");
    const title = mainScreen.querySelector(".js-title");
    const subtitle = mainScreen.querySelector(".js-subtitle");
    const productBottle = mainScreen.querySelector(".js-product-bottle");

    if (productBottle) {
      TweenMax.from(productBottle, 1.5, {
        delay: 0.5,
        scale: 0,
        opacity: 0,
        ease: Elastic.easeOut.config(0.6, 0.5)
      });
    }

    if (bottles) {
      bottles.forEach(item => {
        TweenMax.from(item, 1.5, {
          delay: 0.8,
          alpha: 0,
          opacity: 0,
          y: -300,
          ease: Elastic.easeOut.config(0.7, 0.5)
        });
      });
    }
    TweenMax.from(title, 1, {
      delay: 0.2,
      opacity: 0,
      y: 100,
      ease: Power2.easeOut
    });

    TweenMax.from(subtitle, 1, {
      delay: 1.8,
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

  about(screenName) {
    const container = document.querySelector(`.${screenName}`);
    if (screenName === "about-products") {
      const elements = container.querySelectorAll(".js-about-element");
      const mainTweenMax = new TimelineMax();
      this.togglePicturesVissibility([container]);
      elements.forEach(elem => {
        const tl = new TimelineMax();
        tl.from(
          elem,
          1.2,
          {
            delay: 0.8,
            y: 20,
            opacity: 0,
            ease: Power1.easeIn
          },
          0
        );
        mainTweenMax.add(tl, "-=1.2");
      });
    }
  }

  togglePicturesVissibility(elements) {
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

  products(productName) {
    const container = document.querySelector(`.js-screen > .${productName}`);
    const productPictures = container.querySelector(
      ".product-screen__pictures"
    );
    const vines = container.querySelector(".vines");
    const animal = productPictures.querySelector(".js-animal");
    const vitamins = productPictures.querySelector(".js-vitamins");
    const background = productPictures.querySelector(".js-product-background");

    this.togglePicturesVissibility([productPictures, vines]);

    if (vines) {
      TweenMax.from(vines, 3, {
        delay: 0,
        y: -500,
        ease: Elastic.easeOut.config(0.7, 0.3)
      });
    }

    TweenMax.from(vitamins, 2, {
      scale: 0,
      ease: Elastic.easeOut.config(0.6, 0.5),
      opacity: 0
    });

    if (background && productName !== "spider-man") {
      TweenMax.from(background, 2, {
        delay: 1,
        x: -200,
        ease: Elastic.easeOut.config(0.8, 0.4),
        opacity: 0,
        onComplete: () => {
          if (window.matchMedia("(min-width: 1024px)").matches) {
            this.runParallax(productName, container);
          }
        }
      });
    }

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

    if (productName === "smartvit") {
      TweenMax.from(animal, 2, {
        delay: 0.6,
        y: -100,
        x: 20,
        ease: Elastic.easeOut.config(0.8, 0.4),
        opacity: 0
      });
    }
    if (productName === "omega") {
      const planet = productPictures.querySelector(".js-planet");
      const spaceship = productPictures.querySelector(".js-spaceship");
      TweenMax.from(planet, 2, {
        delay: 0.8,
        opacity: 0,
        ease: Elastic.easeOut.config(0.8, 0.4),
        onComplete: () => {
          if (window.matchMedia("(min-width: 1024px)").matches) {
            this.runParallax(productName, container);
          }
        }
      });
      TweenMax.from(spaceship, 3, {
        delay: 0.4,
        y: 100,
        x: -100,
        ease: Elastic.easeOut.config(0.8, 0.4),
        opacity: 0
      });
    }
    if (productName === "spider-man") {
      TweenMax.from(background, 2, {
        delay: 0.4,
        opacity: 0,
        x: 0,
        y: 500,
        ease: Elastic.easeOut.config(0.8, 0.4),
        onComplete: () => {
          if (window.matchMedia("(min-width: 1024px)").matches) {
            this.runParallax(productName, container);
          }
        }
      });
    }

    if (productName === "hello-kitty") {
      const ballons = productPictures.querySelector(".js-ballons");
      TweenMax.from(ballons, 2, {
        delay: 0.4,
        opacity: 0,
        y: 100,
        ease: Elastic.easeOut.config(0.8, 0.4),
        onComplete: () => {
          if (window.matchMedia("(min-width: 1024px)").matches) {
            this.runParallax(productName, container);
          }
        }
      });
    }
  }
  runParallax(product, container) {
    function runMainScreen() {
      const bottles = document.getElementById("bottles-list");
      const fruits1 = document.getElementById("fruits-1");
      const fruits2 = document.getElementById("fruits-2");
      const productBottle = document.getElementById("product-bottle");

      if (bottles) new Parallax(bottles);
      new Parallax(fruits1);
      new Parallax(fruits2);

      if (productBottle) new Parallax(productBottle);
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
