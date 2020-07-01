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


insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '3', 1);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, '4', 1);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '5', 1);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '6', 1);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '8', 2);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '2', 2);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, '6', 2);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '3', 2);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, '8', 3);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '3', 3);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '12', 3);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '4', 3);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '4', 4);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '6', 4);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, '16', 4);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, '10', 4);

insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Stealing paper clips', 9);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Stealing post it notes', 9); 
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Stealing company time', 9);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Stealing toner', 9);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Bernie Mac', 10);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Dave Chapelle', 10);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Chris Rock', 10);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Eddie Murphy', 10);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Oscar', 11);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Jim', 11);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Creed', 11);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Kevin', 11);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Dolce', 12);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'J. Crew', 12);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'MISSsterious', 12);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Boss', 12); 
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Kevin', 13); 
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Ryan', 13); 
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Erin', 13);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Angela', 13);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Brittany', 14);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Sarah', 14);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Sasha', 14);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Katherine', 14);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Creed', 15);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Oscar', 15);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Kevin', 15);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Jim', 15);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Creed, Oscar, Toby', 16);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Darryl, Ryan, Roy', 16);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Kevin, Creed, Stanley', 16);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Oscar, Stanley, Creed', 16);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Michael', 17); 
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Jim', 17);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Kevin', 17);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Ryan', 17); 
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Blood Pressure', 18);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Insulin', 18);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (false, 'Focus', 18);
insert into test_question_options(test_question_answer, test_question_option, test_question_id) values (true, 'Cholesterol', 18);