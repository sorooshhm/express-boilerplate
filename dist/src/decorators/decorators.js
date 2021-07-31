"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isArray = exports.isObject = exports.isBoolean = exports.isString = exports.isNumber = exports.Body = void 0;
function Body(Type) {
    class BType extends Type {
        constructor(data) {
            super();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    this[key] = data[key];
                }
            }
        }
    }
    return function (...args) {
        const [target, key, d] = (args);
        let func = d.value;
        d.value = function (...args) {
            if (typeof args[0].body !== "object")
                throw new Error(`expected object in ${"req.body"} , instead got ${typeof args[0].body}`);
            let x = new BType(args[0].body);
            func(...args);
        };
    };
}
exports.Body = Body;
function isNumber() {
    return function (target, key) {
        let val = "25";
        Object.defineProperty(target, key, {
            get: () => {
                return val;
            }, set: (value) => {
                if (typeof value !== "number") {
                    throw new Error(`Property ${key} must be Numeric`);
                }
                val = "kos " + value;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.isNumber = isNumber;
function isString() {
    return function (target, key) {
        let val = "25";
        Object.defineProperty(target, key, {
            get: () => {
                return val;
            }, set: (value) => {
                if (typeof value !== "string") {
                    throw new Error(`Property ${key} must be string`);
                }
                val = "kos " + value;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.isString = isString;
function isBoolean() {
    return function (target, key) {
        let val = "25";
        Object.defineProperty(target, key, {
            get: () => {
                return val;
            }, set: (value) => {
                if (typeof value !== "boolean") {
                    throw new Error(`Property ${key} must be boolean`);
                }
                val = "kos " + value;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.isBoolean = isBoolean;
function isObject() {
    return function (target, key) {
        let val = "25";
        Object.defineProperty(target, key, {
            get: () => {
                return val;
            }, set: (value) => {
                if (typeof value !== "object") {
                    throw new Error(`Property ${key} must be object`);
                }
                val = "kos " + value;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.isObject = isObject;
function isArray() {
    return function (target, key) {
        let val = "25";
        Object.defineProperty(target, key, {
            get: () => {
                return val;
            }, set: (value) => {
                if (!Array.isArray(target[key])) {
                    throw new Error(`Property ${key} must be array`);
                }
                val = "kos " + value;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.isArray = isArray;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function isEmail() {
    return function (target, key) {
        let val = "25";
        Object.defineProperty(target, key, {
            get: () => {
                return val;
            }, set: (value) => {
                if (typeof target[key] !== "string")
                    throw new Error(`Property ${key} must be string`);
                if (!validateEmail(target[key])) {
                    throw new Error(`Property ${key} is not an email`);
                }
                val = "kos " + value;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.isEmail = isEmail;
