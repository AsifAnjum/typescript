import { User } from './models/User';

const user = new User({ id: "-EC6Qoym-NU" })

console.log("Before Fetch");

user.events.on('change', () => {
    console.log("User has changed!!!");
})

user.events.trigger('change');


user.fetch()


user.set({name: 'New Name', age: 999})

user.save()

setTimeout(() => console.log(user),100)
