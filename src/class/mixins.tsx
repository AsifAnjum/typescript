type Constructor = new (...args: any[]) => {};

function TimeStamp<T extends Constructor>(Base: T) {
  return class extends Base {
    protected timestamp: Date = new Date();

    getTimestamp() {
      return this.timestamp;
    }
  };
}

class User {
  constructor(public name: string) {}
}

class UserWithTimestamp extends TimeStamp(User) {
  constructor(
    name: string,
    public age: number,
  ) {
    super(name);
  }

  public displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
    console.log(`Timestamp ${this.getTimestamp()}`);
  }
}

const user = new UserWithTimestamp("Asif", 16);

user.displayInfo();
