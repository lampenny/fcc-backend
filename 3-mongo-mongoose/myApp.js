require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let me = new Person({
    name: "Penny",
    age: 31,
    favoriteFoods: ["Apples", "Bananas"],
  });

  me.save((err, data) => {
    err ? done(err) : done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Lisa", age: 32, favoriteFoods: ["Pho"] },
  { name: "Marge", age: 58, favoriteFoods: ["Dim sum"] },
  { name: "Bart", age: 36, favoriteFoods: ["Falafel"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) =>
    err ? done(err) : done(null, people)
  );
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, foundPerson) =>
    err ? done(err) : done(null, foundPerson)
  );
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foundFood) =>
    err ? done(err) : done(null, foundFood)
  );
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) =>
    err ? done(err) : done(null, data)
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      err ? done(err) : done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => (err ? done(err) : done(null, updatedPerson))
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) =>
    err ? done(err) : done(null, person)
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, person) =>
    err ? done(err) : done(null, person)
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  const query = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 });

  query.exec((err, data) => {
    if (err) {
      done(err);
    } else {
      console.log(`Query results: ${data}`);
      return done(null, data);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
