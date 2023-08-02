![image](https://github.com/Annbelbella/Belly_Button_Challenge/assets/124645643/fb5fa27a-c953-420f-86ac-aca8b1ccb77c)

**Team Members:** Fabio Marcullo De Lima, Yamileth Cova, Annbell Nakigozi, Rahiq Osman and Joseph Arambula

# **R**ESTAURANTS AND **C**UISINES

The goal of this project was to create an interactive dashboard that allows a customer or restaurant owner to search for food to eat or capitalize on based on three major factors; Province, cuisine type and Rating. Please view the webpage here: 

## Data Source
The data has been web scrapped from Uber-eats website and below are the two scrapped data sets that we used,

### Code :
- [WebScraping by Cities](https://github.com/fabiomarcullo/Project_3_Food_Delivery/tree/main/Cities/)
- [Geopy_API](https://github.com/fabiomarcullo/Project_3_Food_Delivery/tree/main/Jupyter%20Files/Geopy_API.ipynb)
  
### Output:
- [Cities with Geopy API](https://github.com/fabiomarcullo/Project_3_Food_Delivery/tree/Fabio/Resources/Restaurant_File_with_address.csv)
- [Web Scraping by City](https://github.com/fabiomarcullo/Project_3_Food_Delivery/tree/Fabio/Resources)

  
## Tools

The following tools have been utilized to create the webpage:

### Backend:

- Jupyter Notebook

- Python

- PostgreSQL

- Flask-SQLAlchemy

### Frontend:

- JavaScript

- Bootstrap

- HTML

- CSS

- Plotly

- Leaflet

Notably, the software used to build the webpage was Visual Studio.

## Results

Using Javascript and HTML, we have created an interactive webpage that allows the customer to parse data around. As we can see in Fig.1 below, the user can search data by filtering based on:

- Province

- Category

![image](https://github.com/Annbelbella/Web_Scraping_Challenge/assets/124645643/c19795a2-95e2-45e1-9066-ab40f812d90d)

Figure 1 – showing webpage before filtering of data


When a user wants to see data for restaurants in Ontario that serve Italian food for example, he/she must select these values from the dropdowns of the two filters stated above. As we can see in Fig2 below, 8 restaurants are available as indocated on the restaurant name table and map.

![dashboard filtered by Ontario and Italian food](https://github.com/Annbelbella/Web_Scraping_Challenge/assets/124645643/e0588d13-ea24-46a3-a87d-445a484e13da)

Fig 2 – Restaurants in Ontario with Italian Food


## Visualizations

Bar chart represents the average rating of each category/cuisine type.

![bar graph](https://github.com/Annbelbella/Web_Scraping_Challenge/assets/124645643/5bbcd17d-97b3-402f-b082-e75786d941ac)


The dorghnut chart represents the count of the different cuisine types across Canada.

![doughnut](https://github.com/fabiomarcullo/Project_3_Food_Delivery/assets/124645643/634d1daf-efd1-4986-ab46-15c4f204b736)



The interactive map shows locations of the given available restaurants with detailed information for each restaurant. The map also encompasses the Zoom in or zoom out function to find restaurants in the specific provinces .


![Map with no filter](https://github.com/fabiomarcullo/Project_3_Food_Delivery/assets/124645643/09092552-83b2-45d7-abe0-8dd6ba742348)



## Conclusion

Despite being visually appealing and dynamic, we encountered some drawbacks while building this webpage, we initially had the rating filter added to our webpage as we thought that this would be a very important feature to aid the customers in their search for restaurants, however this limited the results output attained thus we decided to remove this filter. 

We also encountered challenges in attaining all the data we needed for example, we were not able to obtain data on prices for the food thus limiting our data scope.

## References
https://www.ubereats.com/


