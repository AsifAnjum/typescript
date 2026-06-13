import "reflect-metadata";

// Metadata Keys
const REQUIRED_PARAMS_KEY = Symbol("required_params");
const VALIDATE_PARAMS_KEY = Symbol("validate_params");
const INJECT_KEY = Symbol("inject")


// @REQUIRED - not null/undefined;
function Required(target: any, propertyKey: string | undefined, parameterIndex: number) {
    const existingRequired: number[] = Reflect.getMetadata(REQUIRED_PARAMS_KEY, target, propertyKey as string) || [];

    existingRequired.push(parameterIndex);
    Reflect.defineMetadata(REQUIRED_PARAMS_KEY, existingRequired, target, propertyKey as string)
}

function Min(min: number) {
    return function (target: any, propertyKey: string | undefined, parameterIndex: number) {
        const existing: Array<{ index: number; rule: (v: any) => string | null }> = Reflect.getOwnMetadata(VALIDATE_PARAMS_KEY, target, propertyKey as string) || [];

        existing.push({
            index: parameterIndex,
            rule: v => typeof v === 'number' && v < min ? `Param[${parameterIndex}] must be >= ${min} ` : null
        })
        Reflect.defineMetadata(VALIDATE_PARAMS_KEY, existing, target, propertyKey as string);

    }
}

// validate method decorator
function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;


    descriptor.value = function (...args: any[]) {
        const requiredIndices: number[] = Reflect.getOwnMetadata(REQUIRED_PARAMS_KEY, target, propertyKey) || [];

        for (const index of requiredIndices) {
            if (args[index] === null || args[index] === undefined || args[index] === "") {
                throw new Error(
                    `❌ Validation Error: Parameter at index ${index} of '${propertyKey}' is required`
                );
            }
        }


        // custom rule check
        const validationRules: Array<{ index: number, rule: (v: any) => string | null }> = Reflect.getOwnMetadata(VALIDATE_PARAMS_KEY, target, propertyKey) || []

        for (const { index, rule } of validationRules) {
            const error = rule(args[index]);
            if (error) {
                throw new RangeError(`❌ ${error} in '${propertyKey}'`);
            }
        }

        return originalMethod.apply(this, args)
    }

    return descriptor;
}


// constructor parameter @Inject (DI Style)
const container = new Map<symbol, any>();


function Injectable<T extends { new(...args: any[]): {} }>(constructor: T) {
    container.set(Symbol.for(constructor.name), constructor);
    return constructor;
}

function Inject(token: symbol) {
    return function (target: any, _: string | undefined, parameterIndex: number) {
        const existing: Array<{ index: number; token: symbol }> = Reflect.getOwnMetadata(INJECT_KEY, target) || [];
        existing.push({ index: parameterIndex, token })
        Reflect.defineMetadata(INJECT_KEY, existing, target)
    }
}