const ApiError = require("../errors/ApiError");
const Sequelize = require("../DB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const initModels = require("../models/init-models");
const uuid = require("uuid");
const path = require("path");
const models = initModels(Sequelize);
const Users = models.Users;

const generateToken = (id, email, role) => {
    return jwt.sign({id, email, role},  process.env.SECRET_KEY , {
        expiresIn: "12h",
    });
};

class UsersController {
    async registration(req, res, next) {
        const {FirstName, LastName, Email, Password, PhoneNumber, Role} =
            req.body;
        if (!FirstName || !LastName || !Email || !Password || !PhoneNumber) {
            return next(ApiError.badRequest("Некорректно введены данные"));
        }
        const candidate = await Users.findOne({where: {Email}});
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким Email уже существует"));
        }
        const hashPassword = await bcrypt.hash(Password, 3);
        const user = await Users.create({
            FirstName,
            LastName,
            Email,
            Password: hashPassword,
            PhoneNumber,
            Role
        });
        const token = generateToken(user.ID, Email, user.Role);
        res.json({token});
    }
    async getUser(req,res,next){
        const  ID  = req.params;
        console.log('tesssssssssssst')
        console.log(ID.ID)
        const user  = await Users.findOne({attributes: ['ID', 'FirstName','LastName','Email','PhoneNumber'],where: {ID:ID.ID}})
        res.json(user)
    }


    async updateUser(req,res,next){
        try {
            const {ID,FirstName, LastName, Email, Password, PhoneNumber} =
                req.body;

            const updateUser = {};

            if (FirstName && FirstName!=='undefined') {

                updateUser.FirstName = FirstName;
            }
            if (LastName && LastName!=='undefined') {

                updateUser.LastName = LastName;
            }
            if (Email && Email!=='undefined') {

                updateUser.Email = Email;
            }
            if (Password && Password!=='undefined') {

                updateUser.Password = await bcrypt.hash(Password, 3);;
            }
            if (PhoneNumber && PhoneNumber!=='undefined') {

                updateUser.PhoneNumber = PhoneNumber;
            }

            const user = await Users.update({
                ...updateUser
            },{where:{ID}});

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async login(req, res, next) {
        const {Email, Password} = req.body;
        const user = await Users.findOne({where: {Email}});
        if (!user) {
            return next(ApiError.internal("Неверный логин или пароль"));
        }
        let comparePassword = bcrypt.compareSync(Password, user.Password);
        if (!comparePassword) {
            return next(ApiError.internal("Неверный логин или пароль"));
        }
        const token = generateToken(user.ID, user.Email, user.Role);

        res.json({token});
    }

    async check(req, res, next) {
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UsersController();
