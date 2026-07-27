import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    set(value: T): void;
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
}

interface Sync<T> {
    fetch(id:string): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventNamt: string, callback: () => void): void;
    trigger(eventName: string): void;
}


interface HasID {
    id?: string;
}

export class Model<T extends HasID> {
   constructor(
        private attributes: ModelAttributes<T>,
        private sync: Sync<T>,
        private events: Events
   ){}
    
    public get on() {
        return this.events.on
    }

    public get trigger() {
        return this.events.trigger;
    }

    public get get() {
        return this.attributes.get;
    }

    public set(update: T) : void {
        this.attributes.set(update);
        this.trigger('change');
    }

    public fetch(): void {
        const id = this.get('id');

        if (typeof id !== 'string') {
            throw new Error('User must have an id to fetch');
        }

       this.sync.fetch(id).then((response: AxiosResponse): void => {
         this.set(response.data);
       })
    }

    public save(): void {
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save');
            }).catch((): void => {
                this.trigger('error');
            })
    }
}