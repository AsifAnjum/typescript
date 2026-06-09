import "reflect-metadata";

// class decorator
const METADATA_KEY = {
  TABLE: Symbol("table"),
  INJECTABLE: Symbol("injectable"),
  SINGLETON: Symbol("singleton"),

}

function Entity(tableName: string) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(METADATA_KEY.TABLE, tableName, constructor);

    return class extends constructor {
      readonly _tableName = tableName;
      readonly _createdAt = new Date().toISOString();
    }
  }
}

function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: InstanceType<T> | null = null
  const SingletonClass = class extends constructor {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this as any;
    }
  }

  Object.defineProperty(SingletonClass, 'instance', {
    value: constructor.name
  })

  return SingletonClass;
}


function Timestamped<T extends { new(...args: any[]): {} }>(Base: T) {

  return class extends Base {
    createdAt = new Date()
    private _updatedAt = new Date()

    get updatedAt() {
      return this._updatedAt
    }

    touch() {
      this._updatedAt = new Date();
      return this;
    }
  }
}

@Entity('employees')
@Timestamped
class Employee {
  constructor(
    public id: string,
    public name: string,
    public role: "ADMIN" | "USER"
  ) { }
}

@Singleton
class DataBaseConnection {
  private static count = 0;
  readonly connectionId: number;

  constructor(public url: string) {
    DataBaseConnection.count++;
    this.connectionId = DataBaseConnection.count;
    console.log(`Database connected to ${url} with ID ${this.connectionId}`);
  }
}


const emp = new Employee("e-001", "Asif", "ADMIN")
console.log((emp as any)._tableName);
console.log((emp as any)._createdAt);
(emp as any).touch();
console.log((emp as any).updatedAt);

const db1 = new DataBaseConnection("localhost:5432");
const db2 = new DataBaseConnection("localhost:5432");
console.log(db1 === db2);
console.log(db1.connectionId)
console.log(db2.connectionId)


//read meta data
const table = Reflect.getMetadata(METADATA_KEY.TABLE, Employee);
console.log(table);


//method decorator


let currentUser = {
  name: "Asif",
  role: "User"
}
// Authorization
function RolesAllowed(...roles: string[]) {
  return function (target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!roles.includes(currentUser.role)) {
        throw new Error(
          `🚫 Access Denied: '${currentUser.role}' role cannot call '${String(propertyKey)}'. Requires: ${roles.join(", ")}`
        )
      }
      return originalMethod.apply(this, args)
    }


    return descriptor;
  }
}

// Cache -- @Memoization
function Cache(ttlMs = 5000) {
  return function (
    target: any,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {

    const originalMethod = descriptor.value;
    const cacheMap = new Map<string, { value: any, expiresAt: number }>

    descriptor.value = async function (...args: any[]) {
      const cacheKey = JSON.stringify(args);
      const cached = cacheMap.get(cacheKey);

      if (cached && Date.now() < cached.expiresAt) {
        console.log(`[Cache HIT] ${String(propertyKey)}(${cacheKey})`);
        return cached.value
      }

      console.log(`[Cache MISS] ${String(propertyKey)}(${cacheKey}) — fetching...`);
      const result = await originalMethod.apply(this, args)

      cacheMap.set(cacheKey, { value: result, expiresAt: Date.now() + ttlMs });
      return result
    }

    return descriptor
  }
}


//Retry- Reslience
function Retry(maxAttempts = 3, delayMs = 1000) {
  return function (target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error | undefined;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await originalMethod.apply(this, args)
        } catch (err) {
          lastError = err as Error;
          console.warn(
            `[Retry] '${String(propertyKey)}' attempt ${attempt}/${maxAttempts} failed: ${lastError.message}`
          );

          if (attempt < maxAttempts) {
            const delay = delayMs * attempt
            console.log(`Retrying in ${delay}ms...`);
            await new Promise((r) => setTimeout(r, delay));
          }
        }
      }

      throw new Error(`Max retry attempts (${maxAttempts}) reached for '${String(propertyKey)}'. Last error: ${lastError?.message}`);
    }

    return descriptor
  }
}


// MeasureTime - Performance
function MeasureTime(target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const startTime = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`[Performance] '${String(propertyKey)}' took ${end - startTime} ms`);
    return result;
  }

  return descriptor
}

// Employee Service
class EmployeeService {
  private db = new Map([
    ["e-001", {
      id: "e-001",
      name: "Asif",
      salary: 100000
    }],
    ["e-002", {
      id: "e-002",
      name: "Rehan",
      salary: 70000
    }]
  ])

  @Cache(3000)
  @MeasureTime
  async findById(id: string) {
    // db call simulate
    await new Promise(r => setTimeout(r, 200));
    const emp = this.db.get(id);
    if (!emp) throw new Error(`Employee ${id} not found`)

    console.table(emp);

    return emp;
  }

  @RolesAllowed("Admin", "HR")
  async updateSalary(employeeId: string, newSalary: number): Promise<void> {
    const emp = this.db.get(employeeId);
    if (!emp) throw new Error("Employee not found");
    emp.salary = newSalary;
    console.log(`Updated salary for ${emp.name} to ${newSalary}`);
    return;
  }

  @Retry(3, 500)
  @MeasureTime
  async fetchFromExternalAPI(url: string): Promise<string> {
    // Simulate flaky external API
    if (Math.random() < 0.6) throw new Error("Network timeout");
    return `Data from ${url}`;
  }
}



const service = new EmployeeService();

//cache test
await service.findById("e-001");
await service.findById("e-001")


// auth test
try {
  await service.updateSalary("e-001", 200000);
} catch (error) {
  console.log((error as Error).message);
}

currentUser.role = "Admin";

await service.updateSalary("e-001", 200000);

//Retry test 
await service.fetchFromExternalAPI("https://api.example.com");



//? Property Decorator

// IsEmail Validation
function isEmail<T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  const shadowKey = `_${String(propertyKey)}` as keyof T;

  Object.defineProperty(target, propertyKey, {
    get(this: T) {
      return this[shadowKey]
    },
    set(this: T, newValue: unknown) {
      if (typeof newValue === "string" && newValue && !emailRegex.test(newValue)) {
        throw new TypeError(
          `❌ Invalid email: "${newValue}" — ${String(propertyKey)} must be a valid email`
        );
      }
      this[shadowKey] = newValue as T[typeof shadowKey];
    },
    enumerable: true,
    configurable: true
  })
}

// MinLength / MaxLength 
function MinLength(min: number) {
  return function <T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
    const shadowKey = `_${String(propertyKey)}` as keyof T;
    Object.defineProperty(target, propertyKey, {
      get() {
        return this[shadowKey]
      },
      set(val: string) {
        if (typeof val === 'string' && val.length < min) {
          throw new RangeError(
            `❌ '${String(propertyKey)}' must be at least ${min} chars (got ${val.length})`
          )
        }
        this[shadowKey] = val
      },
      enumerable: true,
      configurable: true
    })
  }
}

function MaxLength(max: number) {
  return function <T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
    const shadowKey = `_${String(propertyKey)}` as keyof T;
    Object.defineProperty(target, propertyKey, {
      get(this: T) {
        return this[shadowKey];
      },
      set(this: T, value: unknown) {
        if (typeof value === 'string' && value.length > max) {
          throw new RangeError(
            `❌ '${String(propertyKey)}' must be at least ${max} chars (got ${value.length})`
          )
        }
        this[shadowKey] = value as T[typeof shadowKey];
      },
      enumerable: true,
      configurable: true
    })
  }
}


// Immutable -- readonly 
function Immutable(target: any, propertyKey: string) {
  let value: any;
  let isSet = false;

  Object.defineProperty(target, propertyKey, {
    get() { return this[`_imm_${propertyKey}`]; },
    set(val: any) {
      if (this[`_imm_set_${propertyKey}`]) {
        throw new Error(
          `❌ Immutable property '${propertyKey}' cannot be reassigned`
        );
      }
      this[`_imm_${propertyKey}`] = val;
      this[`_imm_set_${propertyKey}`] = true;
    },
    enumerable: true,
    configurable: false,
  });
}

//Transform
function Trim<T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
  console.log("Trim applied to", propertyKey);
  const shadowKey = `_${String(propertyKey)}` as keyof T;
  Object.defineProperty(target, propertyKey, {
    get(this: T) {
      return this[shadowKey];
    },
    set(this: T, value: unknown) {
      console.log("SETTER CALLED", value);
      if (typeof value !== 'string') {
        throw new TypeError(`'${String(propertyKey)}' must be a string`);
      }

      this[shadowKey] = value.trim() as T[typeof shadowKey];
    },
    enumerable: true,
    configurable: true
  })
}

function ToUpperCase<T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
  const shadowKey = `_${String(propertyKey)}` as keyof T;

  Object.defineProperty(target, propertyKey, {
    get(this: T) {
      return this[shadowKey];
    },
    set(this: T, value: unknown) {
      if (typeof value !== 'string') {
        throw new TypeError(`'${String(propertyKey)}' must be a string`)
      }
      this[shadowKey] = value.toUpperCase() as T[typeof shadowKey];
    },
    enumerable: true,
    configurable: true
  })
}


function ToLowerCase<T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
  const shadowKey = `_${String(propertyKey)}` as keyof T;
  Object.defineProperty(target, propertyKey, {
    get(this: T) {
      return this[shadowKey];
    },
    set(this: T, value: unknown) {
      if (typeof value !== 'string') {
        throw new TypeError(`'${String(propertyKey)}' must be a string`)
      }
      this[shadowKey] = value.toLowerCase() as T[typeof shadowKey]
    },
    enumerable: true,
    configurable: true
  })
}

// Column (TypeOrm style)
const columnMetadata = new Map<string, Record<string, any>>();

function Column(options: { type: string; nullable?: boolean; unique?: boolean } = { type: "varchar" }) {
  return function <T extends object, K extends keyof T>(target: T, propertyKey: K & (T[K] extends string ? K : never)) {
    const className = target.constructor.name;

    if (!columnMetadata.has(className)) {
      columnMetadata.set(className, {})
    }
    columnMetadata.get(className)![String(propertyKey)] = options;
  }
}

// Enitty
class EmployeeEntity {
  @Immutable
  @Column({ type: 'varchar', unique: true })
  public id!: string;

  @Trim
  @MinLength(2)
  @MaxLength(8)
  @Column({ type: 'varchar' })
  public name!: string;

  @isEmail
  @ToLowerCase
  @Column({ type: 'varchar', unique: true })
  public email!: string;

  @ToUpperCase
  @Column({ type: "varchar" })
  public department!: string;

  constructor(id: string, name: string, email: string, department: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.department = department;
  }

}

const employee = new EmployeeEntity(
  "550e8400-e29b-41d4-a716-446655440000",
  "  Rahim  ",
  "Rahim@example.com",
  "engineering"
);

console.table(employee)
console.log('Employee Name', employee.name)
console.log('Employee Email', employee.email)
console.log('Employee Department', employee.department)

console.log(
  Object.getOwnPropertyDescriptor(
    EmployeeEntity.prototype,
    "name"
  )
);