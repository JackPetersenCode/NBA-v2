const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const bcrypt = require('bcrypt');


const getFakeDb = async(request, response, next) => {
    db.query(`SELECT * FROM users`, (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows);
    })
}

const getUserByEmail = async(request, response, next) => {
    let { email } = request.params;
    db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
      })
}

const getUserById = async(request, response, next) => {
    let { id } = request.params;
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
      })
}

const createUser = async(request, response, next) => {
    let { name, email, password, password2 } = request.body;
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({message: 'please enter all fields'})
    }
    if (password.length < 6) {
        errors.push({message: 'password should be atleast 6 characters'})
    }
    if (password != password2) {
        errors.push({message: 'passwords do not match'})
    }
    if (errors.length > 0) {
        response.redirect('/register', { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
            console.log(user);
            if (error) {
                console.log('email not in database yet');
            }
        })
        if (user) {
            errors.push({message: 'user with that email already exists!!!'});
            response.render('/register', { errors });
        } else {
            db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword], (error, results) => {
                if (error) {
                    console.log(err);
                    return response.status(500).json(err);
                }
            })
            request.flash('success_msg', "you are now registered, please log in");
            console.log('here')
            response.redirect("/login")
        }    
    }
}

const getBallers = async(request, response, next) => {
    console.log('made it')
    db.query(`SELECT * FROM ballers
                ORDER BY score DESC`, (error, results) => {
        if (error) {
            return next(error);
        }
        console.log(results.rows)
        console.log(results)
        response.status(200).json(results.rows)
    })
}

const postBallers = async(request, response, next) => {
    const {body} = request.body;
    console.log(body)
    db.query(`INSERT INTO ballers (name, score, salary) VALUES ($1, $2, $3)`,
                [body.name, body.score, body.salary], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}


module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    getBallers,
    postBallers,
    getFakeDb
}