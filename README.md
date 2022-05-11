
# Inventory Management

Inventory management application for smalll business to keep track their product available, sold and processing status.

## Overview

The main motive of this application to help small business owner to manage their product easily without spending large amout of money.
With that motive I start building this application to learn myself new javascript framework.
- I try to solve the gap between small business owner and the technology.
- Main advantage of the application is I was able to learn new skills and gain new experiences.

Technology used to build application.
- [NextJs](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Next Auth](https://next-auth.js.org/)
- [Mongo DB](https://www.mongodb.com/)
- [Vultr](https://www.vultr.com/) & [Digital Ocean](https://www.digitalocean.com/)


## Features

- Multiple auth level for admin and general user for business
- Multiple dashboard integreated on same account
- Cross platform
- Realtime data fetching with socket.io
- Multivariant skus for product separation




## Demo

Check out [deployed app](https://inventoryhomes.online) here.



## Run Locally

Clone the project

```bash
  git clone git@github.com:pracharya2601/inventory_management.git
```

Go to the project directory

```bash
  cd inventory_management
```

Install dependencies

```bash
  yarn install or npm install
```

Start the server

```bash
  yarn run dev or npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Email server
`EMAIL_SMTP_HOST=smtp.sendgrid.net`

`EMAIL_SMTP_PORT=465`

`EMAIL_SMTP_USER=apikey`

`EMAIL_SMTP_PASSWORD=SG.randomkeyforsendgridapi`

`EMAIL_SMTP_FROM=sendmail@example.com`

### Google Bucket Storage

`PROJECT_ID`

`CLIENT_EMAIL`

`PRIVATE_KEY="goeshere"`

`BUCKET_NAME`

### Datebase 

`DATABASE_URL=mongodburl`

### Other

`JWT_SECRET=randomsecretgoeshere`

`COMPANY_JWT_SECRET=randomsecretgoeshere`

`NEXTAUTH_URL=http://localhost:3000`

`NEXT_PUBLIC_API_HOST=http://localhost:3000`




## Roadmap

- Business data API enpoint 

- Webhook for delivery company

- Webhook for ecommerce site

- Mobile app with react native



## Authors

- [Prakash Acharya](https://www.linkedin.com/in/prakash-ac/)


## Support

For support, email pracharya2601@gmail.com.

