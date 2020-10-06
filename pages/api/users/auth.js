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

  function findUser(db, email, callback) {
    const usersCollection = db.collection('users');
    usersCollection.findOne({email}, callback);
  }
  
  function authUser(db, email, password, hash, callback) {
    bcrypt.compare(password, hash, callback);
  }

  function setJsonWebToken (user){
    return jwt.sign(
        {userId: user.userId, email: user.email},
        jwtSecret,
        {
          expiresIn: 30000, //500 minutes
        },
      );

  }

  export default (req, res) => {

    if (req.method === 'POST') {
      //login
      try {
        assert.notEqual(null, req.body.email, 'Email required');
        assert.notEqual(null, req.body.password, 'Password required');
      } catch (bodyError) {
        res.status(403).send(bodyError.message);
      }
  
      client.connect(function(err) {
        assert.equal(null, err);

        console.log('Connected to MongoDB server =>');

        const db = client.db(dbName);
        const email = req.body.email;
        const password = req.body.password;
  
        findUser(db, email, function(err, user) {
          if (err) {
            res.status(500).json({error: true, message: 'Error finding User'});
            return;
          }
          if (!user) {
            res.status(404).json({error: true, message: 'User not found'});
            return;
          } else {
              
            authUser(db, email, password, user.password, function(err, match) {
              
              if (err)  res.status(500).json({error: true, message: 'Auth Failed'});
              else if (match) {
            
                let token = setJsonWebToken(user);

                res.status(200).json({token,userId:user._id});
              
            } else res.status(401).json({error: true, message: 'Auth Failed'});
            });
          }
        });
      });
    } else {
      // Handle any other HTTP method
      res.statusCode = 401;
      res.end();
    }
  };