pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        N_PREFIX = '/var/lib/jenkins/n'
        DEPLOY_FOLDER = '/var/www/html/job-portal'
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
                        values '20'
                    }
                }
                stages {
                    stage('Install Dependencies') {
                        steps {
                            script {
                                // Setup Node.js using the updated N_PREFIX
                                sh '''
                                    mkdir -p $N_PREFIX
                                    curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /tmp/n
                                    chmod +x /tmp/n
                                    mv /tmp/n $N_PREFIX/n
                                    export PATH=$N_PREFIX:$PATH
                                    $N_PREFIX/n $NODE_VERSION
                                    node -v
                                    npm install --force
                                '''
                            }
                        }
                    }
                    stage('Build') {
                        steps {
                            sh 'npm run build'
                        }
                    }
                    stage('Deploy to Web Server') {
                        steps {
                            script {
                                // Ensure the deployment directory exists
                                sh '''
                                    sudo mkdir -p $DEPLOY_FOLDER
                                    sudo cp -r dist/* $DEPLOY_FOLDER/
                                '''
                            }
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
