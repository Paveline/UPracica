select u.userName, userNameId, createdAt, descr from profitshop.products as p join profitshop.users as u on p.userNameId = u.id where userName = "Misha" order by createdAt;
