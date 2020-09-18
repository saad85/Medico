import mongodb from 'mongodb';

const url ="mongodb://localhost:27017/app-db";
const dbName = "app-db";

const MongoClient = mongodb.MongoClient;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//if there is email then check for only existing doctor
export default async function(req,res){
    if(req.method==="GET"){
        
        const query = req.query,
            email =query && query.email ?query.email : '' ;

        connectToClient().then(function(database){
            
            findDoctor(database,email).then(function(doctors){

                if(doctors.length) {
                  
                    if(email)  res.status(201).json({isDoctorExists:true});  
                    else res.status(201).json({doctorsList:doctors});
                
                } else res.status(210).json({isDoctorExists:false});
                    
            });
        });
        
    }


}

function connectToClient(){

    return new Promise(function(resolve,reject){
        
        client.connect(function(err, result){

            if(!err){

                console.log("Connected to MongoDb Server ==> ");

                const db = client.db(dbName);

                resolve(db);
            }
        })
    })
}

function findDoctor(database,email){

    

    return new Promise(function(resolve,reject){
        const DoctorsCollection = database.collection("doctors");

        let query = {};

        if(email) query.email = email;

        let doctor = DoctorsCollection.find(query).toArray();

        console.log("doctor ",doctor);
    
        doctor.then(function(result){
            resolve(result);
        });
    })

    

    
}