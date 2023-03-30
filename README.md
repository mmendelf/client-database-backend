# client-database-backend
Clients Database Website
This is a simple web application that serves as a database for managing client information. The application allows users to view, add, and remove clients, as well as filter clients based on specific criteria.

The application is built using Node.js for the server-side logic and MongoDB for data storage. The user interface is not provided in this project.

Installation
To install and run the application locally, follow these steps:

Clone the repository to your local machine.

Install the necessary dependencies using the following command:

Copy code
npm install
Start the server using the following command:

sql
Copy code
npm start
The server will start running on port 3770. You can access the API endpoints using a tool like Postman or any front-end application.

API Endpoints
The application provides the following API endpoints:

GET /clients: Returns a list of all clients in the database.
POST /clients: Adds a new client to the database. The request body should include the client's full name, ID, phone number, and IP address.
DELETE /clients/:id: Deletes a client with the specified ID from the database.
GET /clients?name=:name Returns a list of all customers whose name is the same as the name in the query.
