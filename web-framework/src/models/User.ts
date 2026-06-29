interface UserProps {
    name?: string;
    age?: number;
}

type Callback = () => void

export class User {
    public events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) { }

    get(propertyName: keyof UserProps): UserProps[keyof UserProps] {
        return this.data[propertyName];
    }

    set(updateProperties: UserProps): void {
        Object.assign(this.data, updateProperties);
    }

    public on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    public trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => {
            callback();
        })
    }

}