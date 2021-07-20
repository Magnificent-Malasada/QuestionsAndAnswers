# ATELIER BACKEND SERVICE

## TABLE OF CONTENTS
1. [DESCRIPTION](#description)
2. [GOALS](#goals)
3. [METRICS](#metrics)
4. [INSTALLATION](#installation)
5. [USAGE](#usage)
6. [LICENSE](#license)

### DESCRIPTION <a name="description"></a>
Atelier provides several micro-serivices that serve as the robust backend and optimized database to a consumer review module for an e-commerce, retail web application. Services include:
- Mulitple API Server instances built on Express.js, Node.js and deployed individually on AWS EC2
- Database controller built in Node.js
- PostgreSQL database and server deployed on AWS EC2
- Nginx load balancer deployed on AWS EC2 configured for 'least-used connection' and EC2 single processors.
- New Relic and Loader.io testing services

Together these services serve to handle CRUD requests as related to over 10 million product questions and answers metadata of over 20 million records seeded through AWS S3 buckets.

### GOALS <a name="goals"></a>
This microservice replaces a pre-existing API that was only able to handle several requests per second.
My goals included:
- Scale the new microservices to handle up to 1500 requests per second while deployed
- Maintain an error rate of <1%
- Provide ETL services for serveral unreliable csv files with over 20 million rows

### METRICS <a name="metrics"></a>
My load balancer was tested using several metrics and tools, including Loader.io, New Relic, and for local development, K6

Without going over 3 APIs on different EC2 instances with Nginx sitting in front, I was able to reach a stable rate of 1500 RPS for complex query requests, including multi table join requests for aggregate metadata:

### INSTALLATION <a name="installation"></a>
  Local Installation
  Local Instances provide limited context without a properly seeded database, but will at least provide some context to the working of the API
   ###### Within the root dir of the cloned repo, run 'npm install' in your terminal to install and npm packages
   ###### If you have not already, download, install, and run an instance of [postgresql](https://www.postgresql.org/docs/9.3/tutorial-install.html)
   ###### Using the schema.sql file, set up the database within your terminal, running
   ```
    psql postgres
    \c some_database
    \i \path\TO\schema.sql
   ```
   ###### cd into db and create a new file titled "config.js". The file should look like so:

```
      const {Pool, Client} = require('pg');
      const pool = new Pool({
        user: <'your_postgres_username'>,
        host: 'localhost',
        database: <'reviews'>,
        password: <'your_database_password'>,
        port: 5432,
        max: 30
      })
      module.exports.pool = pool;
```
   ###### By default, the API server will run on port 80 locally. If this is not your desired port number, update the server.js file within the server dir.
   ###### Run 'npm run server' to start the API server
