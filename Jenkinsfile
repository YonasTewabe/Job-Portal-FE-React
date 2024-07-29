pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                // Build the React application
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker images using Docker Compose
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                // Start the services defined in docker-compose.yml
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker containers after the build
            script {
                sh 'docker-compose down'
            }
        }
    }
}