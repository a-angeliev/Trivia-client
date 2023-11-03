# TRIVIA

TRIVIA is React/Flask game-based application for riddles.It's purpose is to provide a riddles for an outdoor entertainment for a group of people. The target of the game is to find the answer of all questions.

\*\* This repo contains only the Client-side part!  
\*\*Backend server for this project can find [here](https://github.com/a-angeliev/Flask-SoftUni-Project)

## Architecture

```bash
React-Riddles-client
├─ public
└─ src
   ├─ App
   ├─ commonCSS
   ├─ components
   │  ├─ 404NotFound
   │  ├─ About
   │  ├─ AdminPanel
   │  │  ├─ AdminDiscounts
   │  │  │  ├─ AdminAddDiscount
   │  │  │  ├─ AdminDiscountDetails
   │  │  │  ├─ AdminDiscountForm
   │  │  │  ├─ AdminDiscountItem
   │  │  ├─ AdminFaq
   │  │  ├─ AdminNavigation
   │  │  ├─ AdminRiddles
   │  │  │  ├─ AdminAddRiddles
   │  │  │  ├─ AdminRiddleDetails
   │  │  │  ├─ AdminRiddlesForm
   │  │  │  └─ AdminRiddlesItems
   │  │  └─ AdminTransactions
   │  │     └─ AdminTransactionsItem
   │  ├─ Checkout
   │  ├─ common
   │  ├─ CreateEvent
   │  │  └─ OrderFinished.js
   │  ├─ DisplayEvent
   │  │  ├─ DIsplayEventStartCheck
   │  │  └─ EventAction
   │  ├─ Footer
   │  ├─ Header
   │  ├─ Home
   │  ├─ Login
   │  ├─ Logout
   │  ├─ Register
   │  └─ RiddleCatalogue
   │     └─ RiddleItem
   ├─ context
   ├─ hooks
   ├─ service
```

## Features

### non-Authenticated user

-   View homepage page and about page
-   View Login page and Registration page
-   View Riddle page with all riddles for sale
-   View Checkout page and ActionEvent page
-   Use discount codes
-   Buy a riddle
-   Compleat a riddle

### Authenticated user with role Admin

-   View Admin page
-   View Riddles full list of information
    -   full CRUP permissions of riddle's information
-   View Discounts full list of information
    -   full CRUP permissions of discount's information
-   View Transactions full list of information
    -   only read permissions of transaction's information

## Additional dependencies

-   react-paypal-js
-   react-datetime

## Frontend

-   React
-   Css

## Backend

\*\* Backend server for this project can find [here](https://github.com/a-angeliev/Flask-SoftUni-Project)

-   Flask
-   Postgres
