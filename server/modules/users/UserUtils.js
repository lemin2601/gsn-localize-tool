const jwt = require('jsonwebtoken')

const UserUtils = {
    getUser:function(req){
        var token = this._getToken(req);
        console.log("token:" + token);
        if(token && token !== ''){
            var decoded = this._verify(token);
            return decoded;
        }
        return null;
    },
    _getToken:function(req){
        if(req.headers){
            return req.headers['authorization'];
        }
        return '';
    },
    /**
     * return decoded
     * @param {} token 
     */
    _verify:function(token){
        return jwt.verify(token, process.env.SECRET_KEY)
    }
}

module.exports = UserUtils;