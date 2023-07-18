const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function(id, usr, pwd){
    return _createToken(id, usr, pwd);
}

_createToken = function(id, usr, pwd){
    var ret = '';

    try{
        const expiration = new Date();
        const user = {id:id, username:usr, password:pwd};

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'10m'});

        ret = {accessToken:accessToken};
    }
    catch(e){
        ret = {error:e.message};
    }

    return ret;
}

exports.isExpired = function(token){
    var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        (err, verifiedJWT) =>
        {
            if(err){
                return true;
            }
            else{
                return false;
            }
        });

    return isError;
}

exports.refresh = function(token){
    var ud = jwt.decode(token, {complete:true});

    var userID = ud.payload.id;
    var username = ud.payload.username;
    var pwd = ud.payload.password;

    return _createToken(userID, username, pwd);
}