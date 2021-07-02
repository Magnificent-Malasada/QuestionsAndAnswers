# Start the API server on the production server.
start-web:
	docker-compose -f docker-compose-web.yml up --detach

# Start the Postgres database on the production server.
start-db:
	docker-compose -f docker-compose-db.yml up --detach
