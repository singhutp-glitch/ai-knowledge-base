import { validationResult } from "express-validator";
import {prisma} from '../../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const register = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })

    }
    try{

        const {name,email,password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where:{
                email,
            }
        });
        if(existingUser){
            return res.status(400).json({
                error:'Email already exist'
            })
        }
        const passwordHash = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                name,
                email,
                passwordHash
            }
        })
        
        res.status(201).json({
            id:user.id,
            email:user.email
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:'Error while creating user'
        })
    }
}


const login = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })

    }
    try{
        const {email,password} = req.body;
        const user = await prisma.user.findUnique({
            where:{
                email,
            }
        });
        if(!user){
            return res.status(401).json({
                error:'Invalid credentials'
            })
        }
        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }
        const token = jwt.sign({
            userId:user.id
        },
            process.env.JWT_SECRET,
        {
            expiresIn:'7d'
        }          
    )
        res.json({
            token,
            user:{
                name:user.name,
                email,
                password,
            }
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:'Error while loging user'
        })
    }
}

const sendUserInfo = async(req,res)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:req.user.userId
            }
        }) 
        if(!user){
            return res.status(404).json({
                error:'User not found'
            })
        }
        res.json({
            id:user.id,
            name:user.name,
            email:user.email
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            error:"Server error"
        })
    }
}


export default{
    register,
    login,
    sendUserInfo
}