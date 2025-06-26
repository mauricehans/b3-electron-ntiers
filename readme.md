# Todo List App - Architecture N-Tiers

## Lancement

# Construire les conteneurs
make docker-build

# Lancer tout (router, business, db)
make docker-up

# Installer et lancer le client Electron
make install-client
make start-client

## Tester l'API

# Créer une tâche
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Ma première tâche","description":"Description de la tâche","priority":"high"}'

# Obtenir toutes les tâches
curl http://localhost:3000/api/tasks

# Marquer une tâche comme terminée
curl -X PATCH http://localhost:3000/api/tasks/1/toggle

# Supprimer une tâche
curl -X DELETE http://localhost:3000/api/tasks/1
