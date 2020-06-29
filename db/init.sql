drop table if exists test_users;
drop table if exists test_question_options;
drop table if exists test_questions;
drop table if exists tests;
drop table if exists class_users;
drop table if exists class;
drop table if exists users;

CREATE TABLE "users" (
  "user_id" SERIAL primary key,
  "username" VARCHAR(30),
  "first_name" VARCHAR(60),
  "last_name" VARCHAR(60),
  "user_email" VARCHAR(100),
  "password" VARCHAR(30),
  "role" VARCHAR(15)
);
CREATE TABLE "class" (
  "class_id" SERIAL primary key,
  "class_name" VARCHAR(60),
  "class_credit_hours" INT,
  "class_owner_id" INT references users(user_id)
);
CREATE TABLE "class_users" (
  "user_id" INT references users(user_id),
  "class_id" INT references class(class_id),
  PRIMARY KEY("user_id", "class_id")
);
CREATE TABLE "tests" (
  "test_id" SERIAL primary key,
  "test_name" VARCHAR(200),
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP,
  "test_avail_status" BOOL,
  "date_taken" TIMESTAMP,
  "class_id" INT references class(class_id)
);
CREATE TABLE "test_questions" (
  "test_question_id" SERIAL primary key,
  "test_question" VARCHAR(500),
  "test_id" INT references tests(test_id)
);
CREATE TABLE "test_question_options" (
  "test_question_option_id" SERIAL primary key,
  "test_question_answer" BOOL,
  "test_question_option" VARCHAR(500),
  "test_question_id" INT references test_questions(test_question_id)
);

create table "test_question_student_answers" (
    test_questions_student_answer_id serial primary key, 
    test_question_id int references test_questions(test_question_id),
    test_question_option_id int REFERENCES test_question_options(test_question_option_id),
    user_id int REFERENCES users(user_id),
    date_taken TIMESTAMP
);

insert into users(username, first_name, last_name, user_email, password, role) values ('tjlemperle', 'Travis', 'Lemperle', 'tjlemperle@gmail.com', 'test', 'ADMIN');
insert into users(username, first_name, last_name, user_email, password, role) values ('jakelemp', 'Jacob', 'Lemperle', 'jakelemp@gmail.com', 'test', 'TEACHER');
insert into users(username, first_name, last_name, user_email, password, role) values ('slemp', 'Stephen', 'Lemperle', 'slemp99@gmail.com', 'test', 'STUDENT');
insert into users(username, first_name, last_name, user_email, password, role) values ('tlempster', 'Tammy', 'Lemperle', 'tlempster@gmail.com', 'test', 'STUDENT');
insert into users(username, first_name, last_name, user_email, password, role) values ('clemp', 'Chad', 'Lemperle', 'clemp16@gmail.com', 'test', 'STUDENT');
insert into users(username, first_name, last_name, user_email, password, role) values ('ashleylel', 'Ashley', 'Naylor', 'ashleylel@gmail.com', 'test', 'STUDENT');


insert into class(class_name, class_credit_hours, class_owner_id) values ('CS1400', 3, 2);
insert into class(class_name, class_credit_hours, class_owner_id) values ('CS1410', 3, 2);
insert into class(class_name, class_credit_hours, class_owner_id) values ('CS2800', 3, 1);
insert into class(class_name, class_credit_hours, class_owner_id) values ('CS2810', 3, 1);
insert into class(class_name, class_credit_hours, class_owner_id) values ('INFO1400', 3, 2);


insert into class_users(user_id, class_id) values (3, 1);
insert into class_users(user_id, class_id) values (4, 1);
insert into class_users(user_id, class_id) values (6, 1);
insert into class_users(user_id, class_id) values (3, 2);
insert into class_users(user_id, class_id) values (3, 4);
insert into class_users(user_id, class_id) values (5, 4);

insert into class_users(user_id, class_id) values (11, 1);
insert into class_users(user_id, class_id) values (11, 2);
insert into class_users(user_id, class_id) values (11, 3);

insert into tests(test_name, start_date, end_date, test_avail_status, date_taken, class_id) values ('Exam 1 CS1400', NOW(), NOW(), TRUE, null, 1);
insert into tests(test_name, start_date, end_date, test_avail_status, date_taken, class_id) values ('Exam 2 CS1400', NOW(), NOW(), TRUE, null, 1);
insert into tests(test_name, start_date, end_date, test_avail_status, date_taken, class_id) values ('Final Exam CS1400', NOW(), NOW(), TRUE, null, 1);
insert into tests(test_name, start_date, end_date, test_avail_status, date_taken, class_id) values ('Exam 1 INFO1400', NOW(), NOW(), TRUE, null, 3);
insert into tests(test_name, start_date, end_date, test_avail_status, date_taken, class_id) values ('Exam 1 CS1410', NOW(), NOW(), TRUE, null, 2);


insert into test_questions(test_question, test_id) values ('What is 2 + 2?', 1);
insert into test_questions(test_question, test_id) values ('What is 2 - 4?', 1);
insert into test_questions(test_question, test_id) values ('What is 2 / 6?', 1);
insert into test_questions(test_question, test_id) values ('What is 2 x 8?', 1);

-- insert into test_questions(test_question_id, test_question, test_id) values (9, '10 x 10', 3);
-- insert into test_questions(test_question_id, test_question, test_id) values (10, '3/3', 3);
-- insert into test_questions(test_question_id, test_question, test_id) values (11, '4 x 20', 3);
-- insert into test_questions(test_question_id, test_question, test_id) values (12, '36/2', 3);


-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (1, false, '3', 1);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (2, true, '4', 1);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (3, false, '5', 1);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (4, false, '6', 1);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (5, false, '8', 2);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (6, false, '2', 2);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (7, true, '6', 2);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (8, false, '3', 2);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (9, true, '8', 3);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (10, false, '3', 3);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (11, false, '12', 3);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (12, false, '4', 3);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (13, false, '4', 4);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (14, false, '6', 4);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (15, false, '16', 4);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (16, true, '10', 4);

-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (17, false, 'there', 5);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (18, true, 'no where', 5);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (19, false, 'here', 5);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (20, false, 'home', 5);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (21, false, 'New York', 6);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (22, false, 'Utah', 6);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (23, true, 'San Diego', 6);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (24, false, 'Alaska', 6);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (25, true, 'I am', 7);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (26, false, 'He is', 7);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (27, false, 'They are', 7);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (28, false, 'Fake News', 7);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (29, false, 'Why not', 8);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (30, false, 'Cause', 8);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (31, false, 'You know', 8);
-- insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (32, true, '*shrug*', 8);