
const AdminUtils = {
    isModAdmin:function(user){
        var role = this._getRole(user);
        return role === 'admin' || role === 'modadmin';
    },
    isAdmin:function(user){
        var role = this._getRole(user);
        return role === 'admin' || role === 'modadmin';
    },
    isMember:function(){
        var role = this._getRole(user);
        return role === 'admin' || role === 'modadmin' || role === 'member';
    },
    _getRole:function(decoded){
        if(decoded){
            return decoded.role;
        }
    }
};

module.exports = AdminUtils;