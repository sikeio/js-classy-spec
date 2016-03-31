"use strict";
const expect = require("chai").expect;
const Class = require("../");

describe("Implement Class Constructor", function() {
  const constructor = function(a, b) {
    this.a = a;
    this.b = b;
  };

  const Foo = Class({ initialize: constructor });

  it("should return a class constructor function", function() {
    expect(Foo).to.be.a("function");
  });

  it("should be able define a class", function() {
    const obj = new Foo(1, 2);
    expect(obj.constructor).to.eq(Foo);
    expect(obj.a).to.eql(1);
    expect(obj.b).to.eql(2);

    const obj2 = new Foo(3, 4);
    expect(obj2.a).to.eql(3);
    expect(obj2.b).to.eql(4);
  });

  it("should be able define a class without constructor", function() {
    const klass = Class({});
    const obj = new klass()
    expect(obj.constructor).to.eq(klass);
  });
});

describe("Implement Instance Methods", function() {
  const Foo = Class({
    initialize: function(a, b) {
      this.a = a;
      this.b = b;
    },

    getA: function() {
      return this.a;
    },

    getB: function() {
      return this.b;
    }
  });

  const foo = new Foo(1, 2);

  it("should be able to define methods", function() {
    expect(foo.getA).to.be.a("function");
    expect(foo.getB).to.be.a("function");

    expect(foo.getA()).to.eq(1);
    expect(foo.getB()).to.eq(2);
  });

  it("should not define `initialize` as a method", function() {
    expect(foo.initialize).to.be.undefined;
  });
});

