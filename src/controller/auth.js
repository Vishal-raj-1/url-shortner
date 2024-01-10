import User from "../model/user.js"
import { setUser } from "../services/auth.js";

export const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.find({email, password});

    if(!user){
        return res.render("login")
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.render("home")
}

export const handleUserSignup = async (req, res) => {
    const {name, email, password} = req.body;

    await User.create({
        name, email, password
    })

    return res.redirect("/");
}