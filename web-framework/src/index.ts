import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserForm } from "./view/UserForm";

//  const collection = new Collection<User, UserProps>('http://localhost:3000/users', (json:UserProps) => User.buildUser(json));

//  collection.on('change', () => {
//     console.log(collection.models)
//  });

// collection.fetch()

const user = User.buildUser({ name: "NAME", age: 20 });

const root = document.getElementById("root");

if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error("Root element not found");
}
