class Employee {
  protected id: number;
  private _salary: number = 0;

  static readonly companyName: string = "ABCD";

  constructor(
    id: number,
    public name: string,
    public age: number,
    salary: number,
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  public get salary(): number {
    return this._salary;
  }

  public set salary(salary: number) {
    if (salary < 0) {
      throw new Error("Salary must be Positive");
    }
    this._salary = salary;
  }
  public static getCompanyName(): string {
    return Employee.companyName;
  }

  public getDetails(): string {
    return `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, salary: ${this.salary}`;
  }
}

class Manager extends Employee {
  constructor(
    id: number,
    name: string,
    age: number,
    salary: number,
    public department: string,
  ) {
    super(id, name, age, salary);
  }

  public getDetails(): string {
    return `${super.getDetails()}, Department: ${this.department}`;
  }
}

const employee1 = new Employee(1, "Asif", 22, 33);
console.log(employee1.salary);
const manager1 = new Manager(2, "Asif", 22, 33000, "HR");
console.log(employee1.getDetails());
console.log(manager1.getDetails());
