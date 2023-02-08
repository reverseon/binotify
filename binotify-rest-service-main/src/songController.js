const pool = require('./db');
const queries = require('./queries');
const fs = require('fs');

const getSongs = async (req, res) => {
    // console.log('getting song list..');
    //console.log(req.user.name);
    try {
        let { id_song } = req.query;
        if (id_song != null) {
            const song = await pool.query(queries.getSongAndArtistNameBySongID, [id_song]);
            if (song.rows.length > 0) {
                if (song.rows[0].id_user == req.user_id) {
                    res.status(200).json(song.rows);
                } else {
                    res.status(401).json({ message: 'Unauthorized' });
                }
            } else {
                res.status(404).json({ message: "No song found" });
            }
        } else {
            let results = await pool.query(queries.getSongAndArtistNameByArtistID, [req.user_id]);
            if (results.rows.length > 0) {
                res.status(200).json(results.rows);
            } else {
                res.status(404).json({ message: 'No songs found' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addSong = async (req, res) => { // use form-data
    try {
        if (req.file == undefined) {
            return res.status(400).json({ message: 'No file selected' });
        } else {
            const { judul } = req.body; // need audio_file also
            let checkSong = await pool.query(queries.getSongId, [judul, req.user_id]);
            if (checkSong.rows.length > 0) {
                res.status(409).json({ message: 'Song already exists' });
            } else {
                let _ = pool.query(queries.addSong, [judul, req.user_id, req.file.path]);
                res.status(201).json({ message: 'Song added Successfully' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSong = async (req, res) => { // use form-data
    try {
        const { id_song, judul } = req.body;
        if (judul == null && req.file == undefined) {
            res.status(400).json({ message: 'No data to update' });
        } else {
            let checkSong = await pool.query(queries.getSong, [id_song, req.user_id]);
            // console.log(checkSong.rows);
            if (checkSong.rows.length > 0) {
                let query = "UPDATE binotify_songs SET ";
                if (judul != null) {
                    query += "judul = '" + judul + "'";
                }
                if (req.file !== undefined) {
                    // console.log(checkSong.rows[0].audio_path);
                    fs.unlink(checkSong.rows[0].audio_path, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                    if (judul != null) {
                        query += ", ";
                    }
                    query += "audio_path = '" + req.file.path + "'";
                }
                query += " WHERE id_song = " + id_song;
                let _ = pool.query(query);
                res.status(200).json({ message: 'Song updated' });
            } else {
                res.status(404).json({ message: 'Song does not exist' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeSong = async (req, res) => {
    try {
        const { id_song } = req.body;
        let checkSong = await pool.query(queries.getSong, [id_song, req.user_id]);
        if (checkSong.rows.length > 0) {
            fs.unlink(checkSong.rows[0].audio_path, (err) => {
                if (err) {
                    throw err;
                }
            });
            let _ = pool.query(queries.removeSong, [id_song]);
            res.status(200).json({ message: 'Song removed' });
        } else {
            res.status(404).json({ message: 'Song does not exist' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSongs,
    addSong,
    updateSong,
    removeSong,
};