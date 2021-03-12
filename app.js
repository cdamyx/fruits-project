const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 10
	},
	review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
	rating: 10,
	review: "Peaches are good"
});

// fruit.save();

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFruit: fruitSchema
});

const grapes = new Fruit({
	name: "Grapes",
	score: 3,
	review: "it's a fruit"
});

const pineapple = new Fruit({
	name: "Pineapple",
	score: 10,
	review: "fruit"
});


grapes.save();

const Person = mongoose.model("Person", personSchema);

const person = new Person({
	name: "John",
	age: 37,
	favoriteFruit: grapes
});



person.save();

// const kiwi = new Fruit({
// 	name: "Kiwi",
// 	score: 10,
// 	review: "the best fruit"
// });

// const orange = new Fruit({
// 	name: "Orange",
// 	score: 8,
// 	review: "a little sour"
// });

// const banana = new Fruit({
// 	name: "Banana",
// 	score: 10,
// 	review: "really good"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Successfully saved all the fruits to fruitsDB");
// 	}
// });

Fruit.find(function(err, fruits){
	if(err) {
		console.log(err);
	} else {

		fruits.forEach(fruit => console.log(fruit.name));

		mongoose.connection.close();
	}
});

// Person.updateOne({name: "John"}, {favoriteFruit: grapes}, err => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Successfully updated favorite fruit");
// 	}
// });

// Fruit.deleteOne({name: "Peach"}, err => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Successfully deleted");
// 	}
// })

// Person.deleteMany({name: "John"}, err => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("deleted all the johns");
// 	}
// });

// Person.deleteOne({_id: "604aefff32ef9220ef1815f8"}, err => {
// 	if(err) {
// 		console.log(err);
// 	}
// });

const findDocuments = function(db, callback) {
	//Get the documents collection
	const collection = db.collection('fruits');
	//Find some documents
	collection.find({}).toArray(function(err, fruits) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(fruits);
		callback(fruits);
	});
}