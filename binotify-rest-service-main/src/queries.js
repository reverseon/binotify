const getUsers = "SELECT * FROM binotify_user ORDER BY username ASC"
const getUserByUsername = "SELECT * FROM binotify_user WHERE username = $1";
const checkEmailExists = "SELECT u FROM binotify_user u WHERE u.email = $1";
const checkUsernameExists = "SELECT u FROM binotify_user u WHERE u.username = $1";
const addUser = "INSERT INTO binotify_user (email, pass_user, username, name_user) VALUES ($1, $2, $3, $4)";
const getUserByID = "SELECT * FROM binotify_user WHERE id_user = $1";
const getSong = "SELECT * FROM binotify_songs WHERE id_song = $1 AND id_penyanyi = $2";
const addSong = "INSERT INTO binotify_songs(judul, id_penyanyi, audio_path) VALUES ($1, $2, $3)";
const getSongId = "SELECT id_song FROM binotify_songs WHERE judul = $1 AND id_penyanyi = $2";
const removeSong = "DELETE FROM binotify_songs WHERE id_song = $1";
const getSongAndArtistNameBySongID = "SELECT s.*, u.name_user, u.id_user FROM binotify_songs s INNER JOIN binotify_user u ON s.id_penyanyi = u.id_user WHERE s.id_song = $1 ORDER BY s.judul ASC";
const getSongAndArtistNameByArtistID = "SELECT s.*, u.name_user, u.id_user FROM binotify_songs s INNER JOIN binotify_user u ON s.id_penyanyi = u.id_user WHERE s.id_penyanyi = $1 ORDER BY s.judul ASC";

module.exports = {
    getUsers,
    getUserByUsername,
    checkEmailExists,
    checkUsernameExists,
    addUser,
    getSong,
    addSong,
    getSongId,
    removeSong,
    getUserByID,
    getSongAndArtistNameBySongID,
    getSongAndArtistNameByArtistID,
};