select v.vendorName, p.* from profitshop.products as p join profitshop.vendors as v on p.vendorId=v.id where vendorName = "Adobe";
