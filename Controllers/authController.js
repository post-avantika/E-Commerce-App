import User from  '../Models/User.js';
import config from 'config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup=(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(400).json({msg:'Enter all the fields'});
    }
    User.findOne({email}).then(user=>{
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }
        const newUser = new User({name,email,password});
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if (err) throw err;
                newUser.password=hash;

                newUser.save().then(user=>{
                    jwt.sign({id:user._id},config.get('jwtsecret',{expiresIn:3600},(err,token)=>{
                        res.json({
                            token,
                            user:
                            {id:user._id,
                            name:user.name,
                            email:user.email
                            }
                        })
                    }))
                })
            })
        })
    })

}

export const login=(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({msg:'Enter all fields'});
    }
    User.findOne({email}).then(user=>{
        if(!user) return res.status(400).json({msg:'No user found'});
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(!isMatch){
                return res.status(400).json({msg:'Invalid credentials'});
            }
            jwt.sign(
                {id:user._id},
                config.get('jwtsecret'),{expiresIn:3600},
                (err,token)=>{
                    if(err) throw err;
                    res.json({token,
                    user:{
                        id:user._id,
                        name:user.name,
                        email:user.email
                    }})
                }
            )
        })
    })
}


export const get_user=(req,res)=>{
    User.findById(req.user.id).select('-password').then(user=> res.json(user));
}

