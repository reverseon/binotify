const pool = require('./db');
const queries = require('./queries');
const soap = require('./soapRequest');
const config = require('./config/default.js');
const app_singer = async (req, res) => {
    try {
        const { username } = req.query;
        if (username) {
            let users = await pool.query(queries.getUserByUsername, [username]);
            if (users.rows.length > 0) {
                res.status(200).json(users.rows.map (user => {
                    return {
                        id_user: user.id_user,
                        email: user.email,
                        username: user.username,
                        name_user: user.name_user,
                        isadmin: user.isadmin
                    }
                }));
            } else {
                res.status(404).json({ message: 'User does not exist' });
            };
        } else {
            pool.query(queries.getUsers, (error, results) => {
                if (error) {
                    throw error;
                }
                // mapping results to a new array
                const users = results.rows.map((user) => {
                    if (!user.isadmin) {
                        return {
                            id_user: user.id_user,
                            email: user.email,
                            username: user.username,
                            name_user: user.name_user,
                            isadmin: user.isadmin
                        };
                    }
                });
                if (users.length > 0) {
                    res.status(200).json(users);
                } else {
                    res.status(404).json({ message: 'No users found' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const app_song = async (req, res) => {
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
}

module.exports = {
    app_singer,
    app_song
}