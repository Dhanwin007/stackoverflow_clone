import {DatabasesIndexType, OrderBy, Permission} from "node-appwrite";
import {db,questionCollection} from "../name"
import {databases} from "./config"

export default async function createQuestionCollection()
{
    //create collection
    await databases.createCollection(db,questionCollection,questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),


        ]
    );
    console.log("Question collection is created");

    //creating attributes and Indexes

    await Promise.all([
        databases.createVarcharAttribute(db,questionCollection,"title",100,true),
        databases.createLongtextAttribute(db,questionCollection,"content",true),
        databases.createVarcharAttribute(db,questionCollection,"authorId",50,true),
        databases.createVarcharAttribute(db,questionCollection,"tags",50,true,undefined,true),
        databases.createVarcharAttribute(db,questionCollection,"attachmentId",50,false),
        ]);
    console.log("Question Attributes created")
    // 2. The "Safety Buffer" (Wait for 2-3 seconds)
// This prevents the 'attribute_not_available' error
await new Promise((resolve) => setTimeout(resolve, 3000));

    //create Index

    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            DatabasesIndexType.Fulltext,
            ["title"],
            [OrderBy.Asc]
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",
            DatabasesIndexType.Fulltext,
            ["content"],
            [OrderBy.Asc]
        )
    ])
}