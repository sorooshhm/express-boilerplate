
export function Body(Type) {
    class BType extends Type {
        constructor(data) {
            super();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    this[key] = data[key]
                }
            }
        }
    }
    return function (...args) {
        const [target, key, d] = (args);
        let func = d.value;
        d.value = function (...args) {
            const { body } = args[0]
            if (typeof body !== "object")
                throw new Error(`expected object in ${"req.body"} , instead got ${typeof body}`)
            const required = new Type().required || [];
            required.map(i => {
                if (!Object.keys(body).includes(i))
                    throw new Error(`Property ${i} is required`)
            })
            let x = new BType(args[0].body)
            func(...args);
        };


    }
}
export function required() {
    return function (target, key) {
        let req = target.required || []
        Object.defineProperty(target, 'required', {
            value: [...req, key],
            enumerable: false,
            configurable: true,
        })
    }
}
export function custom(validator) {
    if (typeof validator !== 'function') throw new Error("The validator must be a function");
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value) => {
                if (!validator(value)) {
                    throw new Error(`value ${value} is not valid for ${key} property`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function union(...types) {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value) => {
                if (!types.includes(value)) {
                    throw new Error(`value ${value} is not valid for ${key} property`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isNumber() {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: number) => {
                if (typeof value !== "number") {
                    throw new Error(`Property ${key} must be Numeric`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isString() {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: string) => {
                if (typeof value !== "string") {
                    throw new Error(`Property ${key} must be string`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isBoolean() {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: boolean) => {
                if (typeof value !== "boolean") {
                    throw new Error(`Property ${key} must be boolean`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}

export function isObject() {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: object) => {
                if ((typeof value !== "object" || value == null)) {
                    throw new Error(`Property ${key} must be object`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}
export function isArray() {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: any[]) => {
                if (!Array.isArray(value)) {
                    throw new Error(`Property ${key} must be array`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function isEmail() {
    return function (target, key) {
        let val;
        Object.defineProperty(target, key, {
            get: () => {
                return val
            }, set: (value: string) => {
                if (typeof value !== "string")
                    throw new Error(`Property ${key} must be string`)
                if (!validateEmail(value)) {
                    throw new Error(`Property ${key} is not an email`)
                }
                val = value
            },
            enumerable: true,
            configurable: true,
        })
    }
}