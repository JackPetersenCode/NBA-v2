const express = require('express');
const router = express.Router();
//const Redis = require('redis');
//const { sequelize, User } = require('../models');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);
const bcrypt = require('bcrypt');

//const Redis = require('ioredis');

//const redisClient = new Redis(process.env.REDIS_URL);
const users = require('../services/userQueries');
const db = require('../pgPool')
/*router.get('../script.js.', function(req, res) {
    res.sendFile("C:/Users/jackp/desktop/coding/photocaption/views/script.js");
});*/
const { hashPassword } = require('../middleware/authMiddleware')

let count = 1
/*
printData = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.email -------> ${req.body.email}`) 
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

router.use(printData)
*/
const checkAuthenticated = async(req, res, next) => {
    console.log(req.isAuthenticated)
    console.log('CRAPPPPPPPPPPPPPPPPPPPP')
    if (req.isAuthenticated()) { 
        console.log(req.session.passport)
        return next() 
    }
    let error = {
        status: 403,
        message: 'not authenticated'
    }
    return next(error);
}

/*router.get("/", (req, res, next) => {
    res.redirect("/users/login");
});


/*
router.get('/', (req, res, next) =>{
    res.sendFile(__dirname + "/views/index");
})
*/

router.get('/fakedb', users.getFakeDb);
router.get('/ballers', users.getBallers);

router.post('/ballers', users.postBallers);

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', async(req, res, next) => {
    let { name, email, password, password2 } = req.body;
    console.log({
        name,
        email,
        password,
        password2
    });
    let role = 'user';
    let errors = [];
    let createdAt = "2020-03-23 00:00";
    let updatedAt = "2020-03-23 00:00";
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
        res.render('register', { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
            if (error) {
                return next(error);
            }
            if (results.rows[0]) {
                res.send('user with that email already exists!!!');
                res.render('register', { errors });
            } else {
                try {
                    db.query(`INSERT INTO users ( name, email, role, password, createdAt, updatedAt ) VALUES ($1, $2, $3, $4, $5, $6 )`,
                    [name, email, role, hashedPassword, createdAt, updatedAt], (error, results) => {
                        if (error) {
                            return next(error);
                        }                    
                        req.flash('success_msg', "you are now registered, please log in");
                        res.redirect("/users/login")
                    })
                } catch (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
            }
        })    
    }
});

router.get('/dashboard', (req, res) => {
    console.log(req.user);
    res.render("dashboard", { 
        user: req.user.name,
        userUuid: req.user.uuid,
        id: req.user.id
    });
});

/**
 * @swagger
 * /api/users:
 *    post:
 *      summary: Creates a new user
 *      produces:
 *        - application/json
 *      tags:
 *        - User
 *      requestBody:
 *        description: Data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: 
 *                  object
 *              properties:
 *                  name: 
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *        "201":
 *          description: returns created user
 *          schema:
 *            type: 
 *                object
 *            properties:
 *                name: 
 *                  type: string
 *                email: 
 *                  type: string
 *                password:
 *                  type: string
 */
/*router.post('/', async(req, res) => {
    console.log(req.body.password);
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = await hashPassword(req.body.password);
    if (await User.findOne({
        where: { email: email }
    })) {
        res.send('user with that email already exists!!!');
    } else {
        console.log('post user function');
        try {
            const user = await User.create({ name, email, role, password });
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
})*/

router.post('/', checkAuthenticated, async(req, res, next) => {
    console.log(req.body.password);
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = await hashPassword(req.body.password);
    const createdAt = req.body.createdAt;
    const updatedAt = req.body.updatedAt;
    let user = db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows[0]) {
            res.send('user with that email already exists!!!');
        } else {
            console.log('post user function');
            try {
                let newUser = db.query(`INSERT INTO users ( name, email, role, password, createdAt, updatedAt ) VALUES ($1, $2, $3, $4, $5, $6 )`,
                [name, email, role, password, createdAt, updatedAt], (error, results) => {
                    if (error) {
                        return next(error);
                    }
                    return res.json(results.rows[0]);
                })
            } catch (err) {
                console.log(err);
                return res.status(500).json(err);
            }
        }
    })
})

/**
 * @swagger
 * /api/users:
 *  get:
 *      description: Use to request all users
 *      responses:
 *          '200':
 *             description: A successful response
 * 
 */
router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users)
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})


router.get('/individual/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { uuid: uuid }
        });
        //set data to redis
        console.log('lllllllllllllllllllllllllllllllllllllll');
        res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})


router.put('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({where: { uuid }});
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();

        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})


router.delete('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({where: { uuid }});
        await user.destroy();
        return res.json({ message: 'user deleted' });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'something went wrong' })
    }
})


router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function(req, res) {
      res.send('ya man')
      console.log(req.session.passport)
});

router.get('/:email', users.getUserByEmail);

router.get('/:id', users.getUserById);

module.exports = { router, checkAuthenticated };