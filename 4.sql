select distinct vendorName from profitshop.products as p join profitshop.vendors as v on p.vendorId = v.id where validUntil >= current_date();
