var sails = require('sails');
const request = require('supertest');

// Global before hook
beforeAll(function (done) {
    sails.lift({
        
        hooks: { grunt: true },
        log: { level: 'warn' },

    }, function (err) {
        if (err) { return done(err); }
        return done();
    });
});

// Global after hook
afterAll(function (done) {
  
    sails.lower(done);
});

test('Should signup a new user', async () => {
    
    const response = await request(sails.hooks.http.app)
        .post('/api/v1/add-user-account')
        .send({
            name: 'Klark Kent',
            email: 'kent@yopmail.com'
        })
        .expect(201)

    console.log('========================='+response);
    //check user was sotred correctly
    const user = await User.findOne(response.body.user.id)
    expect(user).not.toBeNull()


    expect(response.body).toMatchObject({
        user: {
            name: 'Arjun Singh Pujari',
            email: 'arjunsng95@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('asp123')

})

describe('Home', () => {
    it('/ - returns 201', (done) => {
        request(sails.hooks.http.app)
            .post('/api/v1/add-user-account')
            .send({
                name: 'Klark Kent',
                email: 'kent@yopmail.com'
            })
            .expect(201, done)
           
    })
})






