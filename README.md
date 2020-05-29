# book-list
PoC application to show a list of books


## Local development
### Requirements
- npm
- Docker
- AWS SDK
- AWS SAM

### UI
```sh
$ cd ./src/ui/
# Resolve dependencies
$ npm install
$ npm start
```

### API
```sh
$ cd ./src/api/
# Starts DynamoDB locally
$ docker-compose -f docker-compose-dynamodb-local.yml up -d
# Create books table from schema file
$ aws dynamodb create-table --cli-input-json file://books-schema.json --endpoint-url http://localhost:8000
# Checks that Books table was created
$ aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": [
        "Books"
    ]
}
# Builds lambda functions 
$ sam build --use-container
# Start local API using docker network
$ sam local start-api --env-vars env.local.json --docker-network api_book-list
```

## Cleanup
```sh
# Remove the table from local db
$ aws dynamodb delete-table --table-name=Books --endpoint-url=http://localhost:8000
```

## TODO
- [ ] [UI] Show spinner/progress bar when loading data
- [ ] [API] X-Ray instrument aws sdk and requests
- [X] [API] CI/CD pipeline
- [ ] Run test and publish results on pipeline
- [ ] [API] Add cache layer
- [ ] [API] Test exceptions
- [ ] [API] Integration test
- [ ] [UI] Show more information about the book in reading
- [ ] [UI] Add button more information
- [ ] [UI] Change message for no books found according to list context
- [ ] [API] Add route GET `/books/{isbn}`
- [ ] Show cover of books
- [ ] Enable search on full list
- [ ] Show progress of current book
- [ ] Do not allow more than one book reading at the moment
- [ ] Show dates: when was added to the shelve, started/finished reading
- [ ] Authentication & authorization
- [ ] Use Alexa to update status

## References
- [Kongregate Developers Blog - Serverless: Up and Running](https://blog.kongregate.com/serverless-up-and-running/)
- [How to Deploy a Local Serverless Application With AWS SAM](https://medium.com/better-programming/how-to-deploy-a-local-serverless-application-with-aws-sam-b7b314c3048c)
- [Bryson Tyrell - Trick SAM into building your Lambda Layers](https://bryson3gps.wordpress.com/2018/12/06/trick-sam-into-building-your-lambda-layers/)