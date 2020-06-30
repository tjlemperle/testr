select t.test_name, t.start_date, t.end_date, t.test_avail_status, t.test_id, cl.class_id,cl.class_name
from tests t
join class cl on t.class_id = cl.class_id
where cl.class_id = $1