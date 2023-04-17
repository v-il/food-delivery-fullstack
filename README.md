Выполнить следующие команды

`docker compose build`
`docker compose up -d`

Если запуск происходит впервые, то после команды `docker compose up -d` выполнить:
`docker compose exec backend npm i`
`docker compose exec frontend npm i`
`docker compose restart`

