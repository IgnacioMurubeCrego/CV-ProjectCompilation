Endpoints

1. Create TARDIS Path: /api/tardis Method: POST Description: Create a new TARDIS
   entry.

Example Request:

curl -X POST -H "Content-Type: application/json" -d '{"dimensions": [],
"camouflage": "Blue Police Box", "regenerationNumber": 5, "currentYear": 2023}'
http://localhost:3000/api/tardis

2. Get TARDIS by ID Path: /api/tardis/:id Method: GET Description: Retrieve
   details of a TARDIS and all it's contained documents by its MongoID.

Example Request:

curl http://localhost:3000/api/tardis/your_tardis_id

3. Update TARDIS by ID Path: /api/tardis/:id Method: PUT Description: Update
   details of a TARDIS by its MongoID.

Example Request:

curl -X PUT -H "Content-Type: application/json" -d '{"dimensions": [{"planets":
[{"people": [{"name": "New Name"}]}]}]}'
http://localhost:3000/api/tardis/your_tardis_id

Environment Variables The API requires the following environment variables:

MONGO_URL: MongoDB cluster URL
