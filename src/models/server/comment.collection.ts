import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    // Creating Collection
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createLongtextAttribute(db, commentCollection, "content",  true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),//comments can come on the answers or the questions
        databases.createVarcharAttribute(db, commentCollection, "typeId", 50, true),
        databases.createVarcharAttribute(db, commentCollection, "authorId", 50, true),
    ]);
    console.log("Comment Attributes Created");
}