import EventEmitter from "./services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.onPageLoad(view);
    this.view = view;
    this.model = model;

    view.preloaderAnimation();
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
    if (productName) {
      this.view.loadProductsScreensAnimation(productName);
    } else {
      return;
    }
  }

  onPageLoad(view) {
    document.body.onload = () => {
      setTimeout(() => {
        const preloaderCircle = document.getElementById("preloader");
        const page = this.model.getPath();

        TweenMax.to(preloaderCircle, 0.8, {
          delay: 0,
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            preloaderCircle.classList.toggle("done");

            document.body.onscroll = () => {
              this.model.loadCurrentScreenAnimation();
            };
            this.model.loadCurrentScreenAnimation(page);
          }
        });
        if (window.matchMedia("(min-width: 1024px)").matches) {
          view.loadFirstScreenAnimation();

          view.loadOnePageScroll();
        } else {
          view.loadProductsSlide();
        }
      }, 2000);
    };
  }
}
