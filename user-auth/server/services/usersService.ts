import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

/**
 * 
 * @returns An array containing all users in the database.
 */
export async function getAllUsers(client: MongoClient) {
    const users = client.db("cats").collection("users").find();
    return users.toArray();
}

/**
 * 
 * @param id User ID of the user to get
 * @returns An object representing the user.
 */
export async function getUserById(client: MongoClient, id: string) {
    const user = await client.db("cats").collection("users").findOne({ _id: new ObjectId(id)});
    return user;
}

export async function getUserByUsername(client: MongoClient, username: string, ) {
    const user = await client.db("cats").collection("users").findOne({ username });
    return user;
}

/**
 * Create a new user in the database.
 * @param email The email of the new user.
 * @param username The username of the new user.
 */
export async function createUser(client: MongoClient, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.db("cats").collection("users").insertOne({ username, password: hashedPassword });
    console.log(
        `A document was inserted with the _id: ${user.insertedId}`,
    );
    return user.insertedId;
}
