var expect = require("chai").expect;
var helper = require("../src/logic/helper");

describe("helper tests", function(){
  describe("compareRate function", function() {
    it("Should calculate percentage with compareRate", function() {
      const prevPrice = 100;
      const lastPrice = 170;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(70);
    });
  
    it("Should calculate negative percentage with compareRate", function() {
      const prevPrice = 100;
      const lastPrice = 70;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(-30);
    });
  
    it("Should calculate zero percentage with compareRate", function() {
      const prevPrice = 70;
      const lastPrice = 70;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(0);
    });
  
    it("Should calculate negative percentage with compareRate", function() {
      const prevPrice = -70;
      const lastPrice = 70;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(200);
    });
  
    it("Should calculate negative percentage with compareRate", function() {
      const prevPrice = -70;
      const lastPrice = -140;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(-100);
    });
  
    it("Should calculate negative percentage with compareRate", function() {
      const prevPrice = 70;
      const lastPrice = -140;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(-300);
    });
  
  
    it("Should calculate negative percentage with compareRate", function() {
      const prevPrice = -700;
      const lastPrice = -140;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(80);
    });
  
    it("Should calculate negative percentage with compareRate", function() {
      const prevPrice = 0;
      const lastPrice = 1;
      
      expect(helper.compareRate(prevPrice, lastPrice)).to.equal(Infinity);
    });
  });

  describe("prepareResponse function", function() {
    it('should sort symbols', function() {
      let symbolsData = [{
        symbol: "BTC",
        percentage: 83
      },
      {
        symbol: "BNB",
        percentage: 17
      },
      {
        symbol: "DOGE",
        percentage: 54
      }];
      expect(helper.prepareResponse(symbolsData)).to.contain("BTC: 83% DOGE: 54% BNB: 17%");
    });

    it('already sorted symbols', function() {
      let symbolsData = [{
        symbol: "BTC",
        percentage: 21
      },
      {
        symbol: "BNB",
        percentage: 15
      },
      {
        symbol: "DOGE",
        percentage: 12
      }];
      expect(helper.prepareResponse(symbolsData)).to.contain("BTC: 21% BNB: 15% DOGE: 12%");
    });

    it('should sort symbols with negative values', function() {
      let symbolsData = [{
        symbol: "BTC",
        percentage: 21
      },
      {
        symbol: "BNB",
        percentage: -4
      },
      {
        symbol: "DOGE",
        percentage: 12
      }];
      expect(helper.prepareResponse(symbolsData)).to.contain("BTC: 21% DOGE: 12% BNB: -4%");
    });

    it('should sort symbols with zero values', function() {
      let symbolsData = [{
        symbol: "BTC",
        percentage: 0
      },
      {
        symbol: "BNB",
        percentage: 4
      },
      {
        symbol: "DOGE",
        percentage: 0
      }];
      expect(helper.prepareResponse(symbolsData)).to.contain("BNB: 4% DOGE: 0% BTC: 0%");
    });
  });
});