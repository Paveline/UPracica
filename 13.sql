select *
	from (
		select v.vendorName, COUNT(vendorId) as c 
        from profitshop.products 
        join profitshop.vendors as v on v.id = profitshop.products.vendorId  
        where createdAt <= current_date() and createdAt >= current_date() - 10
        group by profitshop.products.vendorId
        )
	as a 
    where a.c >= 3;