enum Roles {
  admin = "admin",
  author = "author",
  editor = "editor",
}

interface Role {
  role: Roles;
}

enum PermissionList {
  read = "read",
  write = "write",
  execute = "execute",
}

interface UserPermissions {
  permissions: PermissionList[];
}

interface User {
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female";
}

interface AdminUser extends User, Role, UserPermissions {
  numberOfUsersReporting: number;
}

interface UserWithAddress extends User {
  address: string;
}

const user: User = {
  name: "Asif",
  email: "a@gmail.com",
  phone: "013434",
  gender: "male",
};

const userWithAddress: UserWithAddress = {
  name: "rabi",
  email: "adf@g.com",
  phone: "013434",
  gender: "male",
  address: "ctg",
};

const sigma: AdminUser = {
  name: "Venom",
  email: "xx@g.com",
  phone: "013434311",
  gender: "male",
  role: Roles.admin,
  permissions: [
    PermissionList.execute,
    PermissionList.read,
    PermissionList.write,
  ],
  numberOfUsersReporting: 30,
};

console.log(user);
console.log(userWithAddress);

console.log(sigma);
