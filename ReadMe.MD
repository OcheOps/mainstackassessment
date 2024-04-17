# Mainstack assessment

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

A brief description of what the API does and its purpose.

## Features

- Feature 1: Register and Login user 
- Feature 2: Create and manage products 


## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.


## Usage

1. Configure the API by updating the configuration file.
2. Start the API using `npm start`.
3. Access the API endpoints using the provided base URL.
4. for testing use cases npm run test 

## API Documentation

Detailed documentation of the API endpoints, request/response formats, and any additional information. Link to the postman [Join My Postman team](https://app.getpostman.com/join-team?invite_code=b99fc6f31c4fa0dd9c22b37dcb7b422a&target_code=a3bdec947b9c570f854432368c31e15b)

## Technologies Used

- MongoDB
- Node js (typescript)
- Docker



## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, please contact [ochecodes@gmail.com].
## Deployment

### Prerequisites

- Docker installed on your machine.
- Nodejs 
- Postman

### Building the Docker Image

1. Open a terminal and navigate to the root directory of the project.
2. Build the Docker image using the following command:

    ```bash
    docker build -t mainstack-assessment .
    ```

### Running the Docker Container

1. Start the Docker container using the following command:

    ```bash
    docker run -p 5000:5000 mainstack-assessment
    ```

    This will start the API on port 5000 inside the Docker container.

2. Access the API endpoints using the following base URL:

    ```
    http://localhost:5000
    ```

### Stopping the Docker Container

To stop the Docker container, use the following command:
docker stop <container_id>