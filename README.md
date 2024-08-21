# Movie List

A web application for managing movies and allows users to create, update, and display movie information.

## Tech Stack

- Node JS
- Express
- GraphQL with Apollo Server
- Mongo DB with Mongoose as ORM

## Getting Started

### 1. Clone the Repository

```bash
git https://github.com/ashishmanani1100/movie-list-test-be
cd movie-list-test-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Migrations

Add default users using migration

```bash
npx migrate-mongo up
```

### 4. Run the Project

```bash
npm start
```

## Explore the GraphQL API using the GraphQL Studio at `/graphql` path

- For local : `http://localhost:4000/graphql`
- For live : `https://test.bigscal.com/graphql`

## System Users

Use the following test credentials to logged in :

**User 1**

- **Email:** `dummyuser1@gmail.com`
- **Password:** `Test@1234`

**User 2**

- **Email:** `dummyuser2@gmail.com`
- **Password:** `Test@1234`

## Elastic beanstalk load balancer health check api path `/healthchecks`
