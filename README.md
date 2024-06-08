# Online Book Review Server-Side Application

Welcome to the Online Book Review Server-Side Application, the final project for the IBM Course "Developing back-end apps with Node.js and Express." This application allows users to manage books, write reviews, and interact with book-related data. It utilizes MySQL as the database and Sequelize.js as the ORM (Object-Relational Mapping) tool.

## Quick Brief

The Online Book Review Server-Side Application provides a RESTful API for managing user accounts, books, and reviews. Users can register, log in, and create reviews for books. Books can be added, updated, and deleted. Reviews can be read, edited, and deleted. The application aims to provide a seamless experience for book enthusiasts to share their thoughts on books.

## Getting Started

Follow these instructions to set up and run the application:

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

2. **MySQL**: You will need a MySQL database server installed and running. You can download MySQL from [mysql.com](https://www.mysql.com/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project folder**:

   ```bash
   cd <project-folder>
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure the database connection**:
   
   - Create a MySQL database for the application.
   - Set your MySQL database credentials and other environment variables in the `.env` file.

5. **Start the application**:

   ```bash
   npm start
   ```

## API Documentation

For detailed API documentation and examples of how to use the endpoints, please take a look at the [API Documentation](https://documenter.getpostman.com/view/28416524/2s9YBxacHG).

## Features

- **User Management**: Register, log in, and manage user accounts.
- **Book Management**: Add, update, delete, and list books.
- **Review Management**: Write, edit, delete, and read reviews for books.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MySQL**: Relational database management system.
- **Sequelize.js**: Promise-based Node.js ORM for MySQL.
