class User {
  constructor(public name: string) {}
}

class Password {
  constructor(public password: string) {}
}

//! In TypeScript, a class can extend only one class, but it can implement many interfaces.

// class RegisteredUser extends User, Password{}

enum AutomobileTypes {
  car = "car",
  bike = "bike",
  bus = "bus",
  truck = "truck",
  van = "van",
  helicopter = "helicopter",
  plane = "plane",
  boat = "boat",
}

enum AutomobileBrands {
  Toyota = "Toyota",
  Honda = "Honda",
  Ford = "Ford",
  Chevrolet = "Chevrolet",
  Nissan = "Nissan",
  BMW = "BMW",
  Mercedes = "Mercedes",
  Audi = "Audi",
  Volkswagen = "Volkswagen",
  ferrari = "ferrari",
  lamborghini = "lamborghini",
  bugatti = "bugatti",
}

enum AutomobileColors {
  red = "red",
  blue = "blue",
  green = "green",
  yellow = "yellow",
  black = "black",
  white = "white",
  silver = "silver",
  gray = "gray",
  brown = "brown",
  pink = "pink",
  orange = "orange",
  purple = "purple",
  gold = "gold",
  bronze = "bronze",
}

interface Automobile<Type, Brand, Colors> {
  type: Type;
  brand: Brand;
  colors: Colors[];
  description: string;
}

const ferrari: Automobile<AutomobileTypes, AutomobileBrands, AutomobileColors> =
  {
    type: AutomobileTypes.car,
    brand: AutomobileBrands.ferrari,
    colors: [
      AutomobileColors.red,
      AutomobileColors.blue,
      AutomobileColors.green,
    ],
    description: "Ferrari is a brand of Italian luxury sports cars.",
  };

const honda: Automobile<AutomobileTypes, AutomobileBrands, AutomobileColors> = {
  type: AutomobileTypes.car,
  brand: AutomobileBrands.Honda,
  colors: [
    AutomobileColors.purple,
    AutomobileColors.black,
    AutomobileColors.white,
  ],
  description: "Honda is a Japanese multinational automobile manufacturer.",
};

class Car implements Automobile<
  AutomobileTypes,
  AutomobileBrands,
  AutomobileColors
> {
  public type: AutomobileTypes = AutomobileTypes.car;
  constructor(
    public brand: AutomobileBrands,
    public colors: AutomobileColors[],
    public description: string,
  ) {}
}

interface CommercialVehicle {
  capacity: string;
  licenseRenewalDate: Date;
}

class Truck
  implements
    Automobile<string, AutomobileBrands, AutomobileColors>,
    CommercialVehicle
{
  public type: AutomobileTypes = AutomobileTypes.truck;
  constructor(
    public brand: AutomobileBrands,
    public colors: AutomobileColors[],
    public description: string,
    public capacity: string,
    public licenseRenewalDate: Date,
  ) {}
}
const mercedes = new Car(
  AutomobileBrands.Mercedes,
  [AutomobileColors.black, AutomobileColors.white, AutomobileColors.silver],
  "Mercedes is a German luxury sports car manufacturer.",
);

console.log(ferrari);
console.log(honda);
console.log(mercedes);

const volvo = new Truck(
  AutomobileBrands.Volkswagen,
  [AutomobileColors.black, AutomobileColors.white, AutomobileColors.silver],
  "Volvo is a Swedish luxury sports car manufacturer.",
  "15 Ton",
  new Date(2023, 1, 1),
);
console.log(volvo);
