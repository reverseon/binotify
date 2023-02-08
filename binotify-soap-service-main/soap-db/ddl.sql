create table logging (
	id int not null auto_increment,
	description char(255) not null,
	ip char(16) not null,
	endpoint char(255) not null,
	requested_at timestamp not null,
	PRIMARY KEY (id)
);

create table subscription (
	creator_id int not null,
	subscriber_id int not null,
	status enum ('PENDING', 'ACCEPTED', 'REJECTED') default 'PENDING',
	primary key (creator_id, subscriber_id)
);

create table apikey (
	uid int not null,
	api_key char(255) not null,
	primary key (uid)
);

INSERT INTO `apikey` VALUES (1,'0d9818e4b19680c8c1459b968add1ed5cfa2337368170b2ea8bd73e0036beab8'),(2,'97953e153f0ff93a85c66f6cf71c1d7460a9bb8ea4d2cc94e0e931aaf2ed8ecd');
