// services/users.js

const UsersRepository = require('../repositories/users.js');

class UserService {
    usersRepository = new UsersRepository(); 
    // 유저 정보 찾기
    findUserAccount = async (email, nickname) => {
        const findUserAccountData = await this.usersRepository.findUserAccount(
            email, 
            nickname
        );
        return findUserAccountData;
    }

    // 회원가입
    createAccount = async (email, nickname, password) => {
        const createAccountData = await this.usersRepository.createAccount(
            email,
            nickname,
            password
        );
        return {
            userId: createAccountData.userId,
            email: createAccountData.email,
            nickname: createAccountData.nickname,
            password: createAccountData.password
        };
    };

    // 로그인
    login = async (email, password) => {
        const loginData = await this.usersRepository.login( email, password );
        if (loginData === null) return loginData;
        return {
            userId: loginData.userId,
            email: loginData.email,
            password: loginData.password
        };
    };
}

module.exports = UserService;