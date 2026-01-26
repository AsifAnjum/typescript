class User {
  constructor(
    public name: string,
    public readonly email: string,
    protected phone: string,
    private readonly salary: number,
    public lastName?: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.salary = salary;
    if (lastName !== undefined) {
      this.lastName = lastName;
    }
  }

  public greet(): string {
    return `Hello ${this.name}`;
  }

  public getSalary() {
    return this.salary;
  }
}

const user1 = new User("Asif", "a@gmail.com", "013843434", 3000);

user1.lastName = "Rabi";

class Admin extends User {
  public isAdmin: boolean = true;

  constructor(
    name: string,
    email: string,
    phone: string,
    salary: number,
    public usersReporting: number,
    lastName?: string,
  ) {
    super(name, email, phone, salary, lastName);
    this.usersReporting = usersReporting;
  }

  public printName() {
    console.log(`Admin User: ${this.name}`);
  }

  public printPhoneNumber() {
    console.log(`Admin Phone Number:-> ${this.phone}`);
  }

  public printSalary() {
    console.log(`Admin Salary : ${this.getSalary()}`);
  }

  public greet(): string {
    return `Hello ${this.name}! I am admin`;
  }
}

const admin1 = new Admin("Anjum", "an@gmail.com", "0183434", 30000, 10);
console.log(user1);
console.log(admin1);
admin1.printName();
admin1.printPhoneNumber();
admin1.printSalary();

console.log(user1.greet());
console.log(admin1.greet());
class Book {
  title: string;
  author: string;
  yearPublished?: number;
  readonly ISBN: string;

  constructor(
    title: string,
    author: string,
    ISBN: string,
    yearPublished?: number,
  ) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;

    if (yearPublished) {
      this.yearPublished = yearPublished;
    }
  }
}

const book1 = new Book("book1", "Asif", "#1F331", 2026);

function logBookDetails(book: Book): void {
  console.log(`Title: ${book.title}-${book.author}`);
}

logBookDetails(book1);

class EBook extends Book {
  fileSize: number;
  format: string;

  constructor(
    title: string,
    author: string,
    ISBN: string,
    fileSize: number,
    format: string,
    yearPublished?: number,
  ) {
    super(title, author, ISBN, yearPublished);
    this.fileSize = fileSize;
    this.format = format;
  }
}

const newEbook = new EBook("test ebook", "Rabi", "3223422", 2, "PDF", 2026);

logBookDetails(newEbook);
