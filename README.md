## Task server

## Instalation

```
npm install
npm run build
npm start
```

OR via docker

```
docker build -t task .
docker run --name task -p 3000:3000 -d task
```

## Test

```
npm run test
```

## Endpoints

```
GET /tasks: list all tasks of a user
POST /task: create a new task
GET /task/{taskId}: view a task
PUT /task/{taskId}/move_to/{STATUS}: move a task to a new status
PATCH /task/{taskId}/archive: archive a task

```

please pass user id into request header "user"
