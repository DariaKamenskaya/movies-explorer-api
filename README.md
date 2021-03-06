# Дипломный проект: movies-explorer-api
------
<ins>Описание проекта:</ins> бек приложения с авторизацией,регистрацией пользователя и возможность добавлять карточки с фильмами.  
  
<ins>Функционал:</ins>Проект реализован на платформе Node.jsс использованием фреймворка Express.js. В качестве базы данных используется MongoDB (mongodb://localhost:27017/bitfilmsdb). Реализован бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. В проекте выполнена API для авторизации и регистрации пользователя, API для работы с карточками (создание, удаление). Защищены авторизацией все маршруты, кроме страницы регистрации и логина. При попытке неавторизованного пользователя обратиться к защищённому маршруту — возвращает 403 ошибку. API не возвращает хеш пароля. Реализована централизованная обработка ошибок. Валидированы приходящие на сервер запросы и данные на уровне схемы. Реализовано логирование запросов и ошибок. Каждый запрос к API сохраняется в файле request.log. Если API возвращает ошибку, информация о ней сохраняется в файле error.log. Также добавлен .env-файл с основными переменными окружения (секретный ключ для создания и верификации JWT). Выполнен деплой проекта на на Яндекс.Облаке. 
  
<ins>Стек:</ins>  JavaScripts, API, Node.js, Express.js, ESLint, MongoDB, Git.  
  
<ins>Ссылка на проект:</ins> https://api.diplom.kamenskaya.nomoredomains.work 
  
Публичный IP-адрес сервера - 51.250.69.155 
  
Домен бекэнд - api.diplom.kamenskaya.nomoredomains.work
