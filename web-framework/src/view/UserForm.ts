import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  public eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
      "mouseenter:h1": this.onHeaderHover,
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
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

  public onSaveClick = (): void => {
    this.model.save();
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
           <input placeholder="${this.model.get("name")}"/>
          <button class='set-name'>Set name</button>     
           <button class='set-age'>Set random age</button> 
            <button class="save-model"> Save User </button>  
           </div>
        `;
  }
}
