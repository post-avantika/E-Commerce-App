import config from 'config';
import jwt from 'jsonwebtoken';

const auth=(req,res,next)=>{
    if(!token){
        return res.status(401).json({msg: 'Not token'})
    }

    try{
        const decoded=jwt.verify(token,config.get('jwtsecret'));
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(400).json({msg: 'Invalid token'});
    }
};
export default auth;