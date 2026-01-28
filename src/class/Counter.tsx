class Counter {
  static count = 0;

  static increment() {
    this.count++;
  }

  static {
    console.log("init Counter Class");
  }
}

Counter.increment();
console.log(Counter.count);

const counter = new Counter();

class Box<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
  }
}

const numberBox = new Box(123);
