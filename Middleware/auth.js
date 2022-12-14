const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token)
            return res.status(401).send({ status: false, msg: "token is required" });
           token=token.slice(7)
        jwt.verify(token,"task1", (error, decoded) =>{
            if (error) {
               let message=(error.message=="jwt expired"?"token is expired,please login again":"token is invalid,not authenticated")
                 return res.status(401).send({ status: false, msg:message });
            } else {
              req.token = decoded;
                next(); }
        });
    } catch (error) {
        res.status(500).send({ status: false, err: error.message });
    }
};
module.exports={authentication}