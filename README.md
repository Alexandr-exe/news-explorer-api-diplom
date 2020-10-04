# news-explorer-api-diplom

Tatarnikov Alexandr
==
### Дипломная работа Yandex.praktikum

зависимости использованные в проекте:

- express,
- helmet,
- mongoose,
- body-parser,
- bcryptjs,
- jsonwebtoken,
- validator,
- celebrate,
- winston

**Доменные имена и ip:**

- [API](https://api.exart.website)
- [IP](https://95.71.124.253)
- [Статические файлы](https://exart.website)

Запросы сервера:

_Создание пользователя_

- /signup (POST)

_Авторизация_

- /signin (POST)

_возвращает информацию о пользователе (email и имя)_

- /users/me (GET)

_Создать карточку_

- domain/articles (POST)

_Удалить карточку_

- /cards/articleId (DELETE)

_возвращает все сохранённые пользователем статьи_

- /articles (GET)
