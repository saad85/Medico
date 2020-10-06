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

        console.log("name,email,password ",name,email,password);

      // checkValidation(name,email,password,res);
        
      const connectClient = connectToClient(email,password);

      connectClient.then(function(db){
        console.log("Connected to client == > ");

          createUser(db,name,email,password,res);
      })
  }
};

const checkValidation = (name,email,password,res) =>{
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
            
      console.log("Connected to MongoDb Server ==> ");
    
        const db= client.db(dbName);
    
          resolve(db);
        
    });
  });
}

const createUser = (db,name,email,password,res) =>{

  const findUsers =  findUser(db,email,password);

  console.log("findUsers ",findUsers);
        
  findUsers.then(function(users){
                
    if(!users){
      const insertUsers = createUsers(db,name,email,password, function(creationResult) {
        
        if (creationResult.ops.length === 1) {
          
          const user = creationResult.ops[0];

          console.log("user ",user);

          const token = jwt.sign({userId: user.userId, email: user.email},jwtSecret,{expiresIn: 300000});
                      
          res.status(200).json({token,userId:user._id});
        }
      });
    }
  });
}

  

  const findUser = (db,email,password) =>{

    return new Promise(function(resolve,reject){

        const collection = db.collection('users'),
              users = collection.findOne({email:email}) || [];
        
        resolve(users);
    });
  }

  const createUsers = (db,name,email,password,callback) =>{

    return new Promise(function(resolve, reject){

        const hashedPassword = getHashedPassword(password);

        hashedPassword.then(function(hashedPwd){
          
            const UsersCollection= db.collection('users');

            UsersCollection.insertOne( {
                name,
                email,
                password: hashedPwd,
                createdAt:new Date(),
                userType:"normal_user"
              },function(err,userCreated){
                callback(userCreated);
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