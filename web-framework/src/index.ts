import { User } from "./models/User";

const user = User.buildUser({
 id: 'yUvBXfsJx2U'
})

user.on('change', ()=> {
    console.log(user);
    
})

user.fetch()