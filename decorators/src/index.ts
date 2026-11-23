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

    descriptor.value = function () {
      try {
        method();
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

new Boat().pilot("fast", true);
