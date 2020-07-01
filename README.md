
###Docker containers####:

cmd for mongodb container:
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo

cmd for redis container:
docker run -d -p 6379:6379 --name redisTest redis

cmd for postgreSQL container: 
docker run --name postgres -e POSTGRES_PASSWORD=pass -d -p 5432:5432 postgres
