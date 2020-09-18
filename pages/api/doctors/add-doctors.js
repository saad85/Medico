import mongodb from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const url ="mongodb://localhost:27017/app-db";
const dbName = "app-db";


const MongoClient = mongodb.MongoClient;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async (req,res) =>{

    const body = req.body;

    const connectClient = connectToClient();

    connectClient.then(function(db){
        console.log("Connected to client == > ");

         addDoctor(db,body).then(function(createdDoctor){
             res.status(200).json(createdDoctor)
         });
    });



}

const connectToClient = () =>{

    return new Promise(function(resolve,reject){

        client.connect(function(err){
            
            if(!err){
                console.log("Connected to MongoDb Server ==> ");
    
                const db= client.db(dbName);
        
                resolve(db);
            }  
        });
    });
}

async function addDoctor (db,params){
    
    const {name,email,speciality,officeLocation,officeTime} = params,
        
    DoctorsCollection= await db.collection('doctors');
    
    return new Promise(function(resolve,reject){
        DoctorsCollection.insertOne( {
            userId: uuidv4(),
            name,
            email,
            speciality,
            officeLocation,
            officeTime,
            createdAt:new Date()
            },function(err,doctorCreated){
                resolve(doctorCreated)
        });
    }) 
}