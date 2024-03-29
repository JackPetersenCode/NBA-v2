const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const { User } = require('../models');
const db = require('../pgPool');

function initialize(passport) {

    const authenticateUser = async(email, password, done) => {
        const user = db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
            if (error) {
                return next(error);
            }
            
            if (results.rows[0]) {
                bcrypt.compare(password, results.rows[0].password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if(isMatch) {
                        let authUser = { id: results.rows[0].id, name: results.rows[0].name };
                        return done(null, authUser);
                    } else {
                        return done(null, false, { message: "invalid input" })
                    }
                })
            } else {
                return done(null, false, {message: "email is not registered"})
            }
        })
    }
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
      
        const user = db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
            if (error) {
                return next(error);
            }
            if (!results.rows[0]) {
                throw error;
            }
            return done(null, results.rows[0]);
        })
    })
}

module.exports = initialize;