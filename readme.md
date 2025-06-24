# Construire les conteneurs
make docker-build

# Lancer tout (router, business, db)
make docker-up

# Installer et lancer le client Electron
make install-client
make start-client

# Tester l'API en curl
curl -X POST http://localhost:3000/api/operation -H "Content-Type: application/json" -d '{"a":2,"b":3,"op":"add"}'
