const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const AdminUtils = require('../../AdminUtils')
const UserUtils = require('../../../users/UserUtils')
const ErrorCode = require('../../../../config/ErrorCode')
const User = require('../../../users/models/User');
users.use(cors())

/**
 * get thong tin user
 * /?from=0&offset=10;
 */
users.get('/', (req, res) => {
    let user = UserUtils.getUser(req);
    console.log("get all user from:" + JSON.stringify(user));
    if (user != null) {
        if (AdminUtils.isModAdmin(user)) {

            let from = req.query.from;
            let offset = req.query.offset;
            if (from == null) from = 0;
            if (offset == null) offset = 10;

            User.findAll({
                offset: parseInt(from),
                limit: parseInt(offset)
            })
                .then(users => {
                    if (users) {
                        res.json(users);
                    } else {
                        res.json([]);
                    }
                })
                .catch(err => {
                    res.status(400).json({ error: err })
                })
        }else{
            res.status(400).json({ error: ErrorCode.NOT_ENOUGH_PERMISSION })    
        }
    } else {
        res.status(400).json({ error: ErrorCode.NOT_LOGIN })
    }
})
/**
 * cap nhat thong tin nguoi dung
 * 
 */
users.put('/', (req, res) => {
    let mod = UserUtils.getUser(req);
    if (mod != null) {
        if (AdminUtils.isModAdmin(mod)) {
            let id = req.body.id;
            let password = req.body.password;
            let role = req.body.role;
            if (role) {
                if (role === 'admin' || role === 'modadmin' || role === 'member') {

                } else {
                    res.json("role invalid, [modadmin,member]");
                    return;
                }
                if(role === 'admin'){
                    if(!AdminUtils.isAdmin(mod)){
                        res.json("role invalid, [modadmin,member]");
                        return;
                    }
                }
            }
            User.findOne({
                where: {
                    id: id
                }
            })
                .then(user => {
                    if (AdminUtils.isAdmin(user)) {
                        if (!AdminUtils.isAdmin(mod)) {
                            res.json("not enough permission update role, contact admin");
                            return;
                        }

                        if (user.user === 'admin') {
                            if (role !== 'admin') {
                                res.json("can't update permission admin");
                                return;
                            }
                        }
                    }
                    if (!user) {
                        if (password) {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (role) {
                                    User.update({ password: hash, role: role }, { where: { id: id } })
                                        .then(user => {
                                            res.send('updated');
                                        })
                                        .catch(err => {
                                            res.send('error: ' + err)
                                        })
                                } else {
                                    User.update({ password: hash }, { where: { id: id } })
                                        .then(user => {
                                            res.send('updated');
                                        })
                                        .catch(err => {
                                            res.send('error: ' + err)
                                        })
                                }
                            })
                        } else {
                            if (role) {
                                User.update({
                                    role: role
                                }, {
                                    where: {
                                        id: id
                                    }
                                }).then(user => {
                                    res.send('updated');
                                })
                                    .catch(err => {
                                        res.send('error: ' + err)
                                    })
                            } else {
                                res.json("nothing update, only update password,role, contact admin to update other!");
                            }
                        }
                    } else {
                        res.json({ error: 'User already exists' })
                    }
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
        }
    } else {
        res.status(400).json({ error: ErrorCode.NOT_LOGIN })
    }
})
/**
 * them moi thong tin nguoi dung
 */
users.delete('/', (req, res) => {
    let user = UserUtils.getUser(req);
    if (user != null) {
        if (AdminUtils.isAdmin(user)) {
            let id = req.query.id;
            if (id && id != '') {
                id = parseInt(id);
                User.destroy({
                    id: id
                })
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        res.status(400).json({ error: err })
                    })
            }
        }
    } else {
        res.status(400).json({ error: ErrorCode.NOT_LOGIN })
    }
})
module.exports = users