select t.test_name, t.start_date, t.end_date, t.test_avail_status, t.test_id, cl.class_id, u.user_id, cl.class_name
from tests t
join class cl on t.class_id = cl.class_id
join class_users cu on cl.class_id = cu.class_id 
join users u on u.user_id = $2
where cl.class_id = $1
and u.user_id = cu.user_id