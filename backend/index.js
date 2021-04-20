const bodyParser = require('body-parser');
const{ Router } = require('express');


const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        return res.json({ message: "Foo" })

    });

router.get('/logout', (req, res) => { 
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})



/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body 
            if (!username || !email || !password)
                return res.json( {message: "Cannot register with empty string"})
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});


//********************************************************************************************************************************************** */


app.use(cors())
app.use('/api',bodyParser.json(),router);
app.use('/api',bodyParser.urlencoded({extended : false}),router);



let produce = {
    list: [
        {id : 1, nameproduce : "Toyota", cost: 700},
        {id : 2, nameproduce : "IZUSU", cost: 500 },
        {id : 3, nameproduce : "Honda", cost: 500},

    ]
}

router.route('/produce')
    .get((req,res)=>res.json(produce))
    .post((req,res) =>{
        let id = (produce.list.length)?produce.list[produce.list.length-1].id+1:1
        let nameproduce = req.body.nameproduce
        let cost = req.body.cost

        produce = {list:[...produce.list,{id,nameproduce,cost}]}
        res.json(produce)
    })

router.route('/produce/:produce_id')
    .get((req,res)=>{
        let ID = produce.list.findIndex(item => (item.id === +req.params.produce_id))
        res.json(produce.list[ID])
    })
    .put((req,res)=>{
        let ID = produce.list.findIndex(item => (item.id === +req.params.produce_id))

        if(ID >= 0){
            produce.list[ID].nameproduce = req.body.nameproduce
            produce.list[ID].cost = req.body.cost

            res.json(produce)
        }
        else{
            res.json({status: " Produce Error"})
        }

    })
    .delete((req,res)=>{
        let ID =produce.list.findIndex(item => (item.id === +req.params.produce_id ))
        produce.list = produce.list.filter(item => item.id !== +req.params.produce_id)
        res.json(produce)
    })



 /*********************************************************************************************************** */
 let admin = {
    list: [
        {id : 1, nameproduce : "Honda", cost: 500},

    ]
}

router.route('/admin')
    .get((req,res)=>res.json(admin))
    .post((req,res) =>{
        let id = (admin.list.length)?admin.list[admin.list.length-1].id+1:1
        let nameproduce = req.body.nameproduce
        let cost = req.body.cost

        admin = {list:[...admin.list,{id,nameproduce,cost}]}
        res.json(admin)
    })

router.route('/admin/:admin_id')
    .get((req,res)=>{
        let ID = admin.list.findIndex(item => (item.id === +req.params.admin_id))
        res.json(admin.list[ID])
    })
    .put((req,res)=>{
        let ID = admin.list.findIndex(item => (item.id === +req.params.admin_id))

        if(ID >= 0){
            admin.list[ID].nameproduce = req.body.nameproduce
            admin.list[ID].cost = req.body.cost

            res.json(admin)
        }
        else{
            res.json({status: " Produce Error"})
        }

    })
    .delete((req,res)=>{
        let ID =admin.list.findIndex(item => (item.id === +req.params.admin_id ))
        admin.list = admin.list.filter(item => item.id !== +req.params.admin_id)
        res.json(admin)
    })



// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

