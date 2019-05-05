import EventEmitter from "./services/event-emitter";

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.page = null;
    this.isCalcivitAnimated = false;
    this.isMultivitAnimated = false;
    this.isImmunovitAnimated = false;
    this.isSmartvitAnimated = false;
  }

  getCurrentPath() {
    const href = window.location.href;
    const currentPage = href
      .split("/")
      .splice(3, 4)
      .join("/");
    if (currentPage === "#page-2" && !this.isCalcivitAnimated) {
      this.page = "calcivit";
      this.isCalcivitAnimated = true;
      this.emit("loadAnimation", this.page);
    }
    if (currentPage === "#page-3" && !this.isMultivitAnimated) {
      this.page = "multivit";
      this.isMultivitAnimated = true;
      this.emit("loadAnimation", this.page);
    }
    if (currentPage === "#page-4" && !this.isImmunovitAnimated) {
      this.page = "immunovit";
      this.isImmunovitAnimated = true;
      this.emit("loadAnimation", this.page);
    }
    if (currentPage === "#page-5" && !this.isSmartvitAnimated) {
      this.page = "smartvit";
      this.isSmartvitAnimated = true;
      this.emit("loadAnimation", this.page);
    }
  }
}
