### Repo Description
 - blog-api contains all the APIs and services related to blog posting 

### Quick start
  - Clone the project
  - Run the following commands inside terminal.
    1. cd blog-post-service
    2. npm i
    3. create .env file in the root directory same as env.example and add env configs
    4. npm start
### Endpoints
|          ENDPOINT        |    METHOD  |    INPUTS   |
| ------------------- | ------------- | --------- |
| /auth/login | POST | *email, *password |
| /auth/register | POST | *email, *password, *username |
| /auth/register-admin | POST | *email, *password, *username  |
| /admin/update-user-limit | POST | *userId, *limit |
| /blog | GET | userId, title |
| /blog/:id | GET | |
| /blog | POST | *title, content |
| /blog | PUT | *id |
| /blog | DELETE | *id |