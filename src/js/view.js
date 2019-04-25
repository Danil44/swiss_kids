import EventEmitter from "./services/event-emitter";
import Parallax from "parallax-js";

export default class View extends EventEmitter {
  constructor() {
    super();
  }

  runParallax() {
    const bottles = document.getElementById("bottles-list");
    const fruits1 = document.getElementById("fruits-1");
    const fruits2 = document.getElementById("fruits-2");
    const runBottlesParallax = new Parallax(bottles);
    const runFruits1 = new Parallax(fruits1);
    const runFruits2 = new Parallax(fruits2);
  }
}
