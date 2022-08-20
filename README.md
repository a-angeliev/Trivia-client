
# TRIVIA

TRIVIA is React/Flask game-based application for riddles.It's purpose is to provide a riddles for an outdoor entertainment for a group of people. The target of the game is to find the answer of all questions.

**This repo contains only the Client-side part!

## Architecture

```bash
├───components
│   ├───About
│   ├───AdminPanel
│   │   ├───AdminDiscounts
│   │   │   ├───AdminAddDiscount
│   │   │   ├───AdminDiscountDetails
│   │   │   └───AdminDiscountItem
│   │   ├───AdminFaq
│   │   ├───AdminNavigation
│   │   ├───AdminRiddles
│   │   │   ├───AdminAddRiddles
│   │   │   ├───AdminRiddleDetails
│   │   │   └───AdminRiddlesItems
│   │   └───AdminTransactions
│   │       └───AdminTransactionsItem
│   ├───Checkout
│   ├───common
│   ├───CreateEvent
│   ├───DisplayEvent
│   │   ├───DIsplayEventStartCheck
│   │   └───EventAction
│   ├───Footer
│   ├───Header
│   ├───Home
│   ├───Login
│   ├───Logout
│   ├───Register
│   └───RiddleCatalogue
│       └───RiddleItem
├───context
├───hooks
└───service
```


## Features

### non-Authenticated user

- View homepage page and about page
- View Login page and Registre page
- View Riddle page with all riddles for sale
- View Checkout page and ActionEvent page
- Use discount codes
- Buy a riddle
- Compleate a riddle

### Authenticated user with role Admin

- View Admin page
- View Riddles full list of information 
  - full CRUP permisions of riddle's information
- View Discounts full list of information 
  - full CRUP permisions of discount's information
- View Transcations full list of information
  - only read permitions of transaction's information

## Additional dependencies

- react-paypal-js
- react-datetime

## Frontend
 
- React
- Html
- Css
 
## Backend

  ** Backend server for this project can find [here](https://github.com/a-angeliev/Flask-SoftUni-Project)
- Flask
- Postgres
 
