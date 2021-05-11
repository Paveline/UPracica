select * from profitshop.products as p join profitshop.reviews as r on p.vendorId = r.productId where JSON_LENGTH(review) > 3;
