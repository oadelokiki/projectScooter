const assert = require('assert');

describe('ScooterApp', function() {

    let scooterApp;

    beforeEach(function() {
        scooterApp = new ScooterApp();
    });

    describe('#registerUser', function() {
        it('should register a new user', function() {
            scooterApp.registerUser("John", "password123", 25);
            assert.deepStrictEqual(Object.keys(scooterApp.registeredUsers), ["John"]);
        });
        it('should throw an error for underage users', function() {
            assert.throws(() => scooterApp.registerUser("Alice", "password123", 15), Error("too young to register"));
        });
        it('should throw an error if user is already registered', function() {
            scooterApp.registerUser("John", "password123", 25);
            assert.throws(() => scooterApp.registerUser("John", "password456", 30), Error("already registered"));
        });
    });

    describe('#loginUser', function() {
        it('should log in an existing user with correct password', function() {
            scooterApp.registerUser("John", "password123", 25);
            scooterApp.loginUser("John", "password123");
            assert.strictEqual(scooterApp.registeredUsers["John"].loggedIn, true);
        });
        it('should throw an error for non-existing user', function() {
            assert.throws(() => scooterApp.loginUser("Alice", "password123"), Error("Username or password incorrect"));
        });
        it('should throw an error for incorrect password', function() {
            scooterApp.registerUser("John", "password123", 25);
            assert.throws(() => scooterApp.loginUser("John", "password456"), Error("Username or password is incorrect"));
        });
    });

    describe('#logoutUser', function() {
        it('should log out a logged in user', function() {
            scooterApp.registerUser("John", "password123", 25);
            scooterApp.loginUser("John", "password123");
            scooterApp.logoutUser("John");
            assert.strictEqual(scooterApp.registeredUsers["John"].loggedIn, false);
        });
        it('should throw an error for non-existing user', function() {
            assert.throws(() => scooterApp.logoutUser("Alice"), Error("no such user is logged in"));
        });
    });

    describe('#createScooter', function() {
        it('should create a new scooter at a station', function() {
            scooterApp.createScooter("station1");
            assert.strictEqual(scooterApp.stations["station1"].length, 1);
        });
        it('should throw an error for a non-existing station', function() {
            assert.throws(() => scooterApp.createScooter("station4"), Error("no such station"));
        });
    });

    describe('#dockScooter', function() {
        it('should dock a scooter at a station', function() {
            let scooter = new Scooter();
            scooterApp.createScooter("station1");
            scooterApp.dockScooter(scooter, "station1");
            assert.strictEqual(scooter.station, "station1");
        });
        it('should throw an error if scooter is already at station', function() {
            let scooter = new Scooter();
            scooter.station = "station1";
            scooterApp.createScooter("station1");
            scooterApp.dockScooter(scooter, "station1");
            assert.throws(() => scooterApp.dockScooter(scooter, "station1"), Error("scooter already at station"));
        });
 }

