import mongodb from 'mongodb';
import assert from 'assert';
import bcrypt  from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { resolve } from 'path';


const MongoClient = mongodb.MongoClient;
const jwtSecret = 'SUPERSECRETE20220';

const url ="mongodb://localhost:27017/app-db";
const dbName = "app-db";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  

  export default async (req,res) =>{

    if(req.method === 'POST'){
        
        const body = req.body,
              {name,email,password} = body;

        checkValidation(name,email,password);
        
        const connectClient = connectToClient(email,password);

        connectClient.then(function(db){
            console.log("Connected to client == > ");

            createUser(db,name,email,password);
        })
    }
  };

  const checkValidation = (name,email,password) =>{
    try{

     
     assert.notEqual(null,name,'Email is required');
     assert.notEqual(null,email,'Email is required');
     assert.notEqual(null, password, 'Password is required');
    
     }catch(e){
      res.status(403).json({error: true, message: e.message});
    }
}

  const connectToClient = () =>{

    return new Promise(function(resolve,reject){

        client.connect(function(err){
            
            assert.equal(null, err);
            
            console.log("Connected to MongoDb Server ==> ");
    
            const db= client.db(dbName);
    
            resolve(db);
        
        });
    });
  }

  const createUser = (db,name,email,password) =>{

    const findUsers =  findUser(db,email,password);
    
    console.log("findUsersfindUsers ",findUsers);
        
        findUsers.then(function(users){

          console.log("users == >",users);
          console.log("users == >",users.length);
                
            if(!users){

              console.log("Not Okay >");
                 const insertUsers = createUsers(db,name,email,password, function(creationResult) {
                    if (creationResult.ops.length === 1) {
                        const user = creationResult.ops[0];
                        const token = jwt.sign(
                        {userId: user.userId, email: user.email},
                            jwtSecret,
                            {
                              expiresIn: 3000, //50 minutes
                            },
                        );
                    
                        res.status(200).json({token});
                         
                        return;
                        }
                    });

                    insertUsers.then(function(value){
                        console.log(value);
                    })
                }
            });

  }

  

  const findUser = (db,email,password) =>{

    console.log("email,password in find ",email,password);

    return new Promise(function(resolve,reject){

        const collection = db.collection('users'),
              users = collection.findOne({email:email}) || [];

              console.log("users ",users);
        
        resolve(users);
    });
  }

  const createUsers = (db,name,email,password) =>{

    return new Promise(function(resolve, reject){

        const collection = db.collection('user'),
        hashedPassword = getHashedPassword(password);

        hashedPassword.then(function(hashedPwd){
          
            const UsersCollection= db.collection('users');

            UsersCollection.insertOne( {
                userId: uuidv4(),
                name,
                email,
                password: hashedPwd,
              },function(err,userCreated){

                console.log("userCreated",userCreated);

                resolve(userCreated);

              });
        });
        
    });
  }

  const getHashedPassword = (password)=>{

    const saltRounds = 10;

    return new Promise(function(resolve,reject){
        
        bcrypt.hash(password,saltRounds,function(err,hash){
             if(hash) resolve(hash);
            else if(err) reject(err);
        });
    })
  }