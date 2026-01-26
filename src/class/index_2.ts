class Person {
  private _age?: number;
  constructor(
    public firstName: string,
    public lastName: string,
  ) {}

  public set age(age: number) {
    if (age > 200 || age < 0) {
      throw new Error("This age must be within the age range 0-200");
    }
    this._age = age;
  }

  public get age() {
    if (this._age === undefined) {
      throw new Error("Age is not set");
    }
    return this._age;
  }

  public get getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const john: Person = new Person("John", "Doe");
const mark: Person = new Person("Mark", "Doe");

john.age = 30;

console.log(john.age);

console.log(john.getFullName);
