const { response } = require('express')
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generateJWT');


module.exports = {
    async login(req, res = response) {
        const { email, password } = req.body;
        try {
            // verificar si el correo existe
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    msg: 'El usuario / password no son validos',
                })
            }
            // si el usuario está activo

            if (!user.status) {
                return res.status(400).json({
                    msg: 'The user is banned from our server',
                })
            }
            // verificar la contraseña
            const ValidPassword = bcryptjs.compareSync(password, user.password);
            if (!ValidPassword) {
                res.status(400).json({
                    msg: 'Usuario/ Password no son correctos',
                })
            }
            // generar JWT
            const token = await generarJWT(usuario.id)

            res.json(
                {
                    user,
                    token
                }
            )
        } catch (error) {
            return res.status(500).send({
                msg: 'Internal server error'
            })
        }

    },

}