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
