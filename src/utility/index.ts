type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Exclude<T, U> = T extends U ? never : T;

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

type AwaitedType = Awaited<typeof promise>;

type Roles = "author" | "editor" | "researcher";

interface User {
  name: string;
  email: string;
  age: number;
}

interface Article {
  title: string;
  content: string;
  contributors: Record<Roles, User>;
}

const article: Article = {
  title: "TypeScript Utility Types",
  content: "An overview of TypeScript utility types.",
  contributors: {
    author: { name: "Alice", email: "alice@example.com", age: 30 },
    editor: { name: "Bob", email: "bob@example.com", age: 25 },
    researcher: { name: "Charlie", email: "charlie@example.com", age: 40 },
  },
};

interface Person {
  name: string;
  age: number;
  address: string;
}

type NameAndAge = Pick<Person, "name" | "age">;

const person: NameAndAge = {
  name: "David",
  age: 28,
};

interface User1 {
  name: string;
  age: number;
  email: string;
  password: string;
}

type LimitedUser = Omit<User1, "password" | "age">;

const user1: LimitedUser = {
  name: "Eve",

  email: "eve@example.com",
};

type city = "new york" | "los angeles" | "chicago";

type UppercaseCity = Uppercase<city>;
type LowerCaseCity = Lowercase<city>;
type CapitalizeCity = Capitalize<city>;
type UnCapitalizeCity = Uncapitalize<city>;

//! satisfy

type Properties = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const color:  = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [255, 255, 0],
} satisfies Record<Properties, RGB | string>
const redComponent = color.red[0];

if (typeof color.green === "string") {
  const greenValue = color.green.toUpperCase();
}

const greenValue = color.green.toUpperCase();

const blueComponent = color.blue.toUpperCase()