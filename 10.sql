select * 
	from profitshop.products 
    join (select productId,avg(rating) as average from profitshop.reviews group by profitshop.reviews.productId) 
    as a 
    on profitshop.products.id=a.productId 
    where a.average>3;