import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
    try{
        const token = jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:"30d"
        });

        res.cookie('jwt',token,{
            httpOnly : true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
    }catch (e){
        res.status(500).json({message:e});
    }
}

export default generateToken;