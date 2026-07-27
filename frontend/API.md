# Todo List API Documentation

**Base URL:** `http://localhost:3000`

---

## 1. Health Check

```
GET /
```

**Response:** `200 OK`
```
"hello world"
```

---

## 2. Get All Tasks

```
GET /tasks
```

**Response:** `200 OK`
```json
{
  "message": "Tasks Fetched Successfully",
  "tasks": [
    {
      "_id": "64a...",
      "task": "Buy groceries",
      "isFinished": false,
      "__v": 0
    }
  ]
}
```

---

## 3. Create a Task

```
POST /create-task
Content-Type: application/json
```

**Request Body:**
```json
{
  "task": "Buy groceries"
}
```

**Response:** `201 Created`
```json
{
  "message": "Task Added Successfully"
}
```

> `isFinished` defaults to `false` on creation.

---

## 4. Mark Task as Finished

```
PATCH /finish-task/:id
```

**Path Parameters:**

| Param | Type   | Description              |
|-------|--------|--------------------------|
| id    | string | MongoDB `_id` of the task |

**Response:** `200 OK`
```json
{
  "message": "Task marked as Finished"
}
```

---

## Data Model (Task)

```json
{
  "_id": "ObjectId",
  "task": "String",
  "isFinished": "Boolean",
  "__v": 0
}
```
