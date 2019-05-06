import EventEmitter from "./services/event-emitter";

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.page = "";
    this.isAnimationComplete = {};
  }

  getPath() {
    const href = window.location.href;
    return href
      .split("#")
      .splice(1, 2)
      .join("/");
  }

  loadCurrentScreenAnimation() {
    const loadAnimation = () => {
      this.isAnimationComplete[`${currentPage}`] = true;
      this.emit("loadAnimation", currentPage);
    };
    const loadAboutScreenAnimation = () => {
      this.isAnimationComplete[`${currentPage}`] = true;
      this.emit("loadAboutAnimation", currentPage);
    };

    const currentPage = this.getPath();

    if (currentPage === "main") {
      return;
    } else if (this.isAnimationComplete[`${currentPage}`]) {
      return;
    } else if (currentPage === "about-products" || currentPage === "footer") {
      loadAboutScreenAnimation();
    } else {
      loadAnimation();
    }
  }
}
