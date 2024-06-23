# Patient Registration Application

This application is a patient registration system composed of multiple microservices including a frontend built with React and Vite, and a backend built with NestJS. The system also uses MySQL as the database and Redis for BullQueue. All the services are containerized using Docker and managed through Docker Compose.

## Prerequisites

- Docker installed on your machine.
- Docker Compose installed on your machine.

## Folder Structure

patient-registration-frontend/
│ ├── Dockerfile
│ ├── .env
│ ├── ...
patient-registration-backend/
│ ├── docker/
│ │ ├── db/
│ │ │ ├── data/
│ │ │ ├── my.cnf
│ │ │ ├── sql/
│ │ ├── ...
│ ├── .env
│ ├── docker-compose.yml
│ ├── Dockerfile
│ ├── ...
notification-service/
│ ├── ...


## Environment Variables

### Backend `.env` file in `patient-registration-backend/`

DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_HOST=db
DATABASE_PORT=3306
REDIS_HOST=redis
REDIS_PORT=6379
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host

### Frontend `.env` file in `patient-registration-frontend/`

VITE_BACKEND_HOST=http://127.0.0.1:3001
PORT=3003


## Docker Compose Configuration

The `docker-compose.yml` file is located in the `patient-registration-backend/` directory. It defines all the services required for the application.

## How to Run the Application

1. **Clone the repository**:

    ```bash
    git clone https://github.com/emmanuelAcosta2/patient-registration.git
    cd patient-registration-backend
    ```

2. **Ensure that the environment variables are set correctly**:

    Make sure you have the `.env` files set up correctly in both the `patient-registration-backend/` and `patient-registration-frontend/` directories.

3. **Build and run the application using Docker Compose**:

    ```bash
    docker-compose up --build
    ```

    This command will build and start all the services defined in the `docker-compose.yml` file.

4. **Access the application**:

    Open your web browser and navigate to `http://127.0.0.1:3003`. This will load the frontend of the patient registration application.


## Services

- **Frontend**: React application served by Vite.
- **Backend**: Two microservices built with NestJS. One for patient registration and the other for sending notifications.
- **Database**: MySQL database for storing patient information.
- **Cache**: Redis for BullQueue.

## File Upload Handling

The backend service is configured to handle file uploads (e.g., patient document photos). The uploaded files are stored in a specific directory on the server. The frontend can display these files by fetching them using the appropriate URLs.

## Security Considerations

- **Input Validation**: Always validate and sanitize user inputs to prevent SQL injection and other attacks.
- **File Handling**: Validate the type and size of uploaded files to prevent malicious uploads.
- **Environment Variables**: Keep sensitive information such as database passwords and email credentials secure and out of the source code.

## Future Enhancements

- Implement authentication and authorization for securing the endpoints.
- Use environment variables for sensitive configurations and avoid committing them to the source code.
- Add unit tests and integration tests to ensure the reliability of the application.
- Implement logging and monitoring to track application behavior and performance.
- Handle errors and exceptions gracefully to provide a better user experience.
- Use AWS S3 or another cloud storage service for storing uploaded files securely.
- Finish the CRUD operations for the patient registration service.
- Enhance the frontend with more features and a better user interface.

## Troubleshooting

- **Service Not Starting**: Check the logs of the specific service to identify any issues.
    ```bash
    docker-compose logs service-name
    ```
- **Database Connection Issues**: Ensure that the database service is up and running and the environment variables are set correctly.
- **Frontend Not Connecting to Backend**: Ensure the `VITE_BACKEND_HOST` variable in the frontend `.env` file is set correctly.

## Stopping the Application

To stop the application and remove the containers, networks, and volumes created by Docker Compose:

```bash
docker-compose down
```
