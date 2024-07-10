# Traverse Assignment

This is the take home assignment for Traverse. The instructioned are outlined at the bottom of this readme. There are several issues with this app currently. But as this assignment is meant to only take 2-3 hours, the non-critical issues are left up and detailed in the Known Issues section.

## Running the Project

First, cd into the project root.

Copy the .env.sample into .env.local:

`cp .env.sample .env.local`

Fill in the sensitive information in `.env.local`

Then install the required node packages:

`yarn install`

Finally, run the app with:

`yarn start`


## Known issues:

`Failed to fetch dynamically imported module`

Not sure what's causing this issue, but it can be fixed by a combination of clearing the cache and rebuild the app.

`Error loading vite-imagetools, image imports are not available Error: Could not load the "sharp" module using the linux-x64 runtime`

Solved by running `yarn add sharp --ignore-engines`



## Coding Exercise Spec

For this coding exercise you will need to create a Qwik web app with 2 routes

/bookings

/bookings/<id>



The app is intended to be a very simple Admin interface.



Both routes will depend on data from a fake api

TRAVERSE_ASSIGNMENT_API_ROUTE_BASE

This api requires that a header be sent

x-api-key




for all api endpoints

You can test this with the ping end point

curl TRAVERSE_ASSIGNMENT_API_ROUTE_BASE -H "x-api-key: <api-key>"

The response should be

{

  "ok": true,

  "email": "<your email>"

}

Please treat this api key and endpoint as **secrets**.



The /bookings route

--------------------

GET TRAVERSE_ASSIGNMENT_API_ROUTE_BASE/bookings

The data you get back from this endpoint looks as follows

[

 {

    "cancelled": false,

    "checkInDate": "2024-05-31",

    "checkOutDate": "2024-06-01",

    "currencyCode": "USD",

    "hotelName": "Luxor",

    "id": 7,

    "occupancy": 1,

    "paid": true,

    "total": 90928

  },...

]

  cancelled     true or false, indicates if the booking has been cancelled

  checkInDate   stay arrival

  checkOutDate  stay departure

  currencyCode  currency the hotel charges in

  hotelName     display name of the property

  id            db id of the booking

  occupancy     adult guests in stay

  paid          true or false, indicates if the booking has been paid in full

  total         cost of booking in smallest units (e.g. cents for USD)



1. List all the bookings.

2. Format the total appropriately, it is in the lowest unit of the currency code (e.g. cents in the above data).

3. A booking can be cancelled, fully paid, both or neither. Indicate this status in a way that makes sense.

4. Include the length of the stay for each booking (e.g. 1 night in the above case)

5. Include a link to /bookings/<id>



The /bookings/<id> route

-------------------------

GET TRAVERSE_ASSIGNMENT_API_ROUTE_BASE/bookings/<id>

The data you get back from this endpoint looks as follows

{

  "cancelledAt": null,

  "checkInDate": "2024-06-18",

  "createdAt": "2024-06-19T00:00:00.000Z",

  "checkOutDate": "2024-06-19",

  "currencyCode": "USD",

  "customer": {

    "bookingIds": [

      1,

      12,

      42,

      46,

      52,

      53,

      55,

      59,

      83,

      91

    ],

    "email": "jane@yahoo.com",

    "firstName": "Jane",

    "id": 2,

    "lastName": "Doe"

  },

  "hotel": {

    "id": 4,

    "name": "The Venetian"

  },

  "id": 1,

  "occupancy": 7,

  "notes": null,

  "paidInFullAt": null,

  "room": {

    "id": 14,

    "maxUnits": 4,

    "maxOccupancy": 6,

    "name": "Rialto Suite"

  },

  "total": 89124,

  "updatedAt": "2024-06-19T00:00:00.000Z"

}

Most of this data is self explanatory, but some explanations

  customer.bookingIds list of bookings for this customer

  notes               should be provided if a room has been cancelled

  room.maxUnits       total number of rooms of this type in the property

  room.maxOccupancy   maximum adult occupancy for this room



1. Display the booking with the fields above

2. Format the currency appropriately

3. Show the status of the booking

4. Show the total nights stay

5. Link to each of the customer's other bookings



Some links for Qwik

--------------------

Getting Started: Qwik has a cli

https://qwik.dev/docs/getting-started/#create-an-app-using-the-cli

Routing: Qwik uses file based routing

https://qwik.dev/docs/routing/#:~:text=Routing%20in%20Qwik%20City%20is,to%20match%20by%20the%20router.

Loading data: Qwik has the concept of Route Loaders

https://qwik.dev/docs/route-loader/#routeloader

Layouts: Qwik has nested layouts

https://qwik.dev/docs/layout/#nested-layouts

Tailwind: Qwik integrates with Tailwind

https://qwik.dev/docs/integrations/tailwind/#tailwind

https://tailwindcss.com/docs/guides/qwik



What's expected in this exercise

---------------------------------

The exercise should take 2-3 hours. It may take a bit longer if you are unfamiliar with Qwik.

1. The UI should be functional, it does not need to be beautiful.

2. You don't need to deploy this app, but I have to be able to see it in a public Github repo and clone it to test locally.

3. Have an opinion on coding this in Qwik compared to your current web framework.
