import validator from 'validator';

const jwtValidation = (req, res, next) => {
    // get token from header
    const token = req.headers.authorization.split(' ')[1];
    if (!token || validator.isEmpty(token)) {
        return res.status(401).json({ message: 'No token detected'});
    }

    // decoding token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userName = decodedToken;
        next(); 

    } catch (err) {
        res.status(403).json({message: 'Invalid token!'});
    } 

}

export default jwtValidation;