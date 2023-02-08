create table if not exists binotify_user (
    id_user serial primary key not null,
    email varchar(256) not null,
    pass_user varchar(256) not null,
    username varchar(256) not null,
    name_user varchar(256) not null,
    isadmin boolean not null default false
);

create table if not exists binotify_songs (
    id_song serial primary key not null,
    judul varchar(64) not null,
    id_penyanyi integer not null,
    audio_path varchar(256) not null,
    constraint fk_penyanyi 
        foreign key (id_penyanyi) 
        references binotify_user(id_user)
        on delete cascade
);

INSERT INTO public.binotify_user VALUES (1, 'afterglow@bando.ri', 'U2FsdGVkX1+FSn6n9irv/qLCQ27Wqd7R6hjlWQRjfYM=', 'Afterglow', 'Mitake Ran', false);
INSERT INTO public.binotify_user VALUES (2, 'ado@ado.do', 'U2FsdGVkX1/k7M+HBOTHpiJUJw6VHSPvBiTLgO6rxR4=', 'AdoAdoAdo', 'AdoAdoAdo', false);

INSERT INTO public.binotify_songs VALUES (1, 'Asu no Yozora Shoukaihan', 1, 'song/1669943771587-03. アスノヨゾラ哨戒班.mp3');
INSERT INTO public.binotify_songs VALUES (2, 'Lost One''s Weeping', 1, 'song/1669943827964-04. ロストワンの号哭.mp3');
INSERT INTO public.binotify_songs VALUES (3, 'Usseewa', 2, 'song/1669944003771-11.うっせぇわ.mp3');
INSERT INTO public.binotify_songs VALUES (4, 'Yoru no Piero', 2, 'song/1669944071996-14.夜のピエロ.mp3');