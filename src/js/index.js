import Model from "./model";
import View from "./view";
import Animation from "./animations";
import Controller from "./controller";

const model = new Model();
const view = new View();
new Animation();
new Controller(model, view);
