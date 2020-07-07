USE booktivist;

INSERT INTO CATEGORIES (category) VALUES ('LGBTQ');
INSERT INTO CATEGORIES (category) VALUES ('NAH');
INSERT INTO CATEGORIES (category) VALUES ('BLM');


INSERT INTO BOOKS (title,subtitle,author,illustrator,description,image_link,key_talking_points,isbn,pub_date,youtube_link,added) 
values ('Ten Little Rabbits','movie','Virginia Grossman','vincent','Native American Heritage','www.google.com','nada mucho',123456789,'2014/12/22','www.wikipedia.com',true);
INSERT INTO BOOKS (title,subtitle,author,illustrator,description,image_link,key_talking_points,isbn,pub_date,youtube_link,added) 
values ('A is for activist','movie','Innosanto Nagara','vincent','Black Lives Matter','www.google.com','nada mucho',123456789,'2013/12/22','www.wikipedia.com',true);
INSERT INTO BOOKS (title,subtitle,author,illustrator,description,image_link,key_talking_points,isbn,pub_date,youtube_link,added) 
values ('Hair Love','movie','Matthew A. Cherry','vincent','Black Lives Matter','www.google.com','nada mucho',123456789,'2012/12/22','www.wikipedia.com',true);
INSERT INTO BOOKS (title,subtitle,author,illustrator,description,image_link,key_talking_points,isbn,pub_date,youtube_link,added) 
values ('I Am Enough','movie','Grace Byers','vincent','Black Lives Matter','www.google.com','nada mucho',123456789,'2011/12/22','www.wikipedia.com',false);
INSERT INTO BOOKS (title,subtitle,author,illustrator,description,image_link,key_talking_points,isbn,pub_date,youtube_link,added) 
values ('Love Makes a Family','movie','Sophie Beer','vincent','LGBTQIA','www.google.com','nada mucho',123456789,'2011/01/22','www.wikipedia.com',true);

INSERT INTO BOOKCATEGORIES (bookId,categoryId) VALUES (1,2);
INSERT INTO BOOKCATEGORIES (bookId,categoryId) VALUES (2,3);
INSERT INTO BOOKCATEGORIES (bookId,categoryId) VALUES (3,3);
INSERT INTO BOOKCATEGORIES (bookId,categoryId) VALUES (4,3);
INSERT INTO BOOKCATEGORIES (bookId,categoryId) VALUES (5,1);
INSERT INTO BOOKCATEGORIES (bookId,categoryId) VALUES (5,3);

-- For the Love Makes a Family book, we are going to apply it to 2 categories (1 & 3 which represents
-- LGBTQIA and BLM)
