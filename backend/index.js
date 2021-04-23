const bodyParser = require('body-parser');
const { Router } = require('express');


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
/*router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });*/

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
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

router.get('/alluser', (req, res) => res.json(db.users.users))

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
app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false }), router);



let produce = {
    list: [
        { id: 1,  cost: "500", image: "/toyota.PNG" },
        { id: 2,  cost: "1,200", image: "/isuzu.PNG" },
        { id: 3,  cost: "500", image: "/honda.PNG" },
        { id: 4,  cost: "30,000", image: "/ford.PNG" },

    ]
}

router.route('/produce')
    .get((req, res) => res.json(produce))
    .post((req, res) => {
        let id = (produce.list.length) ? produce.list[produce.list.length - 1].id + 1 : 1
        
        let cost = req.body.cost
        let image = req.body.image

        produce = { list: [...produce.list, { id, cost, image }] }
        res.json(produce)
    })

router.route('/produce/:produce_id')
    .get((req, res) => {
        let ID = produce.list.findIndex(item => (item.id === +req.params.produce_id))
        res.json(produce.list[ID])
    })
    .put((req, res) => {
        let ID = produce.list.findIndex(item => (item.id === +req.params.produce_id))

        if (ID >= 0) {
            
            produce.list[ID].cost = req.body.cost

            res.json(produce)
        }
        else {
            res.json({ status: " Produce Error" })
        }

    })
    .delete((req, res) => {
        let ID = produce.list.findIndex(item => (item.id === +req.params.produce_id))
        produce.list = produce.list.filter(item => item.id !== +req.params.produce_id)
        res.json(produce)
    })



/*********************************************************************************************************** */
let admin = {
    list: [
        { id: 1,  cost: "500", image: "/honda.PNG" },

    ]
}


router.route('/admin')
    .get((req, res) => res.json(admin))
    .post((req, res) => {
        let id = (admin.list.length) ? admin.list[admin.list.length - 1].id + 1 : 1
        
        let cost = req.body.cost
        let image = req.body.image

        admin = { list: [...admin.list, { id,  cost, image }] }
        res.json(admin)
    })

router.route('/admin/:admin_id')
    .get((req, res) => {
        let ID = admin.list.findIndex(item => (item.id === +req.params.admin_id))
        res.json(admin.list[ID])
    })
    .put((req, res) => {
        let ID = admin.list.findIndex(item => (item.id === +req.params.admin_id))

        if (ID >= 0) {
            
            admin.list[ID].cost = req.body.cost

            res.json(admin)
        }
        else {
            res.json({ status: " Produce Error" })
        }

    })
    .delete((req, res) => {
        let ID = admin.list.findIndex(item => (item.id === +req.params.admin_id))
        admin.list = admin.list.filter(item => item.id !== +req.params.admin_id)
        res.json(admin)
    })

/********************************************************************************************************************************************************* */
let profileuser = {
    list: [
        { id: 1, nameprofile: "game", call: "0908901837", day: "7", location: "PSU" },

    ]
}


router.route('/profileuser')
    .get((req, res) => res.json(profileuser))
    .post((req, res) => {
        let id = (profileuser.list.length) ? profileuser.list[profileuser.list.length - 1].id + 1 : 1
        let nameprofile = req.body.nameprofile
        let call = req.body.call
        let day = req.body.day
        let location = req.body.location

        profileuser = { list: [...profileuser.list, { id,nameprofile, call, day, location }] }
        res.json(profileuser)
    })

router.route('/profileuser/:profileuser_id')
    .get((req, res) => {
        let ID = profileuser.list.findIndex(item => (item.id === +req.params.profileuser_id))
        res.json(profileuser.list[ID])
    })
    .put((req, res) => {
        let ID = profileuser.list.findIndex(item => (item.id === +req.params.profileuser_id))

        if (ID >= 0) {
            
            profileuser.list[ID].call = req.body.call

            res.json(profileuser)
        }
        else {
            res.json({ status: " Produce Error" })
        }

    })
    .delete((req, res) => {
        let ID = profileuser.list.findIndex(item => (item.id === +req.params.profileuser_id))
        profileuser.list = profileuser.list.filter(item => item.id !== +req.params.profileuser_id)
        res.json(profileuser)
    })


// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

