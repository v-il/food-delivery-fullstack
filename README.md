Выполнить следующие команды  
`sudo chmod 666 /var/run/docker.sock` (для Ubuntu)  
`docker compose build`  
`docker compose up -d`  
  
Если запуск происходит впервые, то перед выполнением команды `docker compose up -d` выполнить:  
`docker compose run backend npm i`  
`docker compose run frontend npm i`  
  
Смотреть логи контейнера  
`docker compose logs <имя_контейнера (backend, python, db)> -f`  
  
Убить контейнеры  
`docker compose down`  
  
Переход в баш какого-либо контейнера  
`docker compose exec <имя_контейнера> bash`  