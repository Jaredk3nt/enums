const { enums, string, number } = require("../src");

const wd = ["monday", "tuesday", "wednesday", "thursday", "friday"];

describe("enum", () => {
  describe("core", () => {
    test("returns an object", () => {
      let weekDays = enums()(wd);
      expect(typeof weekDays).toBe("object");
    });

    test("the values are assigned numbers starting at 0", () => {
      let weekDays = enums()(wd);
      expect(weekDays.monday).toBe(0);
      expect(weekDays.tuesday).toBe(1);
      expect(weekDays.wednesday).toBe(2);
      expect(weekDays.thursday).toBe(3);
      expect(weekDays.friday).toBe(4);
    });
  });

  describe("string initializer", () => {
    test("returns an object", () => {
      let weekDays = enums(string)(wd);
      expect(typeof weekDays).toBe("object");
    });

    test("the values are assigned string values equal to keys", () => {
      let weekDays = enums(string)(wd);
      expect(weekDays.monday).toBe(wd[0]);
      expect(weekDays.tuesday).toBe(wd[1]);
      expect(weekDays.wednesday).toBe(wd[2]);
      expect(weekDays.thursday).toBe(wd[3]);
      expect(weekDays.friday).toBe(wd[4]);
    });
  });

  describe("enum api", () => {
    describe("keys", () => {
      test("exists and is a function", () => {
        let weekDays = enums()(wd);
        expect(typeof weekDays.keys).toBe('function');
      });
      
      test("returns an array when invoked", () => {
        let weekDays = enums()(wd);
        const keys = weekDays.keys();
        expect(Array.isArray(keys)).toBeTruthy();
      });

      test("returns an array of only the given enums", () => {
        let weekDays = enums()(wd);
        const keys = weekDays.keys();
        expect(keys.length).toBe(wd.length);
        expect(keys[0]).toBe(wd[0]);
        expect(keys[4]).toBe(wd[4]);
      });
    });

    describe("values", () => {
      test("exists and is a function", () => {
        let weekDays = enums()(wd);
        expect(typeof weekDays.values).toBe('function');
      });
      
      test("returns an array when invoked", () => {
        let weekDays = enums()(wd);
        const vals = weekDays.values();
        expect(Array.isArray(vals)).toBeTruthy();
      });

      test("returns an array of only the given enums", () => {
        let weekDays = enums()(wd);
        const vals = weekDays.values();
        expect(vals.length).toBe(wd.length);
        expect(vals[0]).toBe(0);
        expect(vals[4]).toBe(4);
      });
    });

    describe("entries", () => {
      test("exists and is a function", () => {
        let weekDays = enums()(wd);
        expect(typeof weekDays.entries).toBe('function');
      });
      
      test("returns an array when invoked", () => {
        let weekDays = enums()(wd);
        const ents = weekDays.entries();
        expect(Array.isArray(ents)).toBeTruthy();
      });

      test("returns an array of only the given enums", () => {
        let weekDays = enums()(wd);
        const ents = weekDays.entries();
        expect(ents.length).toBe(wd.length);
        expect(ents[0]).toEqual([wd[0], 0]);
        expect(ents[4]).toEqual([wd[4], 4]);
      });
    });

    describe("has", () => {
      test("exists and is a function", () => {
        let weekDays = enums()(wd);
        expect(typeof weekDays.has).toBe('function');
      });
      
      test("returns an boolean when invoked", () => {
        let weekDays = enums()(wd);
        expect(weekDays.has(wd[0])).toBe(true);
        expect(weekDays.has('random')).toBe(false);
      });
    });

    describe("hasValue", () => {
      test("exists and is a function", () => {
        let weekDays = enums()(wd);
        expect(typeof weekDays.hasValue).toBe('function');
      });
      
      test("returns an boolean when invoked", () => {
        let weekDays = enums()(wd);
        expect(weekDays.hasValue(0)).toBe(true);
        expect(weekDays.hasValue('random')).toBe(false);
      });
    });

    describe("getName", () => {
      test("exists and is a function", () => {
        let weekDays = enums()(wd);
        expect(typeof weekDays.getName).toBe('function');
      });
      
      test("returns an string or undefined when invoked", () => {
        let weekDays = enums()(wd);
        let weekDaysStr = enums(string)(wd);
        expect(weekDays.getName(0)).toBe(wd[0]);
        expect(weekDaysStr.getName(wd[0])).toBe(wd[0]);
        expect(weekDays.getName('random')).toBeUndefined();
      });
    });
  })
});