select cl.class_id, cl.class_owner_id,  cl.class_credit_hours, cl.class_name, t.first_name, t.last_name
from class cl
join class_users cu on cl.class_id = cu.class_id
join users as u on u.user_id = cu.user_id 
join users as t on cl.class_owner_id = t.user_id 
where u.user_id = $1;