# testTaskW 
https://intense-scrubland-94182.herokuapp.com deploy link

Для запуска и работы сервера локально необходим .env файл в корне приложения со следующим содержанием
```dotenv
PORT=ваш порт
MONGODB_URL=<uri для подлючеия к монге>
JWT_SECRET=CHANGE_ME
```

Запуск сервера локально
```shell
npm i
npm run build
npm run start
```

Регистрация рользователя /auth/registration (метод POST)
```shell
Request
{
"username": "",
"email": "",
"password": ""
}

Response
{
token: ""
}
```
Авторизация пользователя /auth/login (метод POST)
```shell
Request
{
"email": "",
"password": ""
}

Response
{
token: ""
}
```
Создание поста /posts (метод POST)
```shell
Request
загруженные медиафайлы в запросе 
{
"postMessage": ""
}
```
Редактирование поста /posts (метод PUT)
```shell
Request
загруженные медиафайлы в запросе 
{
"postMessage": "",
"postId": "" // ID поста для редактирования
}
```
Удаление поста /posts/:id (метод DELETE)

Получение списка постов с пагинацией /posts?page=(number of page) (метод GET)
