docker-build:
	docker compose build

docker-up:
	docker compose up -d

docker-down:
	docker compose down

install-client:
	cd client && npm install

start-client:
	cd client && npm run start