import faker from 'faker';
import { Mappable } from './CustomMap';

export class Company implements Mappable {
    companyName: string;
    catchPhrase: string;
    location: {
        lat:number;
        lng: number
    }
    color: string;

    constructor(){
        this.companyName = faker.company.companyName();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
        this.color = 'blue';
    }

    markerContent(): string {
        return `
        <div>
            <h1>Company Name: ${this.companyName}</h1>
            <p style="font-weight: 400;">Catch Phrase: ${this.catchPhrase}</p>
        </div>
        `;
    }
}