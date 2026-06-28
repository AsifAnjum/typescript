interface UserProps {
    name?: string;
    age?: number;
}

export class User {
    constructor(private data: UserProps) { }

    get(propertyName: keyof UserProps): UserProps[keyof UserProps] {
        return this.data[propertyName];
    }

    set(updateProperties: UserProps): void {
        Object.assign(this.data, updateProperties);
    }

}