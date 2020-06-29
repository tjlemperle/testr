select t.test_avail_status
from tests as t
join class cl on t.class_id = cl.class_id
join class_users cu on cl.class_id = cu.class_id
join users u on u.user_id = cu.user_id
where t.test_id = $1
and u.user_id = $2
