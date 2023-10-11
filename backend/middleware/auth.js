
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const protect = async (req, res, next) => {
    try{

        const token = req.cookies.jwt;
        console.log(token);

        if(token){
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            console.log(req.user);

            next();
        }else{
            res.status(402).json({"message":"Invalid Token"});
        }
    }catch (e){
        res.status(402).json({"message":e});
    }
}

export { protect } ;