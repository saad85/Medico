import jwt from 'jsonwebtoken';
const jwtSecret = 'SUPERSECRETE20220';

export default (req,res)=>{
    if(req.method ==='GET'){

        let cookiesToken = req.cookies && req.cookies.token ? req.cookies.token : '';

        if(!cookiesToken){
        
            res.status(401).json({message: 'Unable to auth'});
            return null;
        
        } else {

            let decoded = '';

            try{
                decoded = jwt.verify(cookiesToken,jwtSecret);
                
                if(decoded ){

                    res.json(decoded);;

                    return true;
                
                } else res.status(401).json({message:"Unable to auth"});
                
            
            }catch(e){

                console.log("Token not verified. ",e);
            }
        }
    }
}