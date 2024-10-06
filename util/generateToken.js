import jwt from 'jsonwebtoken';
const EXP_TIME = '30m';

const generateToken = (id, username) => {
    const token = jwt.sign(
        {id, username }, 
        process.env.JWT_SECRET, 
        {expiresIn: EXP_TIME},  // expiration time set to 30min
    );
    return token;
};

export default generateToken;