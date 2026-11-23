import { HasID, Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasID> {
  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T,
  ) {
    this.bindModel();
  }

  abstract template(): string;

  public regionsMap(): { [key: string]: string } {
    return {};
  }

  public eventsMap(): { [key: string]: () => void } {
    return {};
  }

  public bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  public bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  public mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  public onRender(): void {}

  public render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
