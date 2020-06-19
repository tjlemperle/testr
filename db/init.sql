drop table if exists test_users;
drop table if exists test_question_options;
drop table if exists test_questions;
drop table if exists tests;
drop table if exists class_users;
drop table if exists class;
drop table if exists users;

CREATE TABLE "users" (
  "user_id" SERIAL,
  "username" VARCHAR(30),
  "first_name" VARCHAR(60),
  "last_name" VARCHAR(60),
  "user_email" VARCHAR(100),
  "password" VARCHAR(30),
  "role" VARCHAR(15),
  PRIMARY KEY ("user_id")
);
CREATE TABLE "class" (
  "class_id" SERIAL,
  "class_name" VARCHAR(60),
  "class_credit_hours" INT,
  "class_owner_id" INT references users(user_id),
  PRIMARY KEY ("class_id")
);
CREATE TABLE "class_users" (
  "user_id" INT references users(user_id),
  "class_id" INT references class(class_id),
  PRIMARY KEY("user_id", "class_id")
);
CREATE TABLE "tests" (
  "test_id" SERIAL,
  "test_name" VARCHAR(200),
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP,
  "test_avail_status" BOOL,
  "date_taken" TIMESTAMP,
  "class_id" INT references class(class_id),
  PRIMARY KEY ("test_id")
);
CREATE TABLE "test_questions" (
  "test_question_id" SERIAL,
  "test_question_type" VARCHAR(100),
  "test_question" VARCHAR(500),
  "test_question_asset" VARCHAR(500),
  "test_id" INT references tests(test_id),
  PRIMARY KEY ("test_question_id")
);
CREATE TABLE "test_question_options" (
  "test_question_option_id" SERIAL,
  "test_question_answer" BOOL,
  "test_question_option" VARCHAR(500),
  "test_question_id" INT references test_questions(test_question_id),
  PRIMARY KEY ("test_question_option_id")
);
CREATE TABLE "test_users" (
  "test_users_id" SERIAL,
  "user_id" INT references users(user_id),
  "test_id" INT references tests(test_id),
  PRIMARY KEY ("test_users_id")
);

insert into users(user_id, username, first_name, last_name, user_email, password, role) values (1, 'tjlemperle', 'Travis', 'Lemperle', 'tjlemperle@gmail.com', 'test', 'ADMIN');
insert into users(user_id, username, first_name, last_name, user_email, password, role) values (2, 'jakelemp', 'Jacob', 'Lemperle', 'jakelemp@gmail.com', 'test', 'TEACHER');
insert into users(user_id, username, first_name, last_name, user_email, password, role) values (3, 'slemp', 'Stephen', 'Lemperle', 'slemp99@gmail.com', 'test', 'STUDENT');
insert into users(user_id, username, first_name, last_name, user_email, password, role) values (4, 'tlempster', 'Tammy', 'Lemperle', 'tlempster@gmail.com', 'test', 'STUDENT');
insert into users(user_id, username, first_name, last_name, user_email, password, role) values (5, 'clemp', 'Chad', 'Lemperle', 'clemp16@gmail.com', 'test', 'STUDENT');
insert into users(user_id, username, first_name, last_name, user_email, password, role) values (6, 'ashleylel', 'Ashley', 'Naylor', 'ashleylel@gmail.com', 'test', 'STUDENT');


insert into class(class_id, class_name, class_credit_hours, class_owner_id) values (1, 'CS1400', 3, 2);
insert into class(class_id, class_name, class_credit_hours, class_owner_id) values (2, 'CS1410', 3, 2);
insert into class(class_id, class_name, class_credit_hours, class_owner_id) values (3, 'CS2800', 3, 1);
insert into class(class_id, class_name, class_credit_hours, class_owner_id) values (4, 'CS2810', 3, 1);
insert into class(class_id, class_name, class_credit_hours, class_owner_id) values (5, 'INFO1400', 3, 2);


insert into class_users(user_id, class_id) values (3, 1);
insert into class_users(user_id, class_id) values (4, 1);
insert into class_users(user_id, class_id) values (6, 1);
insert into class_users(user_id, class_id) values (3, 2);
insert into class_users(user_id, class_id) values (3, 4);
insert into class_users(user_id, class_id) values (5, 4);


insert into tests(test_id, test_name, start_date, end_date, test_avail_status, date_taken, class_id) values (1, 'Exam 1 CS1400', NOW(), NOW(), TRUE, null, 1);
insert into tests(test_id, test_name, start_date, end_date, test_avail_status, date_taken, class_id) values (2, 'Exam 2 CS1400', NOW(), NOW(), TRUE, null, 1);
insert into tests(test_id, test_name, start_date, end_date, test_avail_status, date_taken, class_id) values (3, 'Final Exam CS1400', NOW(), NOW(), TRUE, null, 1);
insert into tests(test_id, test_name, start_date, end_date, test_avail_status, date_taken, class_id) values (4, 'Exam 1 INFO1400', NOW(), NOW(), TRUE, null, 3);
insert into tests(test_id, test_name, start_date, end_date, test_avail_status, date_taken, class_id) values (5, 'Exam 1 CS1410', NOW(), NOW(), TRUE, null, 2);


insert into test_questions(test_question_id, test_question_type, test_question, test_question_asset, test_id) values (1, 'TEXT', 'What is 2 + 2?', null, 1);
insert into test_questions(test_question_id, test_question_type, test_question, test_question_asset, test_id) values (2, 'TEXT', 'What is 2 + 4?', null, 1);
insert into test_questions(test_question_id, test_question_type, test_question, test_question_asset, test_id) values (3, 'TEXT', 'What is 2 + 6?', null, 1);
insert into test_questions(test_question_id, test_question_type, test_question, test_question_asset, test_id) values (4, 'TEXT', 'What is 2 + 8?', null, 1);



insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (1, false, '3', 1);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (2, true, '4', 1);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (3, false, '5', 1);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (4, false, '6', 1);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (5, false, '8', 2);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (6, false, '2', 2);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (7, true, '6', 2);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (8, false, '3', 2);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (9, true, '8', 3);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (10, false, '3', 3);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (11, false, '12', 3);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (12, false, '4', 3);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (13, false, '4', 4);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (14, false, '6', 4);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (15, false, '16', 4);
insert into test_question_options(test_question_option_id, test_question_answer, test_question_option, test_question_id) values (16, true, '10', 4);