const lib = require('../exercise1');

describe('fizzBuzz', ()=>{

    it('should throw an exception if input is not a number', ()=>{
       const args = [null,'',undefined,false]
       args.forEach(a=>{
        expect(()=>{ lib.fizzBuzz(a) }).toThrow()
       });       
    });

    it('it should return fizzbuzz', ()=>{
        const result = lib.fizzBuzz(15);
        expect(result).toMatch(/fizzbuzz/i)
    });

    it('it should return fizz', ()=>{
        const result = lib.fizzBuzz(12)
        expect(result).toMatch(/fizz/i);
    });

    it('should return buzz', ()=>{
        const result = lib.fizzBuzz(20);
        expect(result).toMatch(/buzz/i);
    });

    it('should return number', ()=>{
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1); 
    });
});
