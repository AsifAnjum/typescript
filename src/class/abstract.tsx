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
}

class ItDepartment extends Department {
  protected holidays: Holidays = [];
  constructor() {
    super("IT Dept");
  }
}

class AdminDepartment extends Department {
  protected holidays: Holidays = [];

  constructor() {
    super("Admin Dept");
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
