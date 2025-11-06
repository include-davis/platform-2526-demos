import { MongoClient, ObjectId } from "mongodb";

/**
 * Get all cats from the database.
 * @param client: The MongoClient object.
 * @returns An array containing all cats in the database.
 */
export async function getAllCats(client: MongoClient) {
  const cats = client.db("cats").collection("cats").find();
  return cats.toArray();
}

/**
 * Get a cat from the database.
 * @param client: The MongoClient object.
 * @param id ID of the cat to get.
 * @returns An object representing the cat.
 */
export async function getCat(client: MongoClient, id) {
    const cat = await client.db("cats").collection("cats").findOne({ _id: new ObjectId(id)});
    return cat;
}

/**
 * Create a new cat in the database.
 * @param client: The MongoClient object.
 * @param name: The name of the new cat.
 * @param fur: The fur of the new cat.
 * @returns The newly created cat's id.
 */
export async function createCat(client: MongoClient, name: string, fur: string) {
    const myDB = client.db("cats");
    const myColl = myDB.collection("cats");
    const doc = { name, fur };
    const result = await myColl.insertOne(doc);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId;
}

/**
 * Update a cat in the database.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the cat to update.
 * @param name New name of the cat to update.
 * @param fur New fur of the cat to update.
 */
export async function updateCat(client: MongoClient, id: string, name: string, fur: string) {
    const myDB = client.db("cats");
    const myColl = myDB.collection("cats");
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: {
            name, fur
        },
    };
    const result = await myColl.updateOne(filter, updateDoc);
    return result;
}

/**
 * Delete a single cat from the database.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the cat to update.
 */
export async function deleteCat(client: MongoClient, id: string) {
    const myDB = client.db("cats");
    const myColl = myDB.collection("cats");
    const filter = { _id: new ObjectId(id) };
    const deleteResult = await myColl.deleteOne(filter);
    return deleteResult;
}