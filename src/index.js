const { number, string } = require("./initializers");
const methods = ["keys", "values", "entries", "has", "hasValue", "getName"];

function keys(en) {
  return Object.keys(en).filter(k => !methods.includes(k));
}

function giveMethods(en) {
  en.keys = () => keys(en);
  en.values = () => keys(en).map(k => en[k]);
  en.entries = () => keys(en).map(k => [k, en[k]]);
  en.has = key => {
    if (methods.includes(key)) return false;
    return en[key] !== undefined && en[key] !== null;
  };
  en.hasValue = val => Object.values(en).includes(val);
  en.getName = val => keys(en)[Object.values(en).indexOf(val)];
}

function enums(initializer = number) {
  function generator(...args) {
    if (!args || !args.length) return undefined;
    const enums = args.length > 1 ? args : args[0];
    let en = {};
    let pv;

    if (Array.isArray(enums)) {
      for (let val of enums) {
        const v = initializer(val, pv);
        pv = v;
        en[val] = v;
      }
    } else if (typeof enums === "object") {
      for (let val of Object.entries(enums)) {
        const key = val[0];
        const value = val[1];
        if (!value || Array.isArray(value) || typeof value === "object") {
          const v = initializer(key, pv);
          pv = v;
          en[key] = Object.freeze(v);
        } else {
          en[key] = Object.freeze(value);
        }
      }
    }

    giveMethods(en);
    
    return Object.freeze(en);
  }

  return generator;
}

module.exports = {
  enums,
  string,
  number
};
