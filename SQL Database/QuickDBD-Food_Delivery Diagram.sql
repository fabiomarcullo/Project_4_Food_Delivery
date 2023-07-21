-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/XCVyWi
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Restaurant_Name" (
    "id" SERIAL   NOT NULL,
    "restaurant_name" varchar(255)   NOT NULL,
    "rating" varchar(5)   NOT NULL,
    "category" varchar(255)   NOT NULL,
    "address" varchar(255)   NOT NULL,
    "latitude" varchar(255)   NOT NULL,
    "longitude" varchar(255)   NOT NULL,
    "province" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Restaurant_Name" PRIMARY KEY (
        "id"
     )
);

