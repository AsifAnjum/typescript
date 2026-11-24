@classDecorator
class Boat {
  @testDecorator
  public color: string = "red";

  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }

  @logError("Pilot was called but boat sank")
  public pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean,
  ): void {
    if (speed === "fast") {
      console.log("Swish!");
    } else if (speed === "medium") {
      console.log("We're coasting!");
    } else {
      throw new Error("Byebye");
    }
  }
}

function logError(message: string) {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
  ): void {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        method.apply(this, args);
      } catch (e: any) {
        console.log(
          "Oops, boat was sunk\n",
          `Error from original method: ${e.message}\n`,
          `Error message from decorator: ${message}`,
        );
      }
    };
  };
}

function testDecorator(target: any, key: string) {
  console.log(`Target: ${target}`);
  console.log(`Key: ${key}`);
  console.log(target[key]);
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

new Boat().pilot("fast", true);

console.log("----------Decorators End--------");

//---------- Metadata ----------------\\
import "reflect-metadata";

// const plane = {
//   color: "red",
// };

// Reflect.defineMetadata("note", "hi there", plane);
// Reflect.defineMetadata("height", 10, plane);

// const note = Reflect.getMetadata("note", plane);
// const height = Reflect.getMetadata("height", plane);

// console.log(plane);
// console.log(note);
// console.log(height);

// Reflect.defineMetadata("note", "hi there", plane, "color");

// const note = Reflect.getMetadata("note", plane, "color");

// console.log(note);

@printMetadata
class Plane {
  public color: string = "red";

  @get("/fly")
  @markFunction("new secret")
  public fly(): void {
    console.log("vrrrrrr");
  }
}

function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    // console.log("Target Constructor Name:", target.constructor.name);

    // console.log(
    //   "Is target its prototype?:",
    //   target.constructor.prototype === target,
    // );
    Reflect.defineMetadata("secret", secretInfo, target, key);
  };
}

const secret = Reflect.getMetadata("secret", Plane.prototype, "fly");

console.log(secret);

function get(path: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata("path", path, target, key);
  };
}

function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    console.log(path);
  }
}
