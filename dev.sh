container_name=graphql-server-psql

# stop redis docker on exit
function cleanup()
{
  echo "cleaning up..."
  echo "docker stop $(docker stop $container_name)"
  echo "docker rm $(docker rm $container_name)"
  exit 0
}
trap cleanup EXIT

echo "Starting $container_name..."
docker run --name $container_name -p 5432:5432 -e POSTGRES_PASSWORD=dev -d postgres:12.5
container_id=$(docker ps -aqf "name=${container_name}")

npm run dev:node-only
