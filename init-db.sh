#!/bin/sh
set -e

echo "Waiting for MySQL to be ready..."
# Attendre que MySQL soit prêt
until npx prisma migrate deploy; do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "MySQL is up - migrations completed successfully"

# Exécuter la commande passée en argument
exec "$@"

