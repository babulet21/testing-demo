const lib = require('../lib');
const db = require('../db')
const mail = require('../mail')

describe('absolute',()=>{

    it('it should return positive value if input is positive ',()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('it should return positive if input is negative ',()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('it should return 0 if input is 0',()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greeting',()=>{
    it('should return greeting',()=>{
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
    })
});

describe('getCurrencies', ()=>{
    it('should return an array',()=>{
        const result = lib.getCurrencies();
        
        //more General
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        
        //more specific
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //ideal way
        expect(result).toEqual(expect.arrayContaining(['USD','AUD','EUR']));

    });
});

describe('getProduct',()=>{
    it('it should return a product with a given id',()=>{
        const result = lib.getProduct(1);

        
        //expect(result).toBe({id: 1, price: 10 });

        //more Specific
        expect(result).toEqual({id: 1, price: 10});

        //more preferable
        expect(result).toMatchObject({id: 1, price: 10});
        expect(result).toHaveProperty('id', 1);


    });
});

describe('registerUser', ()=>{
    it('it should throw if user name is falsy', ()=>{   
        
        const args = [null, NaN , undefined, 0,false];
        
        args.forEach(a=>{
            expect(()=>{ lib.registerUser(a)}).toThrow()
        });
    });

    it('should return a user object if valid username is passed', ()=>{
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({username:'mosh'});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('apply discount', ()=>{
    it('should apply 10% discount if customer has more than 10 points', ()=>{
        db.getCustomerSync = function(customerId){
            console.log('Fake reading ....');
            return ({id:customerId, points:20})
        }

        const order = {customerId:1, totalPrice:10}
        const customer = lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)

    });
});

describe('notifyCustomer', ()=>{
    it('it should send an email to the customer', ()=>{
        db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});
        mail.send = jest.fn();
        let mailsent = false
        
        lib.notifyCustomer({customerId:1});
        
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});

