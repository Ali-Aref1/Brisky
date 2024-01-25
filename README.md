# Grocery Shopping Web App (BRISKY) .... Web Engineering Project 2023-2024

Welcome to our Grocery Shopping Web App repository! This application allows users to conveniently place orders for grocery items from the nearest branch, while administrators can efficiently manage each branch. Below, you'll find all the necessary information to understand, set up, and contribute to the project.

## Table of Contents

- [Business Rules](#business-rules)
- [Database Schema](#database-schema)
- [Web App Overview](#web-app-overview)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Business Rules

- Each User has an ID (Primary Key), First Name, Last Name, D.O.B., Age (Derived from D.O.B.), Email, Password, and phone number.
- Each Item has a ID (Primary Key), Name, Category, Price. Each Manufacturer has an ID (Primary Key), Name, Email, and phone number. Each manufacturer has one factory address (Composite: Line1, Line2, Region, City).
- Each Order has an ID (Primary Key), Cost (derived from item costs), and Status. Each order is ordered by a User. Each order is paid for with a payment method OR with cash (NULL). Each order is delivered by an employee. Each order may have a promo code. Each order comes from a branch.
- Each Employee has an ID (Primary Key), First Name, Last Name, D.O.B., Age (Derived from D.O.B.), Email, department, salary, and phone number. Each employee works at one branch, with a hire date. Each employee has an address (Composite: Line1, Line2, Region, City).
- Each Branch has an ID (Primary Key), Address, Open time, close time. Each branch has many items, with a stock count for each item. Each branch has an employee that is a manager.
- Each Payment Method has Card number, Expiry date, CVV, cardholder name.
- Each Promotion has a promotion Code (Primary Key), Promotion%, start date, end date.
- Each User can have multiple addresses (Composite: Line1, Line2, Region, City).
- Each User can have multiple payment methods (Credit/Debit cards).
- Each Item has one manufacturer. Each manufacturer produces many items.

## Database Schema

![ERD](link_to_erd_image) - Add a link to the ERD image hosted online.

## Web App Overview

Our web application is designed to provide a seamless grocery shopping experience. Users can:

- **Browse Products:** View a variety of grocery items categorized for easy navigation.

- **Add to Cart:** Select items and add them to their shopping cart. The cart displays product details and the total cost.

- **Manage Account:** Users can perform CRUD operations on their accounts, including updating personal information and managing addresses and payment methods.

- **Place Orders:** Initiate orders with selected items, choosing from available payment methods. Order status is tracked for convenience.

- **Admin Dashboard:** Administrators can efficiently manage each branch, overseeing product stock, employee information, and order status.

## Screenshots

Here are some snapshots of our web application in action:

1. ![Screenshot 1](link_to_screenshot_1)
2. ![Screenshot 2](link_to_screenshot_2)
3. ...

Combine all 7 captures on the same coordinates or create a visual representation of the web app layout.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Configure your MySQL database connection.
4. Run the application with `npm start`.

## Contributing

We welcome contributions! If you'd like to contribute, please follow our [Contribution Guidelines](link_to_contributing_guidelines).

## License

This project is licensed under the [MIT License](link_to_license).

Feel free to reach out if you have any questions or issues. Happy coding!
