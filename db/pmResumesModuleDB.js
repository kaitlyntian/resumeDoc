// This file handles product manager resume related CRUD operation: Listings, Adding
// Author: Randy Lirano

// Import Mongo Client
const { MongoClient } = require("mongodb");

// URI connection string, it takes
// URL connection to DB cluster defined in env if available, otherwise it connect to the local Mongo server
const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

// Global variable const for DB and collections name
const DB_NAME = "resumeDoc";
const USERS_COL = "Users";
const PM_RESUMES_COL = "PM_Resumes";

// Function to get a list of PM resume ids of the current active email
async function getPMResumes(activeEmail) {
  // Initiate Mongo Client
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // const usersDB = client.db(DB_NAME);
    const usersCol = client.db(DB_NAME).collection(USERS_COL);
    const pmCol = client.db(DB_NAME).collection(PM_RESUMES_COL);

    // console.log("ACTIVE EMAIL", activeEmail);

    // query parameter for user collection
    // let userQuery = {
    //   "credential": {
    //     "login_email": activeEmail
    //   }
    // }
    // user collection query parameter
    let userQuery = {
      "credential.login_email": activeEmail
    }

    // console.log("USER QUERY", userQuery);

    // get the currently active user using active email
    let activeUser = await usersCol.find(userQuery).toArray();
    // console.log("ACTIVE USER:", activeUser);

    // get the resume ids of the current active user
    let pmResumeIds = activeUser[0].pm_resume_id;
    // console.log("CURRENT USER PM RESUME IDS:", pmResumeIds);

    // query resumes from PM Resume collection where pm_resume_id in pmResumeIds
    let queryResult = await pmCol.find({"pm_resume_id": {$in: pmResumeIds}}).toArray();
    console.log("DB QUERY RESULT", queryResult);

    return queryResult;
  } finally {
    await client.close();
  }
}

// Function to create new PM resume for current active user
async function createPmResume(entryObject) {
  // Initiate Mongo client
  const client = new MongoClient(uri);
  // Retrieve email of current active user
  let userEmail = entryObject.user.login_email;
  const pmResumesCol = client.db(DB_NAME).collection(PM_RESUMES_COL);

  try {
    await client.connect();

    // create a new object and assign values from entryObject to the newObject
    let newResumeEntry = {
      pm_resume_id: (await pmResumesCol.find().count()) + 1,
      fullName: entryObject.fullName,
      schoolAndMajor: entryObject.schoolAndMajor,
      schoolDates: entryObject.schoolDates,
      projectName: entryObject.projectName,
      projectDates: entryObject.projectDates,
      role: entryObject.role,
      descriptionOne: entryObject.descriptionOne,
      descriptionTwo: entryObject.descriptionTwo,
      descriptionThree: entryObject.descriptionThree,
      techSkillsList: entryObject.techSkillsList,
      interestsList: entryObject.interestsList,
    }

    await pmResumesCol.insertOne(newResumeEntry);
    // add new resume_id to the list of pm resumes owned by the user in the user collection
    return await client.db(DB_NAME).collection("Users").updateOne(
    { "credential.login_email": userEmail },
    { $addToSet: { pm_resume_id: newResumeEntry.pm_resume_id } })
  } finally {
    await client.close();
  }

}

// Export modules
module.exports.getPMResumes = getPMResumes;
module.exports.createPmResume = createPmResume;