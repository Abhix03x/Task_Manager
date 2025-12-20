import { registerUser,loginUser } from "../services/authService.js";

export const register = async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        const data = await registerUser({name, email,password});
        res.status(201).json({
            user:{
                id:data.user._id,
                name:data.user.name,
                email:data.user.email,
            },
            token:data.token,
        });
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

export const login = async(req,res) =>{
    try{
        const {email, password} =req.body;
        const data = await loginUser({email, password});
        res.status(200).json({
            user:{
                id:data.user._id,
                name:data.user.name,
                email:data.user.email,
            },
            token:data.token,
        });
    }catch(err){
        res.status(400).json({error:err.message});
    }
};