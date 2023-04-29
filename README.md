Выполнить следующие команды  
`sudo chmod 666 /var/run/docker.sock` (для Ubuntu)  
`docker compose build`  
  
Если запуск происходит впервые, то перед выполнением команды `docker compose up -d` выполнить:  
`docker compose run backend npm i`  
`docker compose run frontend npm i`

Запустить контейнеры  
`docker compose up -d`  
  
Смотреть логи контейнера  
`docker compose logs <имя_контейнера (backend, python, db)> -f`  
  
Убить контейнеры  
`docker compose down`  
  
Переход в баш какого-либо контейнера  
`docker compose exec <имя_контейнера> bash`  
  
## После настройки и установки  
Документация API доступна после запуска контейнеров по ссылке  
http://localhost:5000/docs

Для заполнения таблицы ролей и категорий перейти по следующим роутам
http://localhost:5000/roles/init
http://localhost:5000/categories/init