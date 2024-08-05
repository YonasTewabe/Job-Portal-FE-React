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
        stage('Verify Deployment') {
    steps {
        sh 'curl -f http://139.185.53.188/ || exit 1'
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
