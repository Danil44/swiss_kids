import EventEmitter from "./services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();

    this.view = view;
    this.model = model;

    this.onPageLoad(view);

    model.on("loadAnimation", this.loadProductsScreensAnimation.bind(this));
    model.on("loadAboutAnimation", this.loadAboutScreensAnimation.bind(this));
  }

  loadAboutScreensAnimation(screenName) {
    if (screenName) {
      this.view.loadAboutScreenAnimation(screenName);
    } else {
      return;
    }
  }

  loadProductsScreensAnimation(productName) {
    const currentPage = document.querySelector("body").className;
    if (productName && currentPage === "main-page") {
      this.view.loadProductsScreensAnimation(productName);
    }
  }

  onPageLoad(view) {
    document.body.onload = () => {
      const rollerCircle = document.getElementById("load-roller");
      const animation = TweenMax.to(rollerCircle, 1.5, {
        delay: 0,
        rotation: 360,
        ease: Linear.easeNone,
        repeat: -1
      }).timeScale(1.2);
      const currentPage = document.querySelector("body").className;

      const path = this.model.getPath() || currentPage;

      if (window.matchMedia("(min-width: 1024px)").matches) {
        view.loadFirstScreenAnimation();
        view.loadOnePageScroll(path);
      } else {
        view.loadProductsSlide();
      }

      setTimeout(() => {
        const preloaderCircle = document.getElementById("preloader");

        TweenMax.to(preloaderCircle, 0.8, {
          delay: 0,
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            animation.kill();
            preloaderCircle.classList.toggle("done");
            document.body.onscroll = () => {
              this.model.loadCurrentScreenAnimation();
            };
            this.model.loadCurrentScreenAnimation(path);
          }
        });
      }, 1500);
    };
  }
}
