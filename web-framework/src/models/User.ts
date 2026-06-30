import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

interface UserProps {
    id?: string;
    name?: string;
    age?: number;
}



export class User { 

    public events: Eventing = new Eventing(); 

    constructor(private data: UserProps) { }

    get(propertyName: keyof UserProps): UserProps[keyof UserProps] {
        return this.data[propertyName];
    }

    set(updateProperties: UserProps): void {
        Object.assign(this.data, updateProperties);
    }




}