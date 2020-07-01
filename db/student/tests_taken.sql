select distinct t.test_name, t.start_date, t.end_date, t.test_avail_status, t.test_id, cl.class_id, tqsa.user_id, cl.class_name
from test_question_student_answers as tqsa
join test_questions tq on tq.test_question_id = tqsa.test_question_id
join tests t on tq.test_id = t.test_id
join class cl on t.class_id = cl.class_id
where user_id = $1

