class Counter {
  static count = 0;

  static increment() {
    this.count++;
  }
}

Counter.increment();
console.log(Counter.count);

const counter = new Counter();
