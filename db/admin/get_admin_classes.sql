select distinct cl.class_id, cl.class_name, cl.class_owner_id, u.first_name, u.last_name, cl.class_credit_hours
from class cl
join users u on cl.class_owner_id = u.user_id  
where u.user_id = $1;