var expect = require("chai").expect;
var Class = require("../");

describe("Implement Class __super__",function() {
  var A = Class({
    a: function() {
      return 1;
    }
  });

  var B = Class({
    b: function() {
      return 2;
    }
  },A);

  it("should set the __super__ class property to the parent class",function() {
    expect(B.__super__).to.eq(A);
  });

  it("should set Object as the default __super__ class",function() {
    expect(A.__super__).to.eq(Object);
  });
});

describe("Implement Methods Inheritance", function() {
  var A = Class({
    a: function() {
      return 1;
    }
  });

  var B = Class({
    b: function() {
      return 2;
    }
  },A);

  var b = new B();

  describe("b",function() {
    it("should be an instance of B",function() {
      expect(b.constructor).to.eq(B);
    });

    it("should be able to call method `a` through inheritance",function() {
      expect(b.a).to.be.a("function");
      expect(b.a()).to.be.eq(1);
    });

    it("should not have method `a` defined directly on the object",function() {
      expect(b.hasOwnProperty("a")).to.be.false;
    });

    it("should not have method `a` defined directly on the prototype of B",function() {
      expect(B.constructor.hasOwnProperty("a")).to.be.false;
    });
  });
});

describe("Implement Super call",function() {
  var A = Class({
    foo: function(a,b) {
      return [this.n,a,b];
    },

    bar: function() {
      return 1;
    },

    self: function() {
      return this;
    }
  });

  var B = Class({
    foo: function(a,b) {
      return this.super("foo",a*10,b*100);
    },

    bar: function() {
      return 20 + this.super("bar");
    },

    self: function() {
      return this.super("self");
    }
  },A);

  var C = Class({
    foo: function(a,b) {
      return this.super("foo",a*10,b*100);
    }
  },B);

  var b = new B();
  b.n = 1;

  it("should define the `super` method", function() {
    expect(b.super).to.be.a("function");
  });

  it("should be able to call super method without arguments",function() {
    expect(b.bar()).to.equal(21);
  });

  it("should call super method with the correct `this` context", function() {
    expect(b.self()).to.equal(b);
  });

  it("should be able to call super method with multiple arguments", function() {
    expect(b.foo(2,3)).to.deep.equal([1,20,300]);
  });

});

describe("Implement Super's Super",function() {
  var A, B, C, c;
  beforeEach(function() {
    A = Class({
      foo: function(a,b) {
        return [a,b];
      }
    });

    B = Class({
      foo: function(a,b) {
        return this.super("foo",a*10,b*100);
      }
    },A);

    C = Class({
      foo: function(a,b) {
        return this.super("foo",a*10,b*100);
      }
    },B);

    c = new C();
  });

  it("should be able to call super's super",function() {
    expect(c.foo(1,2)).to.deep.equal([100,20000]);
  });
});
