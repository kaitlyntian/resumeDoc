# ResumeDoc
A platform where students (both non-traditional and traditional alike) and folks looking to break into tech can create rich, compelling resumes in less than 10 minutes.

## Objective
This project is intended to focus on full-stack web development using React.js (frontend library), Node.js (backend development environment) and Express. The User Interface of this application was built using several modular React components. The database for the platform was built using a non-relational database called Mongo DB. The database was hosted using MongoDB Atlas as our database server.

## Screenshots
Login Page:
<img width="1167" alt="login" src="https://user-images.githubusercontent.com/20258196/143971581-617d4935-63b5-4091-81e0-63e36898e11f.png">
Signup Page:
<img width="1166" alt="signup" src="https://user-images.githubusercontent.com/20258196/143971595-bcae0b2e-774b-4902-a898-5248e4fa2b9e.png">
Landing Page:
<img width="1434" alt="landing" src="https://user-images.githubusercontent.com/20258196/143971553-244da90c-69c9-4e41-a19d-cb71afca80a3.png">
SWE Dashboard:
<img width="1440" alt="swe-dash" src="https://user-images.githubusercontent.com/20258196/143971613-75b5e819-341c-4b44-add5-8c142d69a674.png">
UX/UI Dashboard:
<img width="1170" alt="uxui-dash" src="https://user-images.githubusercontent.com/20258196/143971625-e101b4b8-3b69-48af-8c5f-3d52b42186ca.png">
PM Dashboard:
<img width="1440" alt="pm-dash" src="https://user-images.githubusercontent.com/20258196/143971722-f086e397-da88-4954-90b6-f20cfde2539b.png">
Create New Resume 1/2:
<img width="1161" alt="new-resume-1" src="https://user-images.githubusercontent.com/20258196/143971761-52b750b4-3dcf-4f83-a0a1-dae34ad4a8cb.png">
Create New Resume 2/2:
<img width="1169" alt="new-resume-2" src="https://user-images.githubusercontent.com/20258196/143971795-6c7c0ff6-548f-4071-9c1e-80a76954a120.png">




## How-To-Use
There are 2 ways to use this project.
1. Visit our deployed application at Heroku. (link below)
2. Clone this git repository.

### Using our deployed version
Please visit our deployed application for the client version.

### Using locally via `git clone`
Once you clone our repository, make sure to install all dependencies.
Run the following command inside nomad root folder to install all dependencies: `npm install`

At the `db` folder, we have provided 2 JSON files to be used as a collection for the database.
1. UI_UX_Resumes.json
2. SWE_Resumes.json
3. PM_Resumes.json
4. Users.json

#### Creating local database
Before running the program we first need to create a local database.
Run the following command in your terminal to start local mongo server: `mongod --dbpath ~/data/db`
Keeping the local server running, open a new terminal and run the following to create nomadLocalDB database and import the given JSON files as collections:
1. Projects collection
```
mongoimport -h localhost:27017 -d nomadLocalDB -c Projects --drop --jsonArray --file ./db/Projects.json 
```
2. Users collection
```
mongoimport -h localhost:27017 -d nomadLocalDB -c Users --drop --jsonArray --file ./db/Users.json 
```
NOTE: In `./db/myMongoDB.js` make sure the global constant is saying `DB_NAME = "nomadLocalDB"`, otherwise the program cannot find the local database.

#### Running locally
Once the local database has been created, follow these steps to run locally:
1. Open a terminal session and run Mongo server: `mongod --dbpath ~/data/db`
2. Install the `node_modules` folder in the backend at ~/resumeDoc with the command `yarn install`
3. Run the command `yarn start` to start the node backend server at port 3001
4. Open a new terminal session and install the `node_modules` folder in the frontend at ~/resumeDoc/frontend with the command `yarn install`
5. Run the command `yarn start` to start the react development sever at port 3000
6. Using your browser go to localhost: http://locahost:3000/ 

-
### Relevant Links
[Demo](https://resume-doc.herokuapp.com/)
[Video] https://www.youtube.com/watch?v=-6xqQKdKb9c
[Slides] https://docs.google.com/presentation/d/1BTYYXypbosWAm4gJ2Wu3WdDcv5MKs_HqppMUeoTTZis/edit?usp=sharing
[Class](https://johnguerra.co/classes/webDevelopment_fall_2021/)
