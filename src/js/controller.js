import EventEmitter from "./services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    if (window.matchMedia("(min-width: 1024px)").matches) {
      view.runParallax();
      view.applyOnePageScroll();
    } else {
      view.applyProductsSlide();
    }
  }
}
