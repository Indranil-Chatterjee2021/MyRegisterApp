<h3 align="center">
    <b>A Simple NodeJs ExpressJs MongoDB CRUD<br> Web Application </b> 
<br>
</h3>

## What are the functionalities of this App ?

1.  CRUD ( Create, Read, Update and Delete ) from/in MongoDB collections.
2.  Data store in MongoDB Cloud Atlas.
3.  ACID properties used for Transacions management in MongoDB.
4.  JavaScripts form validations used for Client/Server side to validate inputed data.
5.  Implemented both options of ObjectId (\_id) creation by manually entering the value as well as auto-incrementing  
    the value numerically.
6.  Pagination used for displaying data in page, I used five records to display per page.
7.  CSS , Bootstrap and Javascript used with HandleBars templete engine.
8.  Preventing user to enter duplicate data in the database with proper error/alert messages.
9.  Alert messages used to give user proper communication about the process.
10. The application also capture the user session log as Ip Address, Login/Logout date and time and host information.
11. User must Register him/her self to use this application.

### Deployment At

This Project is **[Live](https://http://indra-nodejs-mongodb-crud-app.herokuapp.com//)** on: 🌍 **https://http://indra-nodejs-mongodb-crud-app.herokuapp.com//**

### DataBase:

Here we use **[MongoDB Atlas(Cloud)](https://www.mongodb.com/cloud/atlas)** as the database. Here we have FOUR collections created, named as:

- users.
- departments.
- employees.
- empdetails.

## Connection to DataBase Access

At line 2 on `.env` change **_`<DB_USERNAME>`_** with your DataBase UserName & **_`<DB_PASSWORD>`_** with your DataBase Password.

## To Run the App

```
node server.js
```

The server will start Running on

- http://localhost:5000/

## Author

| Author                  |
| ----------------------- |
| **Indranil Chatterjee** |
