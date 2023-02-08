const soap = require('./soapRequest');
const pool = require('./db');
const queries = require('./queries');
const config = require('./config/default.js');

const getSubRequests = async (req, res) => {
    // console.log('querying sub requests..');
    const { creator_id, subscriber_id, status } = req.query;
    try {
        if (!req.isadmin) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        // url param
        const payload = {
            'arg0': creator_id || null,
            'arg1': subscriber_id || null,
            'arg2': status || null
        };
        let response = await soap.SOAPRequest('getSub', req.apikey, payload);
        // console.log(response);
        if (response.status == '401') {
            res.status(401).json({ message: 'Unauthorized' });
        } else if (response.status == '404') {
            res.status(404).json({ message: 'Not Found' });
        } else if (response.status == '500') {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            var list = [];
            var result = response.content.value;
            if (typeof result == 'string') {
                var splitted = result.split(',');
                var creator_info = await pool.query(queries.getUserByID, [parseInt(splitted[1])]);
                var obj = {
                    'creator_info': {
                        id_user: creator_info.rows[0].id_user,
                        email: creator_info.rows[0].email,
                        username: creator_info.rows[0].username,
                        name_user: creator_info.rows[0].name_user,
                        isadmin: creator_info.rows[0].isadmin
                    },
                    'subscriber_info': {
                        id_user: splitted[2]
                    },
                    'status': splitted[3]
                };
                list.push(obj);
            } else {
                for (let i = 0; i < result.length; i++) {
                    var splitted = result[i].split(',');
                    var creator_info = await pool.query(queries.getUserByID, [parseInt(splitted[1])]);
                    var obj = {
                        'creator_info': {
                            id_user: creator_info.rows[0].id_user,
                            email: creator_info.rows[0].email,
                            username: creator_info.rows[0].username,
                            name_user: creator_info.rows[0].name_user,
                            isadmin: creator_info.rows[0].isadmin
                        },
                        'subscriber_info': {
                            id_user: splitted[2]
                        },
                        'status': splitted[3]
                    };
                    list.push(obj);
                }
            }
            res.status(200).json(list);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSub = async (req, res) => {
    // console.log('updating sub request..');
    try {
        if (!req.isadmin) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        const { creator_id, subscriber_id, status } = req.body;
        if (!creator_id || !subscriber_id || !status) {
            res.status(400).json({ message: 'Bad Request' });
        }
        const checkPayload = {
            'arg0': creator_id,
            'arg1': subscriber_id,
            'arg2': null
        };
        let checkSub = await soap.SOAPRequest('getSub', req.apikey, checkPayload);
        if (checkSub.status == '401') {
            res.status(401).json({ message: 'Unauthorized' });
        } else if (checkSub.status == '404') {
            res.status(404).json({ message: 'Not Found' });
        } else if (checkSub.status == '500') {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            const payload = {
                'arg0': creator_id,
                'arg1': subscriber_id,
                'arg2': status
            };
            let response = await soap.SOAPRequest('updateSub', req.apikey, payload);
            // console.log(response);
            if (response.status == '500') {
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Subscribe Request Updated' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPremiumSongs = async (req, res) => {
    // console.log('querying premium songs..');
    try {
        const { creator_id, subscriber_id } = req.query;
        const payload = {
            'arg0': creator_id || null,
            'arg1': subscriber_id || null,
            'arg2': "ACCEPTED"
        };
        let response = await soap.SOAPRequest('getSub', config.RESTAPIKey, payload);
        // console.log(response);
        if (response.status == '401') {
            res.status(401).json({ message: 'Unauthorized' });
        } else if (response.status == '404') {
            res.status(404).json({ message: 'Not found' });
        } else if (response.status == '500') {
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            let songlist = [];
            let result = response.content.value;
            if (typeof result == 'string') {
                var splitted = result.split(',');
                let song = await pool.query(queries.getSongAndArtistNameByArtistID, [splitted[1]]);
                songlist.push(song.rows);
            } else {
                for (let i = 0; i < result.length; i++) {
                    var splitted = result[i].split(',');
                    let song = await pool.query(queries.getSongAndArtistNameByArtistID, [splitted[1]]);
                    songlist.push(song.rows);
                }
            }
            res.status(200).json(songlist);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSubRequests,
    updateSub,
    getPremiumSongs
};