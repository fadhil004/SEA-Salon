# Beauty Salon Management System - SEA SALON

This project is a web-based application for managing reservations and services in a beauty salon.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Dashboard:** View statistics and summary of salon activities.
- **Manage Branches:** Add, update, and delete branches.
- **Manage Services:** Add, update, and delete services offered by branches.
- **Reservation System:** Allow customers to book appointments.
- **Reviews:** User can make reviews and give star.

## Technologies Used

- Node.js
- Express.js
- Sequelize 
- PostgreSQL (or your preferred database)
- EJS
- JSON Web Tokens (JWT)
- Bcrpytjs

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fadhil004/SEA-Salon

   cd SEA-Salon

2. **Install dependencies:**

    ```bash
    npm install

3. **Set up environment variables:**

    ```bash
    cd config

- Rename config.example.json to .config.json and configure your environment variables such as database connection details.

4. **Set up the database:**
- Ensure PostgreSQL is installed and running.

- Create a new database.

- Run database migrations and seed:
    ```bash
    npx sequelize-cli db:migrate

    npx sequelize-cli db:seed:all

5. **Start the server:**
    ```bash
    npm run start

## Usage
- **Admin Dashboard:**

1. Log in with admin credentials.
2. View statistics on reservations, expenses, and more.
3. Manage branches and services.
4. Monitor reservation history and generate reports.

- **Customer Booking:**

1. Customers can visit the booking section.
2. Select a branch, service, date, and time.
3. Submit the booking form to make an appointment.

- **API Endpoints:**
1. The application exposes several API endpoints for managing branches, services, reservations, etc. Refer to the API documentation for detailed usage.

## API Endpoints

### Authentication Routes

- **POST /register:** Register a new user.
- **POST /login:** Log in an existing user.

### User Routes

- **GET /dashboard:** View user dashboard.
- **GET /admin:** Access admin panel.

### Review Routes

- **POST /review:** Create a new review.

### Reservation Routes

- **GET /reservation:** View all reservations.
- **POST /reservation/add:** Create a new reservation.
- **GET /:branchId/services:** Get services available at a specific branch.
- **GET /:branchId/times:** Get available booking times for a specific branch.

### Dashboard Routes

- **GET /admin/service:** Manage services (admin).
- **GET /admin/branch:** Manage branches (admin).
- **GET /admin/branch/add:** Add a new branch (admin).
- **POST /services/create:** Create a new service (admin).
- **POST /branches/create:** Create a new branch (admin).
- **POST /branches/services/add:** Add a service to a branch (admin).
- **GET /branches/services/remove/:branchId/:serviceId:** Remove a service from a branch (admin).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please submit an issue or pull request.
