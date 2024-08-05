pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    sh 'npm install --force'
                    
                    sh 'npm run build'
                    
                    sh '''
                         mkdir -p /var/www/html/job-portal
                        
                         cp -r dist/* /var/www/html/job-portal/
                    '''
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
