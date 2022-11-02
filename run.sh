yarn build

docker build -t logsheaf --network=host .
docker run -p 5000:8080 -d logsheaf
