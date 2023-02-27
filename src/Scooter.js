class Scooter{
	
	static nextSerial = 0;

	constructor(){
	
		this.station = "station1";
	       	this.user = null;
	      	this.serial = nextSerial;
	       	nextSerial += 1;
	        this.charge = 100;
	        this.isBroken = false;	

	}

	rent(user){
		if((this.charge > 20) && (this.isBroken == false)){
			//TODO: remove from station --> check out to user
		}else{
			if(this.charge <= 20){
				throw new Error("scooter needs to charge");

			}else if(this.isBroken){
				throw new Error("scooter needs repair");
			}
		}
	}
	
	dock(station){
	
		this.station = station;
		this.user = null;
	}

	async recharge() {
	    console.log('Starting charge');

		while(this.charge < 100){
			await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
            
		        this.charge += 25;
			console.log("Charging " + charge + " % complete");

		}

	    console.log('Charge complete');   
	}

	requestRepair(){
		await new Promise(resolve => setTimeout(resolve, 5000)); // wait 2 seconds
            
	        this.isBroken = false;
		console.log("repair completed");

	}

}
class User{
	
	
	constructor(){
		this.username = "";
		this.password = "";
		this.age = 0;
		this.loggedIn = false;
	}
	login(password){
		if(password == this.password){
			this.loggedIn = true;
		}else{
			return("incorrect password");
		}
	}
	logout(){
	
		this.loggedIn = false;

	}

}

class ScooterApp{

	static stations = {"station1":[], "station2":[], "station3":[]};
	static registeredUsers = {};
	
	registerUser(username,password,age){
		
		if(age < 18){
			throw new Error("too young to register");
		}
		
		else if(!(registeredUser[username])){

			let user = new User();
			user.username = username;
			user.password = password;
			user.age = age;

			registeredUsers[username] = user;
			
			console.log("user has been registered");

		}else{
			throw new Error("already registered");
		}
	}

	loginUser(username, password){
		
		if(!(registeredUsers[username])){
			throw new Error("Username or password incorrect");
		}

		let user  = registeredUsers[username];
		let result = user.login(password);

		if(result == "incorrect password"){
			throw new Error("Username or password is incorrect");
		}else{
			console.log("user has been logged in");
		}

	}

	logoutUser(username){
		if(!(registeredUsers[username])){
                        throw new Error("no such user is logged in");
                }

		let user  = registeredUsers[username];
		user.logout();

	}

	createScooter(station){
		
		if(!(stations[station])){
			throw new Error("no such station");
		}

		else{
			let scoots = new Scooter();
			scoots.station = station;
			stations[station].push(scoots);
			console.log("created new scooter");
		}


	}

	dockScooter(scooter, station){
		
		if( !(stations[station]) ) {
                        throw new Error("no such station");
                }

		else{
			for(let i = 0; i < stations[station].length; i++){
				
				if(stations[station][i] == scooter){
				
					throw new Error("scooter already at station");
				
				}

			}

			stations[station].push(scooter);
			console.log(scooter is docked);
		}


	}

	rentScooter(scooter, user){
		if(scooter.user != null){
			
			throw new Error("scooter already rented");

		}

		for(let i = 0 ; i < stations[scooter.station]; i++){

			if(stations[scooter.station][i]){
				stations[scooter.station][i] = stations[scooter.station][i].splice(i, 1);
				break;
			}

		}

	}
	print(){
		console.log("Here are the registered users: ");
		console.log(registeredUsers);

		console.log("station 1 has " + stations["station1"].length + "scooters");
		console.log("station 2 has " + stations["station2"].length + "scooters");
		console.loge("station 3 has " +stations["station3"].length + "scooters");

	}
}	

class TestClass{
	
}
