// repositories/users.js
const { User } = require('../models');
const { Op } = require("sequelize");

class UsersRepository {
    constructor(){
        this.Users = User
    }
    
    // 유저 정보 조회 by 이메일과 닉네임
    findUserAccount = async ( email, nickname ) => {
        const findUserAccountData = await this.Users.findOne({
            where: {
                [Op.or]: [{ email }, { nickname }],
            },
        });
        return findUserAccountData;
    };

    // 회원가입
    createAccount = async ( email, nickname, password ) => {
        const createAccountData = await this.Users.create({
            email,
            nickname,
            password
        });
        return createAccountData;
    };
    
    // 로그인
    login = async ( email, password ) => {
        const loginData = await this.Users.findOne({ where: { email, password } });
        return loginData;
    };
}

module.exports = UsersRepository;