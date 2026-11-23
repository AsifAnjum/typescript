import { Collection } from "../models/Collection";
import { User, UserProps } from "../models/User";

export abstract class CollectionView<T, K> {
  constructor(
    public parent: Element,
    public collection: Collection<T, K>,
  ) {}

  abstract renderItem(model: T, itemParent: Element): void;

  public render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");

    for (const model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.appendChild(templateElement.content);
  }
}
