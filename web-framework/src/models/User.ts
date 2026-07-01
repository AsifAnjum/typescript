import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserProps {
    id?: string;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User { 
    public events: Eventing = new Eventing(); 
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public atrributes: Attributes<UserProps>;
    
    constructor(attrs: UserProps) {
        this.atrributes = new Attributes<UserProps>(attrs);
    }


}