import { User } from "../models/User";

export class UserForm {
  constructor(
    public parent: Element,
    public model: User,
  ) {
    this.bindModel();
  }

  public bindModel(): void {
    this.model.on("change", () => this.render());
  }

  public eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
      "mouseenter:h1": this.onHeaderHover,
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
    };
  }

  public onButtonClick(): void {
    console.log("hi there");
  }

  public onHeaderHover(): void {
    console.log("H1 was hovered over");
  }

  public onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  public onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");

    if (input) {
      const value = input.value;
      this.model.set({ name: value });
    }
  };

  public template(): string {
    return `
           <div>
           <h1> User Form </h1>
           <h1 >User Name:${this.model.get("name") ?? "GUEST"}</h1> 
           <h1 >User Age:${this.model.get("age") ?? 0}</h1>         
           <input>
          <button class='set-name'>Set name</button>     
           <button class='set-age'>Set random age</button>     
           </div>
        `;
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

  public render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
