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
        req.body.userId = decodedToken.id;
        req.body.username = decodedToken.username;
        next(); 
    } catch (err) {
        res.status(403).json({message: 'Invalid token!'});
    } 
}

// const jwtValidation = (req, res, next) => {
//     // get token from header
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null || validator.isEmpty(token)) return res.status(401).json({ message: 'No token detected'});

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).json({message: 'Invalid token!'});
//         req.userId = user
//     })

//     // decoding token
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = decodedToken.id;
//         req.body.username = decodedToken.username;
//         next(); 
//     } catch (err) {
//         res.status(403).json({message: 'Invalid token!'});
//     } 


// }
export default jwtValidation;