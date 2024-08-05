pipeline {
    agent any
    environment {
        NODE_VERSIONS = ['14.x', '16.x', '18.x']
    }

    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            matrix {
                axes {
                    axis {
                        name 'NODE_VERSION'
                        values '14.x', '16.x', '18.x'
                    }
                }
                stages {
                    stage('Setup Node') {
                        steps {
                            script {
                                def nodeVersion = env.NODE_VERSION
                                echo "Using Node.js version: $nodeVersion"
                                // Add logic here to set up the desired Node.js version
                            }
                        }
                    }
                    stage('Install Dependencies') {
                        steps {
                            sh 'npm ci'
                        }
                    }
                    stage('Build') {
                        steps {
                            sh 'npm run build --if-present'
                        }
                    }
                    stage('Test') {
                        steps {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            echo "Pipeline successful"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
