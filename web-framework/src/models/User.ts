import { APISync } from "./APISync";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Model } from "./Model";

export interface UserProps {
    id?: string;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User (
        new Attributes<UserProps>(attrs),
        new APISync<UserProps>(rootUrl),
        new Eventing(),
    )
  }
   
  public isAdminUser(): boolean {
     return this.get('id') === 'U9-Mo-Za-ro'
  }
}

