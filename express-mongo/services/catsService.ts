import { MongoClient, ObjectId } from "mongodb";

/**
 * 
 * @returns An array containing all records in the database.
 */
export async function getAllCats(client: MongoClient) {
  const cats = client.db("cats").collection("cats").find();
  return cats.toArray();
}

/**
 * 
 * @param id Record ID of the record to get
 * @returns An object representing the record.
 */
export async function getCat(client: MongoClient, id) {
    const cat = await client.db("cats").collection("cats").findOne({ _id: new ObjectId(id)});
    return cat;
}

/**
 * 
 * @param client:
 * @param name:
 * @param fur:
 * @returns The newly created cat id
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
 * Update a cat
 * @param id Integer representing the ID of the record to update
 * @param start_time Date object representing the new time to set the start time to
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
 * Delete a single record from the database.
 * @param id Integer representing the ID of the record to delete
 */
export async function deleteCat(client: MongoClient, id: string) {
    const myDB = client.db("cats");
    const myColl = myDB.collection("cats");
    const filter = { _id: new ObjectId(id) };
    const deleteResult = await myColl.deleteOne(filter);
    return deleteResult;
}