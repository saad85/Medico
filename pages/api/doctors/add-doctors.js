import mongodb from "mongodb";
import { v4 as uuidv4 } from "uuid";
const ObjectID = require("mongodb").ObjectID;

const url = "mongodb://localhost:27017/app-db";
const dbName = "app-db";

const MongoClient = mongodb.MongoClient;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async (req, res) => {
  const body = req.body,
    query = req.query,
    context = query && query.eventType ? query.eventType : "",
    doctorId = query && query.doctorId ? query.doctorId : "";

  const connectClient = connectToClient();

  connectClient.then(function (db) {
    if (context === "editModal" && doctorId) {
      updateDoctor(db, body, doctorId).then(function (updatedDoc) {
        res.status(200).json(updatedDoc);
      });
    } else {
      addDoctor(db, body).then(function (createdDoctor) {
        res.status(200).json(createdDoctor);
      });
    }
  });
};

const connectToClient = () => {
  return new Promise(function (resolve, reject) {
    client.connect(function (err) {
      if (!err) {
        console.log("Connected to MongoDb Server ==> ");

        const db = client.db(dbName);

        resolve(db);
      }
    });
  });
};

async function addDoctor(db, params) {
  const {
      name,
      email,
      speciality,
      officeLocation,
      workDays,
      workingStartTime,
      workingEndTime,
    } = params,
    DoctorsCollection = await db.collection("doctors");

  return new Promise(function (resolve, reject) {
    DoctorsCollection.insertOne(
      {
        name,
        email,
        speciality,
        officeLocation,
        workDays,
        workingStartTime,
        workingEndTime,
        createdAt: new Date(),
      },
      function (err, doctorCreated) {
        resolve(doctorCreated);
      }
    );
  });
}

async function updateDoctor(db, params, doctorId) {
  const { name, email, speciality, officeLocation, workDays, workingStartTime,workingEndTime } = params,
    DoctorsCollection = await db.collection("doctors");

  return new Promise(function (resolve, reject) {
    console.log("doctorId before update", doctorId);
    DoctorsCollection.updateOne(
      { _id: new ObjectID(doctorId) },
      { $set: { name, email, speciality, officeLocation,  workDays, workingStartTime,workingEndTime } },
      { upsert: true },
      function (err, updatedDoc) {
        resolve(updatedDoc);
      }
    );
  });
}
