import { Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
    // Creating Collection
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Answer Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createLongtextAttribute(db, answerCollection, "content", true),
        databases.createVarcharAttribute(db, answerCollection, "questionId", 50, true),
        databases.createVarcharAttribute(db, answerCollection, "authorId", 50, true),
    ]);
    console.log("Answer Attributes Created");
}