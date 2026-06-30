import axios, { AxiosResponse } from "axios";

export class Sync {
    
    public fetch():void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
        .then((response:AxiosResponse):void => {
            this.set(response.data)
        })
    }

    public save():void {
        const id = this.get('id');
        const url = `http://localhost:3000/users`;
        
        if(id){
          axios.put(`${url}/${id}`, this.data);
        } else {
            axios.post(url, this.data)
        }
    }
}