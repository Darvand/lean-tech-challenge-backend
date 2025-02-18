# Ticket system challenge

## How to run
Run `docker compose up --build`
Visit [Swagger documentation](http://localhost:4000/api) to visualize all endpoints

## Endpoints

### Log in
```
curl --request POST \
  --url https://darvand.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"ShNTZk1SKbjR7pLHKmFxlWpQyHArbezs","client_secret":"{secret}","audience":"https://ticket-system.com","grant_type":"client_credentials"}'
```
> Secret is in the architecture document at the end

### Get all
```
curl --location 'localhost:4000/v1/events?limit=1&page=1' \
--header 'Authorization: Bearer {token}'
```

### Get one

```
curl --location 'localhost:4000/v1/events/{event_id}' \
--header 'Authorization: Bearer {token}'
```

### Update status

curl --location --request PATCH 'localhost:4000/v1/events/{event_id}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {token}' \
--data '{
    "status": "published"
}'

### Create event

```
curl --location 'localhost:4000/v1/events' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {token}' \
--data '{
    "title": "event 1",
    "startDate": "06/28/1995",
    "endDate": "06/28/1996",
    "location": {
        "latitude": 5,
        "longitude": 1
    },
    "tickets": [{
        "type": "vip",
        "price": 10,
        "available": 100,
        "purchaseLimit": 2,
        "benefits": ["so good"]
    }]
}'
```

### Delete event

```
curl --location --request DELETE 'localhost:4000/v1/events/84acadbb-c372-4f40-90e1-e2baea213bc2' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {token}' \
--data '{
    "status": "published"
}'
```

## Testing

Run `npm run test`

## Architecture (folder structure)

### Modules

A module contain the isolated need to fulfish the business requirements

- Auth: Handle authorization based on token given
- Database: Connect to mongoDB
- Shared: Any logic that is agnostic from the business needs
- Events: Hold the business requirements to handle al event functions

### Presentation
This folder contain all functionality related to receive all data from external sources and also allow data out of the project.
- DTO: Interfaces related to enter or letting out data
- Controller: Based on API Rest

### Domain
All the business logic is contained here. All requirements, terminology, constraints and more is handled here.

- Value Objects: Represent a minimal information related to business. Is unique based on his properties and contain constraints or validations
- Services: Without defining what to do, works as an abstract logic that manifestates the use cases
- Entities: Represent a unit from the business and handle all the rules or constraints that allow it to exist without conflicts. Use the *Aggregate* pattern to encapsulate all the business need; meaning that any requirement should travel from this object.

### Application
Allow the presentation folder to complete requirements via the domain layer and the infraestructure, working as a intermediate to transform data. Is based on use cases. It doesn't contain bussiness rules and eiter techonology terminology

### Mapper
Works as a utility layer that translate different schemas

## Technologies

- NestJS: Framework based on good practices from the JavaScript community. Allow the use of Modular Programming; apply SOLID principles without to much effort; express and other popular libraries ready to be used
- Auth0: Authentication provider to avoid setting up all the effort related to authentication. Is free and ready to be used.

## Considerations
I am aware that can be some inconsistent in the project, some lack of validation, etc... but Im sure that the idea about what I know and how to implement is present.

### Tests
Only one unit test to show how to use the dependency injection pattern.