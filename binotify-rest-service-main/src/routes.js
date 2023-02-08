const express = require('express');
const { Router } = require('express');
const userController = require('./userController');
const songController = require('./songController');
const soapController = require('./soapController');
const appController = require('./appController');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');
const queries = require('./queries');
const pool = require('./db');
const router = Router();
const multer = require('multer');
const filecfg = multer.diskStorage({
    filename: (req, file, cb) => {
        // random name
        cb(null, Date.now() + '-' + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, 'song/');
    }
});
const upload = multer({ storage: filecfg })

// router.get('/', () => { controller.getUsers(); });

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUsers', userController.getUsers);

router.get('/getSongs', authenticateToken, songController.getSongs);
router.post('/addSong', authenticateToken, upload.single('audio_file'), songController.addSong); 
router.post('/updateSong', authenticateToken, upload.single('audio_file'), songController.updateSong);
router.post('/removeSong', authenticateToken, songController.removeSong);

// SOAP
router.get('/getSubRequests', authenticateToken, soapController.getSubRequests);
router.post('/updateSub', authenticateToken, soapController.updateSub);
router.get('/getPremiumSongs', authenticateToken, soapController.getPremiumSongs);

// Binotify App
router.get("/app/singer", authenticateApp, appController.app_singer)
router.get("/app/song", authenticateApp, appController.app_song)

// testing
router.post('/test', async (req, res) => {
    console.log(req.body);
    console.log(req.headers)
    res.send('test');
});

// static files
router.use('/song', express.static('song'));

// auth app

async function authenticateApp(req, res, next) {
    try {
        const token = req.headers['authorization'];
        if (token === config.APPApiKey) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        };
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

// implement authentication middleware here for now
async function authenticateToken(req, res, next) {
    // if admin, then next()
    try {
        const token = req.headers['authorization'];
        if (token == null) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            let username = jwt.verify(token, config.access_token_secret);
            let id_user = await pool.query(queries.getUserByUsername, [username.name]);
            if (id_user.rows.length > 0) {
                req.user = username.name;
                req.user_id = id_user.rows[0].id_user;
                req.apikey = config.RESTAPIKey;
                if (id_user.rows[0].isadmin) {
                    req.isadmin = true;
                } else {
                    req.isadmin = false;
                }
                next();
            } else {
                return res.status(401).json({ message: 'Unauthorized' });
            };
        };
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

module.exports = router;