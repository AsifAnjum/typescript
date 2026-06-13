/**
 * =====================================
 * Abstract Class vs Interface (TS)
 * =====================================
 *
 * 1️⃣ Abstract Class
 * -------------------------------------
 * - Can contain:
 *   • abstract members (must be implemented by subclasses)
 *   • concrete methods (with implementation)
 *   • access modifiers (public, protected, private)
 *   • static methods and properties
 *
 * - Used when classes share:
 *   ✔ common behavior (method logic)
 *   ✔ common base functionality
 *
 * Example in this file:
 * - `Person` provides a concrete `greeting()` method
 * - `RegisteredPerson` inherits both data and behavior
 *
 *
 * 2️⃣ Interface
 * -------------------------------------
 * - Describes a contract (shape only)
 * - Contains no implementation
 * - Supports multiple implementations
 * - Can be implemented by classes and extended by other interfaces
 *
 * - Cannot contain:
 *   ❌ method logic
 *   ❌ constructors
 *   ❌ static implementations
 *
 * Example in this file:
 * - `User` defines required properties
 * - `Greeting` defines required behavior
 * - `RegisteredUser` must implement everything itself
 *
 *
 * 3️⃣ Key Differences
 * -------------------------------------
 * | Feature              | Abstract Class | Interface |
 * |---------------------|---------------|-----------|
 * | Method implementation | ✅ Yes        | ❌ No     |
 * | Multiple inheritance | ❌ No         | ✅ Yes    |
 * | Access modifiers     | ✅ Yes        | ❌ No     |
 * | Constructors         | ✅ Yes        | ❌ No     |
 * | Static members       | ✅ Yes        | ❌ No     |
 *
 *
 * 4️⃣ When to use what?
 * -------------------------------------
 * - Use **abstract class** when:
 *   ✔ You want to share behavior
 *   ✔ You need base functionality
 *   ✔ You control the class hierarchy
 *
 * - Use **interface** when:
 *   ✔ You want to define a contract
 *   ✔ You need multiple inheritance
 *   ✔ You are designing APIs or libraries
 *
 * 👉 Rule of thumb:
 *    "Abstract class = WHAT + HOW"
 *    "Interface = WHAT only"
 */

abstract class Person {
  public abstract name: string;
  public abstract email: string;
  public abstract phone: string;

  public greeting() {
    console.log(`Hello ${this.name}`);
  }

  public static nameClass() {
    return "class name is Person";
  }
}

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Greeting {
  greeting(): void;
}

class RegisteredPerson extends Person {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
  ) {
    super();
  }
}

class RegisteredUser implements User, Greeting {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
  ) {}
  public greeting(): void {
    console.log(`Hello ${this.name}`);
  }
}

const person = new RegisteredPerson("Asif", "a@gmail.com", "013434");

person.greeting();
