import {db} from "../name"
import createAnswerCollection from "./answer.collection"
import createCommentCollection from "./comment.collection"
import createQuestionCollection from "./question.collection"
import createVoteCollection from "./vote.collection"
import { databases } from "./config"


export default async function getOrCreateDB()
{
    try{
        await databases.get(db)//fetching the already available db
        console.log("Database connected")

    }
    catch(error)
    {
        try {
           await  databases.create(db,db)//creating db of id db and name db(here we keep both same)
           console.log("database created")
           //create collections
           await Promise.all([
            createAnswerCollection(),
            createCommentCollection(),
            createQuestionCollection(),
            createVoteCollection()
           ]) 
           console.log("collection created")
           console.log("database connected")
        } catch (error) {
            console.log("Error creating databases or collection",error);
        }
    }
    return databases;
}