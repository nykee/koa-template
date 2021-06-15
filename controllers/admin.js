const admin = require('../model/admin')
const Op = require('sequelize').Op
const { genPassword } = require('../utils/cryp')
const jsonwebtoken =require("jsonwebtoken")
const config = require('../config')

const loginIn = async (ctx) => {
    const user = ctx.request.body
    const data = await admin.findOne({
        where: {
            name: {
                [Op.eq]: `${user.name}`
            },
            password: genPassword(user.password)
        }
    });

    if(data){
        let userToken = {name: user.name,password:genPassword(user.password)};
        const SECRET = config.secret;
        ctx.body = {
            code:200,
            data,
            token:jsonwebtoken.sign(
                userToken,  // 加密userToken, 等同于上面解密的userToken
                SECRET,
                {expiresIn: '1h'}  // 有效时长1小时
            ),
            desc:"登陆成功"
        }
    }else {
        ctx.body = {
            code: 203,
            data,
            desc: '账号或密码错误'
        }
    }

};

const register = async (ctx) => {
    const user = ctx.request.body;
    if (!user.name || !user.password) {
        ctx.body = "用户名或密码不能为空！"
    } else {
        try {
            if(await admin.findOne({
                where: {
                    name: {
                        [Op.eq]: `${user.name}`
                    },
                }
            })){
                ctx.body = {
                    code: 203,
                    data: '用户已存在'
                }
            }else {
                user.password = genPassword(user.password)
                await admin.create(user)
                ctx.body = {
                    code: 200,
                    data: '创建成功'
                }
            }


        } catch (err) {
            console.log(err);
            const msg = err.errors[0]
            ctx.body = {
                code: 300,
                data: msg.value + msg.message
            }
        }
    }


};

const logout = async ctx => {
    const user = ctx.request.body;
    ctx.body={
        code:200,
        data:"登出成功"
    }

};

module.exports = {
    loginIn,
    register,
    logout
}