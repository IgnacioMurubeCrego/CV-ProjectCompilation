# practica3_BackEnd

Disc Record API Documentation This RESTful API manages Disc records and provides
various endpoints to perform operations related to disc information. The API is
deployed on Deno Deploy at the following URL:

Deno Deploy URL: https://dash.deno.com/projects/rich-hawk-92

-- Endpoints --

GET /getDiscs

Fetches all Disc records from the database.

GET /getDiscsById/:mongoid

Retrieves a Disc record by its unique MongoDB identifier (mongoid).

GET /getDiscsByName/:name

Fetches Disc records by their name.

GET /getDiscsByFormat/:format

Retrieves Disc records by their format.

GET /getDiscsByCountry/:country

Fetches Disc records by their country of origin.

POST /addDisc

Adds a new Disc record to the database. Requires parameters: name: Name of the
disc. author: Author or artist of the disc. format: Format of the disc (e.g.,
CD, DVD). country: Country of origin for the disc. art: Art description or
reference for the disc.

PUT /updateDisc/:mongoid

Updates an existing Disc record identified by its MongoDB ID (mongoid). Requires
the same parameters as

POST /addDisc. DELETE /deleteDisc/:mongoid

Removes a Disc record from the database using its MongoDB ID (mongoid).

-Usage :

Environment Variable The API requires a MONGO_URL environment variable to be set
for connection to the MongoDB database. Please ensure you have set this variable
on your .env file before running or accessing the API endpoints.

-Making Requests : Make HTTP requests to the specified endpoints using
appropriate tools like Postman, cURL, or any HTTP request library.

Request Parameters : For POST /addDisc and PUT /updateDisc/:mongoid endpoints,
the following parameters are required in the request body:

name: (String) Name of the disc. author: (String) Author or artist of the disc.
format: (String) Format of the disc (e.g., LP, CD, single, cassette, reel to
reel, minidisc, videocd). country: (String) Country of origin for the disc. art:
(String) Art description or reference for the disc.

Response Successful operations will return an appropriate HTTP status code and,
in some cases, a JSON response containing the requested data. Error responses
will include relevant status codes and, when possible, an error message or
description.
