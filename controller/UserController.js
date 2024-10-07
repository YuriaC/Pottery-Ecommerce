import {User} from '../model/User.js';
import * as argon2 from 'argon2';
import getSalt from '../util/generateSalt.js';
import generateToken from '../util/generateToken.js';


// helper function for generating JWT token and couple jwt with a httpOnly cookie, returns cookie
const jwtCookie = (res, id, username) => {
    const token = generateToken(id, username);
    // console.log(`JWT token, ${token}, generated. \n`);  // debug
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'strict',
    });

    return token
}

// user register
const register = async (req, res) => {
    const {userName, email, password, rePassword} = req.body;
    try {
        
        // email and userName duplication check 
        const userNameCheck = await User.findOne({userName: userName});
        const emailCheck =  await User.findOne({email: email})
        if (userNameCheck) {return res.status(409).json({message:'This userName has been taken. Please choose a different one.'});}
        if (emailCheck) {return res.status(409).json({message:'This email address has been used. Please login with this email address or register with a new email.'});}
        if (password !== rePassword) {return res.status(409).json({message:`Passwords don't match up. Please double check your input.`})};

        // hash password + salt
        const salt = await getSalt();
        const saltedPassword = password + salt 
        // console.log(`salt is ${salt}, password is ${password}, saltedPswd is ${saltedPassword}`);  // debug
        const hashedPwd = await argon2.hash(saltedPassword);

        // create user document
        const user = await User.create({
            userName,
            email,
            salt: salt,
            password : hashedPwd,
        });
        // console.log(`User document for ${user.userName} created. \n`);  // debug
        
        // generate JWT token
        const token = jwtCookie(res, user._id, userName);
        // console.log(`JWT token, ${token}, generated. \n`);  // debug

        return res.status(201).json({data: token, message:`Welcome, ${userName}! You are registered to YJ's Ecommerce Site!`});
        } catch (e) {
        return res.status(500).json({message: `ERROR: ${e}.`});
    }
};

// user login
const login = async (req, res) => {
    // user can login with either userName or email
    const {credential, password} = req.body;
    try {
        let user = await User.findOne({email: credential}).select(['userName','password','salt']).lean().exec() 
        if (!user) {
            // console.log('no matching email found, searching username');  // debug
            user = await User.findOne({userName: credential}).select(['userName','password','salt']).lean().exec();
            if (!user) {
                // console.log('did not find matching username either...');  // debug
                return res.status(404).send({message:"User doesn't exist."});
            } 
        } 

        // verify hashed password
        const saltedPassword = password + user.salt; 
        const validPassword = await argon2.verify(user.password, saltedPassword);
        if (!validPassword) {
            return res.status(401).json({message:"Wrong password!"});
        }

        //generate JWT TOKEN
        const token = jwtCookie(res, user._id, user.userName);
        // console.log(`JWT token, ${token}, generated. \n`);  // debug
        
        return res.status(200).json({data: token, message:`Login Successful. Welcome, ${user.userName}!`});
    } catch (e) {
        return res.status(500).json({message: `ERROR: ${e}.`});  
    }
};


// user log out
const logout = (_req, res) => {
    try {
        res.clearCookie('token'); // clear cookie in browser;
        // invalidate the token

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const verifyToken = (req, res) => {
    const { userName } = req.body;
    try {
        return res.status(200).json({ userName });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export {register, login, logout, verifyToken};