CREATE TYPE subscribe_status AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED'
);

CREATE TABLE IF NOT EXISTS album (
    album_id SERIAL PRIMARY KEY NOT NULL,
    judul varchar(64) NOT NULL,
    penyanyi varchar(128) NOT NULL,
    total_duration integer NOT NULL DEFAULT 0,
    image_path varchar(256) NOT NULL DEFAULT '/assets/img/placeholder.jpg',
    tanggal_terbit DATE NOT NULL,
    genre varchar(64) DEFAULT 'Unknown' NOT NULL
);

CREATE TABLE IF NOT EXISTS song (
    song_id SERIAL PRIMARY KEY NOT NULL,
    judul varchar(128) NOT NULL,
    penyanyi varchar(128),
    tanggal_terbit DATE NOT NULL,
    genre varchar(64) DEFAULT 'Unknown' NOT NULL,
    duration integer NOT NULL DEFAULT 0,
    audio_path varchar(256) NOT NULL,
    image_path varchar(256) NOT NULL DEFAULT '/assets/img/placeholder.jpg',
    album_id integer,
    foreign key (album_id) 
        references album(album_id)
        on delete set null
);

CREATE TABLE IF NOT EXISTS user_account (
    user_id SERIAL PRIMARY KEY NOT NULL,
    email varchar(256) NOT NULL,
    password varchar(256) NOT NULL,
    username varchar(256) NOT NULL,
    isadmin boolean DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS subscription (
    creator_id integer NOT NULL,
    subscriber_id integer NOT NULL,
    status subscribe_status DEFAULT 'PENDING' NOT NULL,
    primary key (creator_id, subscriber_id),
    foreign key (subscriber_id) 
        references user_account(user_id)
        on delete cascade
);

COPY album (album_id, judul, penyanyi, total_duration, image_path, tanggal_terbit, genre) FROM stdin;
1	Versus	Hakita	0	/assets/img/ultrakill.svg	2022-01-01	Unknown
2	The Ink Spot	The Ink Spot	0	/assets/img/theinkspot.jpg	2000-01-01	Jazz
3	Jazz	multiple	0	/assets/img/trumpet.jpg	2000-01-01	Jazz
4	Favorite	someone	0	/assets/img/doge.jpg	2000-01-01	Jazz
\.

COPY song (song_id, judul, penyanyi, tanggal_terbit, genre, duration, audio_path, image_path, album_id) FROM stdin;
3	The Fire Is Gone	Hakita	2022-01-01	Unknown	158	/assets/audio/The Fire Is Gone.mp3	/assets/img/ultrakill.svg	\N
4	A Shattered Illusion	Hakita	2022-01-01	Unknown	191	/assets/audio/A Shattered Illusion.mp3	/assets/img/ultrakill.svg	\N
1	Versus 2	Hakita	2022-01-01	Unknown	135	/assets/audio/Versus 2.mp3	/assets/img/ultrakill.svg	1
2	Versus	Hakita	2022-01-01	Unknown	243	/assets/audio/Versus.mp3	/assets/img/ultrakill.svg	1
5	I Dont Want to Set the World on Fire	The Ink Spot	2000-01-01	Jazz	180	/assets/audio/I Dont Want to Set the World on Fire.mp3	/assets/img/theinkspot.jpg	2
6	Its All Over But The Crying	The Ink Spot	2000-01-01	Jazz	169	/assets/audio/Its All Over But The Crying.mp3	/assets/img/theinkspot.jpg	2
7	Just the Two of Us	The Ink Spot	2000-03-01	Jazz	236	/assets/audio/Just the Two of Us.mp3	/assets/img/trumpet.jpg	3
9	ProleteR - April Showers	The Ink Spot	2000-04-10	Electro Jazz	270	/assets/audio/ProleteR - April Showers.mp3	/assets/img/doge.jpg	4
10	Russ Morgan Orchestra Were you foolin	The Ink Spot	2000-01-01	Jazz	189	/assets/audio/Russ Morgan Orchestra Were you foolin.mp3	/assets/img/doge.jpg	4
8	Nat King Cole - Orange Colored Sky	The Ink Spot	2000-03-01	Jazz	152	/assets/audio/Nat King Cole - Orange Colored Sky.mp3	/assets/img/trumpet.jpg	3
12	aaa	bbb	2022-01-01	abc	100	-	-	1
\.

COPY subscription (creator_id, subscriber_id, status) FROM stdin;
\.


COPY user_account (user_id, email, password, username, isadmin) FROM stdin;
\.

CREATE FUNCTION calculate_total_time() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE album
    SET total_duration = (
        SELECT COALESCE(SUM(duration), 0)
        FROM song
        WHERE NEW.album_id IS NOT NULL 
        AND song_id <> NEW.song_id 
        AND album_id = NEW.album_id)
    WHERE NEW.album_id IS NOT NULL 
    AND album_id = NEW.album_id;

RETURN NEW;
END;
$$;

CREATE TRIGGER total_time_after_insert 
AFTER INSERT ON song 
FOR EACH STATEMENT 
EXECUTE FUNCTION calculate_total_time();

CREATE TRIGGER total_time_after_delete
AFTER DELETE ON song 
FOR EACH STATEMENT 
EXECUTE FUNCTION calculate_total_time();