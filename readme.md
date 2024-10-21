# Application Deployment
The app is deployed in Google Kubernetes Engine accessible in `http://34.101.199.30:3000/`

# How to run the app locally

> Note: This app is using minikube & docker to run the app, if you want to run the app on your local machine, you can use the following steps:

First, start minikube:

```bash
minikube start
```

Then, apply the following:

```bash
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-config.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f app-deployment.yaml
```

> Note: Database will be initialized & seeded automatically when the app is running.

Check if all pods are running:

```bash
kubectl get pods
```

Then call:

```bash
minikube service tommy-iykra-app-service
```

Then the app URL will be displayed on the second table in the terminal, it should be something like:

```bash
http://127.0.0.1:<PORT>
```

> Note: Because we are using minikube we have to use tunneling to access the app, the network is limited if using the Docker driver on Darwin, Windows, or WSL, and the Node IP is not reachable directly.

# API Documentation

## Base URL

`http://127.0.0.1:<PORT>/api`

## Endpoints

### Health Check

Check if the API server is running.

- **URL:** `/ping`
- **Method:** `GET`
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Tommy IYKRA api server is running"
    }
    ```

### Get All Employees

Retrieve a list of all employees.

- **URL:** `/employees`
- **Method:** `GET`
- **Headers:**
  - `x-api-version` (optional): Specify the API version (e.g., `2.0.0`).
- **Behavior:**
  - If for example, `x-api-version` is **greater than or equal to** `2.0.0` or empty, returns latest version response.
  - Otherwise, returns default version response.

#### Version 1

- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Employees fetched successfully",
      "data": [
        {
          "id": 1,
          "name": "John Doe",
          "position": "Developer",
          "salary": 60000
        },
        ...
      ]
    }
    ```

#### Version 2

- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Employees fetched successfully V2",
      "data": [
        {
          "id": 1,
          "name": "John Doe",
          "position": "Developer",
          "salary": 60000,
          "department": "Engineering"
        },
        ...
      ]
    }
    ```

### Get Employee by ID

Retrieve details of a specific employee by their ID.

- **URL:** `/employees/:id`
- **Method:** `GET`
- **Parameters:**
  - `id` (path): The unique identifier of the employee.
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Employee fetched successfully",
      "data": {
        "id": 1,
        "name": "John Doe",
        "position": "Developer",
        "salary": 60000
      }
    }
    ```

### Create a New Employee

Add a new employee to the database.

- **URL:** `/employees`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Jane Smith",
    "position": "Designer",
    "salary": 55000
  }
  ```
- **Response:**
  - **Status:** `201 Created`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Employee created successfully",
      "data": {
        "id": 2,
        "name": "Jane Smith",
        "position": "Designer",
        "salary": 55000
      }
    }
    ```

### Update an Employee

Update the details of an existing employee.

- **URL:** `/employees/:id`
- **Method:** `PUT`
- **Parameters:**
  - `id` (path): The unique identifier of the employee.
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "position": "Senior Designer",
    "salary": 65000
  }
  ```
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Employee updated successfully",
      "data": {
        "id": 2,
        "name": "Jane Doe",
        "position": "Senior Designer",
        "salary": 65000
      }
    }
    ```

### Delete an Employee

Remove an employee from the database.

- **URL:** `/employees/:id`
- **Method:** `DELETE`
- **Parameters:**
  - `id` (path): The unique identifier of the employee.
- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "success": true,
      "message": "Employee deleted successfully"
    }
    ```

## Error Handling

The API returns errors in a consistent format with appropriate HTTP status codes.

- **Response Structure:**

  ```json
  {
    "success": false,
    "message": "Error message detailing what went wrong."
  }
  ```

- **Common Error Status Codes:**
  - `400 Bad Request`: Invalid input or wrong API version format.
  - `404 Not Found`: Resource not found.
  - `500 Internal Server Error`: Unexpected server error.

### Example Error Response

```json
{
  "success": false,
  "message": "Invalid API version format."
}
```
