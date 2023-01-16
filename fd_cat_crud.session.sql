CREATE TABLE cats (
    id serial PRIMARY KEY,
    name varchar(200) NOT NULL CHECK (name != ''),
    breed varchar(200) CHECK (breed != ''),
    color varchar(200) NOT NULL,
    birthday date,
    weight numeric(3,1) DEFAULT 0
);


INSERT INTO cats (meow) VALUES ('Meeeaaaaaaw');