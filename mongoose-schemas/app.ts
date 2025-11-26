// super basic mongoose example!
// read the docs for more examples

import 'dotenv/config'
import mongoose, { model, Schema } from 'mongoose'

interface DogInterface {
  name: string;
  breed: string;
}

const dogSchema = new Schema<DogInterface>(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
    },
    {
        methods: {
        updateName(name: string) {
            this.name = name;
            return this.save();
        }
        },
    }
);

const Dog = model('Dog', dogSchema);

async function createDog(name: string, breed: string) {
    const newDog = new Dog({
        name,
        breed
    });
    await newDog.save();
    return newDog;
}

async function run() {
    mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/dogs`);

    createDog("Buddy", "Golden Retriever");
    createDog("Junior", "Dalmation");
    createDog("Lilah", "Poodle");
    createDog("Caramel", "Beagle");
}

run();