select *,datediff(current_date(),createdAt)
	from profit.products as p
	where createdAt=(
	select min(createdAt) 
	from profit.products);