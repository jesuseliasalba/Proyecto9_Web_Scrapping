# Project 9: Web Scrapping

## \_Rock The Code

## Description

## Index:

- [Scripts](#Scripts)
- [Structure](#Structure)
- [Endpoints Products](#Endpoints-Products)
- [ENV](#ENV)
- [Insomnia](#Insomnia)
- [Dependencies](#Dependencies)
- [Contact](#Contact)

## Scripts:

To start the api:

```
npm run start
```

To start the API in developer mode and restart the API with every change:

```
npm run dev
```

And the last script we have is to be able to insert a data seed in our database, the data is collected with a web scrapper to the url :

```
https://www.sinhumo.net/nuevos-productos
```

And the script is:

```
npm run seed
```

> [!CAUTION]
> Beware that this last script deletes everything in the database.

## Structure

```
Proyecto9_Web_Scrapping
├─ .gitignore
├─ Attempt to Mediamark failed
│  ├─ Attempt1.js
│  └─ Attempt2.js
├─ index.js
├─ package.json
├─ readme.md
└─ src
   ├─ api
   │  ├─ controllers
   │  │  └─ products.js
   │  ├─ models
   │  │  └─ products.js
   │  └─ routes
   │     └─ products.js
   ├─ config
   │  └─ db.js
   └─ utils
      ├─ Product_Seed.js
      └─ scrapper.js

```

## Endpoints Products

|      Name      | Menthod |    Endpoint     |              Body              |   Content-type   |   Response   |
| :------------: | :-----: | :-------------: | :----------------------------: | :--------------: | :----------: |
| Create product |  POST   | /product/create | {**name**, **price**, **img**} | application/json | { product }  |
| List products  |   GET   |    /product     |                                |                  | [ products ] |
| Modify product |   PUT   |  /product/:id   |       { **user data** }        | application/json | { product }  |
| Delete product |   DEL   |  /product/:id   |                                | application/json | { product }  |

### Scrapper

This is the function that I have created to perform the scraping to the web from which I extract the data to insert them in the database with the **seed** script.

## ENV

Make sure to create an `.env` file in the root of the project with the following environment variables:

- `DB_URL=` - With the URL of your database in MongoDB.

## Insomnia

The `Insomnia&Postman-Querys.har` file contains all the requests that can be made to our API. In this `.har` format you can import it into Postman.

## Dependencies

- Node.js
- Express
- Dotenv
- Mongoose
- Puppeteer

### Dev-Dependencies

- Nodemon

### Carpet { Attempt to Mediamark failed }

There are two tests that I have been doing to perform web scrapping on the Mediamark website but I have not managed to bypass the security.

## Contact

| [**Jesus Elias Alba**](http://instagram.com/jesuseliasalba) |
| :---------------------------------------------------------: |
