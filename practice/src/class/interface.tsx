interface User {
  userName: string;
  email: string;
  login(): void;
}

class Admin implements User {
  constructor(
    public userName: string,
    public email: string,
    public adminLevel: number,
  ) {}

  public login(): void {
    console.log("Admin is now logged in");
  }
}

class Customer implements User {
  constructor(
    public userName: string,
    public email: string,
  ) {}

  public login(): void {
    console.log("Customer is now logged in");
  }
}

class Auth {
  public static login(user: User) {
    user.login();
  }
}

const admin = new Admin("Asif", "a@gmail.com", 1);
const customer = new Customer("Rabi", "r@gmail.com");

Auth.login(admin);
Auth.login(customer);

interface Person {
  name: string;
  email: string;
  age: number;
  phone?: string;
  greet?: () => void;
}

const person: Person = {
  name: "Anjum",
  email: "ab@gmail.com",
  age: 16,
};
