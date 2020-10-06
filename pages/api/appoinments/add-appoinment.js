
import mongodb from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const url ="mongodb://localhost:27017/app-db";
const dbName = "app-db";

export default function(req,res){

    if(req.method ==="POST" && req.body){
        conncetToClient().then(function(db){
            addAppointment(db,req.body);
        });
    }

    
}

function conncetToClient(){

    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

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

function addAppointment(db,body){

    const [appoinmentWithDoctorId,
        createdBy,
        patientName,
        patientEmail,
        patientPhone,
        appoinmentDateTime,
        description] = body,
        AppointmentsCollection = await db.collection('appointments');

        return new Promise((resolve,reject)=>{
            AppointmentsCollection.insert({
                appoinmentWithDoctorId,
                createdBy,
                patientName,
                patientEmail,
                patientPhone,
                appoinmentDateTime,
                description
            },function(err,appointmentInfo){
                resolve(appointmentInfo);
            })
        })
}

