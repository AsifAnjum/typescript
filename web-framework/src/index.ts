import { User } from './models/User';

const user = new User({ id: "-EC6Qoym-NU" })


const userData = user.sync.fetch(user.atrributes.get('id')!)

console.log(userData.then((res) => console.log(res.data)))
