import EventEmitter from "./services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.onPageLoad(view);
    this.view = view;
    this.model = model;
    view.preloaderAnimation();
    model.on("loadAnimation", this.loadProductsScreensAnimation.bind(this));

    window.addEventListener("scroll", () => {
      model.getCurrentPath();
    });
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

        TweenMax.to(preloaderCircle, 0.8, {
          delay: 0,
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            preloaderCircle.classList.toggle("done");
          }
        });
        if (window.matchMedia("(min-width: 1024px)").matches) {
          view.applyFirstScreenAnimation();

          view.applyOnePageScroll();
        } else {
          view.applyProductsSlide();
        }
      }, 2000);
    };
  }
}
