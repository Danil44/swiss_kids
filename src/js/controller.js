import EventEmitter from "./services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.view = view;
    this.model = model;
    this.view.onPageLoad();
  }
}
