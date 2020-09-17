const { number, string } = require("./initializers");

function isObject(val) {
  if (val === null) return false;
  return typeof val === "object";
}

function enums(initializer = number) {
  function generator(...args) {
    if (!args || !args.length) return undefined;
    const enums =
      args.length === 1 && (Array.isArray(args[0]) || isObject(args[0]))
        ? args[0]
        : args;
    const en = new Enum(enums, initializer);
    return en;
  }

  return generator;
}

function Enum(enums, initializer) {
  let pv;
  if (Array.isArray(enums)) {
    for (let val of enums) {
      const v = initializer(val, pv);
      pv = v;
      this[val] = v;
    }
  } else if (isObject(enums)) {
    for (let [key, value] of Object.entries(enums)) {
      if (!value || Array.isArray(value) || isObject(value)) {
        const v = initializer(key, pv);
        pv = v;
        this[key] = Object.freeze(v);
      } else {
        this[key] = Object.freeze(value);
      }
    }
  }
  Object.freeze(this);
}

Enum.prototype.keys = function () {
  return Object.keys(this);
};

Enum.prototype.values = function () {
  return Object.values(this);
};

Enum.prototype.entries = function () {
  return Object.entries(this);
};

Enum.prototype.has = function (key) {
  return this[key] !== undefined && this[key] !== null;
};

Enum.prototype.hasValue = function (val) {
  return Object.values(this).includes(val);
};

Enum.prototype.getName = function (val) {
  const entries = Object.entries(this);
  const entry = entries.find(([_key, value]) => value === val);
  if (entry) return entry[0];
};

module.exports = {
  enums,
  string,
  number,
};
