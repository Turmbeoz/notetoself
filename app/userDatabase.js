
const userMethods = {};
const User = require("./UserSchema")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")




userMethods.createUser = async (req, res, next) => {
    console.log("Creating User Funkiness")
    console.log(req.body);
    try{
        const salt = await bcrypt.genSalt();
        const hashedPW = await bcrypt.hash(req.body.password, salt);
        console.log(salt, hashedPW);
        const newPerson = await User.create({ name: req.body.email, password: hashedPW, notes: [] })
        console.log(newPerson)
        newPerson.save()
        next()
    }catch{
        console.log("Whoopsy");
        res.status(500).send()
    }
    next()

}

userMethods.checkIfUserExists = async (req, res, next) => {
    const isUser = await User.find({ name: req.body.email }).exec();
    console.log("Checking....")
    console.log(isUser);
    if (isUser.length > 0){
        // x = await User.deleteMany({ name: req.body.email})
        // console.log(x)
        res.status(200).send(JSON.stringify({message: "UserExists!"}));
        return;
    }else{
        console.log("No Other users with that email...");
        next()
    }
    
    
}

userMethods.verifyUser = async (req, res, next) => {
    // Returns an array - zero index if theres a match and [] if not
    const user = await User.find({name: req.body.email}).exec();
    console.log("Verifyig   Da perzooonn");
    if (user === null){
        return res.status(400).send("nonExistantUser")
    }
    try {
        if (await bcrypt.compare(req.body.password, user[0].password)){
            console.log("Skuccseesss!");
            return res.json({ message: 'LOGGED_IN', notes: user[0].notes, userData: user });
        }else{
            console.log(" ....Success but wrong password")
            return res.json({ message: 'WRONG_PASSWORD' });
        }
    } catch (error) {
        console.log(error)
    }
    next();
}




module.exports = userMethods;