function methodLogger<This, Args extends any[], Return>(logPrefix: string) {
  return function (
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    return function (this: This, ...args: Args): Return {
      console.log(`${logPrefix} Invocation started ...`);

      const result = originalMethod.call(this, ...args);

      console.log(`${logPrefix} Invocation ended.`);
      return result;
    };
  };
}

function bound(_target: Function, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  if (context.private) {
    throw new Error("Cannot decorate private property");
  }

  context.addInitializer(function (this: any) {
    this[methodName] = this[methodName].bind(this);
  });
}

class Person {
  constructor(public name: string) {}

  @bound
  @methodLogger<Person, [string], void>("LOG:")
  public greet(greetings: string) {
    console.dir(this);
    console.log(`${greetings}, ${this.name}`);
  }
}

const person = new Person("Alice");
person.greet("Hello");

const greet = person.greet;

greet("Hola "); // 'this' is lost here

type Post = {
  title: string;
  content: string;
};

console.log(`Author Class`);

function addDefaultPost<This, Value extends Post[]>(
  target: undefined,
  context: ClassFieldDecoratorContext<This, Value>,
) {
  return function (initialValue: Value) {
    initialValue.push({
      title: "Default Post",
      content: "This is a default post",
    });

    return initialValue;
  };
}

function addGreetMethod<T extends new (...args: any[]) => GreetAble>(
  target: T,
  context: ClassDecoratorContext<T>,
) {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      this.greet = (greetings: string) => {
        console.log(`${greetings}, ${this.name}! Have a great day.`);
      };
    }
  };
}

class GreetAble {
  constructor(public name: string) {}

  greet: (greetings: string) => void = () => {};
}

@addGreetMethod
class Author extends GreetAble {
  @addDefaultPost
  public posts: Post[] = [];
  constructor(public name: string) {
    super(name);
  }
}

const author = new Author("Asif");

console.log(author.posts);

author.greet("Hola");
