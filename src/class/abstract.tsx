type Holidays = {
  date: Date;
  reason: string;
}[];

abstract class Department {
  protected abstract holidays: Holidays;
  protected constructor(protected name: string) {}

  public addHolidays(holidays: Holidays) {
    if (Array.isArray(holidays)) {
      for (const holiday of holidays) {
        this.holidays.push(holiday);
      }
    }
  }

  public abstract printHolidays(): void;
}

class ItDepartment extends Department {
  protected holidays: Holidays = [];
  constructor() {
    super("IT Dept");
  }
  public printHolidays(): void {
    if (this.holidays.length == 0) {
      console.log("There are no holidays");
      return;
    }

    console.log(`Here is the list of holidays for ${this.name}`);

    this.holidays.forEach(
      (holiday: { date: Date; reason: string }, index: number) => {
        console.log(`${index + 1}: ${holiday.reason}, ${holiday.date}`);
      },
    );
  }
}

class AdminDepartment extends Department {
  protected holidays: Holidays = [];

  constructor() {
    super("Admin Dept");
  }
  public printHolidays(): void {
    if (this.holidays.length == 0) {
      console.log("There are no holidays");
      return;
    }

    console.log(`Here is the list of holidays for ${this.name}`);

    this.holidays.forEach(
      (holiday: { date: Date; reason: string }, index: number) => {
        console.log(`${index + 1}: ${holiday.reason}, ${holiday.date}`);
      },
    );
  }
}

const itHolidays: Holidays = [
  {
    date: new Date(2022, 2, 14),
    reason: "Valentines Day",
  },
  {
    date: new Date(2024, 4, 14),
    reason: "Bangla nobo borsho",
  },
];

const adminHolidays: Holidays = [
  {
    date: new Date(2022, 2, 14),
    reason: "Valentines Day",
  },
  {
    date: new Date(2024, 4, 14),
    reason: "Bangla nobo borsho",
  },
  {
    date: new Date(2024, 3, 2),
    reason: "Admin Day",
  },
];

const itDept = new ItDepartment();
const adminDept = new AdminDepartment();

itDept.addHolidays(itHolidays);
adminDept.addHolidays(adminHolidays);

console.log(itDept);
console.log(adminDept);

itDept.printHolidays();
adminDept.printHolidays();
