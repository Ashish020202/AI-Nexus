import {Request , Response} from 'express'

export const register = (req:Request,res:Response) => {
   const {email,password} = req.body;
   if(!email){
    res.status(200).json("email is required")
   }
}

export const login = () => {
    

}

