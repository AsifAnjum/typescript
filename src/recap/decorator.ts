


function loggedMethod(headMessage = "LOG:"){
    return function actualDecorator(originalMethod: any, _context:any){
    function replacementMethod(this: any, ...args: any[]){
        console.log(`${headMessage} Entering greet method`)
        console.log(`Original method: ${originalMethod}`)
        console.log(`Context: ${JSON.stringify(_context, null, 2)}`)
        console.log(`Arguments: ${JSON.stringify(args)}`)

        console.log(`This: ${JSON.stringify(this, null, 2)}`)

        const result = originalMethod.call(this, ...args)

        console.log(`${headMessage} Exiting greet method`)

        return result
    }
    return replacementMethod
}
}

function bound<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = context.name;
    
    if (context.private) {
        throw new Error(`'bound' cannot decorate private properties like ${String(methodName)}.`);
    }
    
    context.addInitializer(function (this: This) {
        const instance = this as Record<PropertyKey, any>;
        instance[methodName] = instance[methodName].bind(instance);
    });
}


class Person {
    constructor(public name: string) {
        this.greet = this.greet.bind(this)
    }

    @loggedMethod("⚠️")
    greet(){
        console.log(`Hello ${this.name}`)
    }
    @bound
    sayMyName(){
        console.log(`My name is ${this.name}`)
    }
}

const person = new Person("John")
person.greet()


const myName = new Person("Asif").sayMyName
myName()