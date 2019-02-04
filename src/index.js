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

function generator(initializer, enums) {
  let pv;
  let en;
  if (!enums) return undefined;
  if (Array.isArray(enums)) {
    en = enums.reduce((acc, val) => {
      const v = initializer(val, pv);
      pv = v; // Update previous value
      return { ...acc, [val]: v };
    }, {});
  } else if (typeof enums === "object") {
    en = Object.entries(enums).reduce((acc, val) => {
      const key = val[0];
      const value = val[1];
      if (!value || Array.isArray(value) || typeof value === "object") {
        const v = initializer(key, pv);
        pv = v;
        return { ...acc, [key]: v };
      }
      return { ...acc, [key]: value };
    }, {});
  }
  giveMethods(en);
  return Object.freeze(en);
}

function enums(initializer = number) {
  return enums => generator(initializer, enums);
}

module.exports = {
  enums,
  string,
  number
};
