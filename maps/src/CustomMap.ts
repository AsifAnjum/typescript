import { Company } from "./Company";
import { User } from "./User";


export interface Mappable {
    location: {
        lat: number;
        lng: number;
    };
    markerContent(): string;
    color: string;
}

export class CustomMap {
    private googleMap: google.maps.Map;
    constructor(divId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement,{
            zoom:1,
            center: {
                lat: 0,
                lng: 0
            }
        })
    }

   public addMarker(mappable:Mappable):void{
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            },
            icon: {
                url: `http://maps.google.com/mapfiles/ms/icons/${mappable.color}-dot.png`
            }
           
        })
        marker.addListener('click',()=> {
            const infoWindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            });

            infoWindow.open(this.googleMap,marker)
        })
    }

//    public addCompanyMarker(company: Company):void{
//         new google.maps.Marker({
//             map: this.googleMap,
//             position: {
//                 lat: company.location.lat,
//                 lng: company.location.lng
//             }
//         })
//     }
}