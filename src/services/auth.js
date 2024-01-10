import jwt from "jsonwebtoken";
const secret = "Vishal@123$%"

export const setUser = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, secret);
}

export const getUser = (token) => {
    if(!token)
        return null;

    try{
        return jwt.verify(token, secret);
    } catch(err){
        return null;
    }
}

