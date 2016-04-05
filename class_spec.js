"use strict";
const assert = require("chai").assert;
const Class = require("../");

describe("Implement Class Constructor", function() {
  const constructor = function(a, b) {
    this.a = a;
    this.b = b;
  };

  const Foo = Class({ initialize: constructor });

  it("should return a class constructor function", function() {
    assert.isFunction(Foo);
  });

  it("should be able define a class", function() {
    const obj = new Foo(1, 2);
    assert.equal(obj.constructor, Foo);
    assert.equal(obj.a, 1);
    assert.equal(obj.b, 2);

    const obj2 = new Foo(3, 4);
    assert.equal(obj2.a, 3);
    assert.equal(obj2.b, 4);
  });

  it("should be able define a class without constructor", function() {
    const klass = Class({});
    const obj = new klass()
    assert.equal(obj.constructor, klass);
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
    assert.isFunction(foo.getA);
    assert.isFunction(foo.getB);

    assert.equal(foo.getA(), 1);
    assert.equal(foo.getB(), 2);
  });

  it("should not define `initialize` as a method", function() {
    assert.isUndefined(foo.initialize);
  });

  it("should found methods in prototype", function() {
    assert.isFunction(Foo.prototype.getA);
    assert.isFunction(Foo.prototype.getB);
    assert.equal(Foo.prototype.getA.call(foo), 1);
    assert.equal(Foo.prototype.getB.call(foo), 2);
  })
});
