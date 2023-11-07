const jwt = require('jsonwebtoken')
const readerModel = require('../Models/readerModel');

const authentication =  (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ status: false, message: "Token not present" });
        }
        token = token.split(" ");

        jwt.verify(token[1], 'project', function (err, decoded) {
            if (err) return res.status(401).send({ status: false, message: err.message });

            req.userId = decoded._id;
            console.log(req.userId)
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}; 

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.userId;   
        let paramUserId = req.params.readerId;  
       
        if (paramUserId) {
            let userData = await readerModel.findOne({_id : paramUserId});
            console.log(userData)

           
            if (!userData) {
                return res.status(404).send({ status: false, message: "No user found for this UserId" });
            }
                
            if (userData._id.toString() !== tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access" });
            }

        }
        console.log("DONE")
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports={authentication, authorization};