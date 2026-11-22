import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
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
}
