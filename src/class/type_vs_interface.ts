//? Type vs interface

/**
 * ================================
 * Type vs Interface (TypeScript)
 * ================================
 *
 * 1️⃣ type
 * --------------------------------
 * - Used to define aliases for:
 *   • object shapes
 *   • union types (A | B)
 *   • intersection types (A & B)
 *   • tuples, primitives, function types
 *
 * - Cannot be re-declared or merged
 * - Very flexible for complex type compositions
 *
 * Example in this file:
 * - User & AdminUser → intersection type
 * - User | AdminUser → union type
 * - ResponseTuple → tuple type
 *
 *
 * 2️⃣ interface
 * --------------------------------
 * - Primarily used to describe the shape of objects
 * - Supports declaration merging
 *   (multiple interfaces with the same name are combined)
 * - Commonly used for class contracts and public APIs
 *
 * Example in this file:
 * - Person interface is merged (name + lastName)
 * - Human class implements multiple interfaces
 *
 *
 * 3️⃣ Key Differences
 * --------------------------------
 * | Feature                | type            | interface        |
 * |-----------------------|-----------------|------------------|
 * | Declaration merging   | ❌ No           | ✅ Yes           |
 * | Union / Intersection  | ✅ Yes          | ❌ No            |
 * | Implements in class   | ❌ No           | ✅ Yes           |
 * | Extends               | ✅ (via &)      | ✅ (extends)     |
 *
 *
 * 4️⃣ When to use what?
 * --------------------------------
 * - Use `type` when:
 *   ✔ You need unions, intersections, or tuples
 *   ✔ You are composing complex types
 *
 * - Use `interface` when:
 *   ✔ Defining object shapes
 *   ✔ Working with classes
 *   ✔ Designing public APIs or libraries
 *
 * 👉 Rule of thumb:
 *    "Use interface for objects, type for everything else"
 */

type User = {
  name: string;
};

type AdminUser = {
  isAdmin: boolean;
};

//intersection type
const userAdmin: User & AdminUser = {
  name: "Asif",
  isAdmin: true,
};

// union type
const userOrAdmin: User | AdminUser = {
  name: "Anjum",
};

type ResponseTuple = [string, number];

interface Person {
  name: string;
}

interface Person {
  lastName: string;
}

interface MiddleName {
  middleName: string;
}

class Human implements Person, MiddleName {
  constructor(
    public name: string,
    public lastName: string,
    public middleName: string,
  ) {}
}

const person: Person = {
  name: "Asif",
  lastName: "Rabi",
};

const notAlien = new Human("Asif", "Rabi", "Rabi");

console.log(person);
console.log(notAlien);
console.log(userAdmin);
console.log(userOrAdmin);
