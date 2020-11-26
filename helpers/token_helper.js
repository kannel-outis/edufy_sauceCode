// jshint esversion: 6
const JWT = require('jsonwebtoken');
const createErrors = require('http-errors');

const NewRegisteredToken = function (userID) {

    return new Promise(function (resolve, reject) {

        JWT.sign({ userID }, process.env.TOKEN_SECRET_KEY, { expiresIn: '20m' }, function (err, token) {

            if (err) reject(err);

            resolve(token);

        });

    });

};



const SignedRefreshToken = function (userID) {

    return new Promise(function (resolve, reject) {

        JWT.sign({ aud: userID }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1y' }, function (err, token) {

            if (err) reject(err);

            resolve(token);

        });

    });

};

const verifyToken = function (req, res, next) {

    const auth_token = req.headers.authorization;

    if (!auth_token) return next(createErrors.Unauthorized());

    const token = auth_token.split(' ')[1];

    JWT.verify(token, process.env.TOKEN_SECRET_KEY, function (err, payload) {

        if (err) {

            const message = err.name === 'JsonWebTokenError' ? "Unauthorized" : err.message;
            return next(createErrors.Unauthorized(message));
        }

        req.payload = payload;

        next();

    });

};

const verifyRefreshToken = function (refreshToken) {
    return new Promise(function (resolve, reject) {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, function (err, payload) {
            if (err) {
                return reject(createErrors.Unauthorized());
            }
            const userId = payload.aud;
            console.log(payload.aud);
            resolve(userId);
        });
    });
};

module.exports = {
    NewRegisteredToken,
    SignedRefreshToken,
    verifyRefreshToken,
    verifyToken
};