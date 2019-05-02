import EventEmitter from "./services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.onPageLoad(view);
    if (window.matchMedia("(min-width: 1024px)").matches) {
      view.applyOnePageScroll();
    } else {
      view.applyProductsSlide();
    }

    view.applyFirstScreenAnimation();
    // view.preloaderAnimation();
  }

  onPageLoad(view) {
    document.body.onload = () => {
      setTimeout(() => {
        const preloaderCircle = document.getElementById("preloader");
        // TweenMax.to(preloaderCircle, 0.8, {
        //   delay: 0,
        //   opacity: 0,
        //   ease: Power2.easeOut,
        //   onComplete: () => {
        //     preloaderCircle.classList.toggle("done");
        //   }
        // });
      }, 2000);
    };
  }
}
