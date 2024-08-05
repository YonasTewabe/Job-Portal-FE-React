pipeline {
    agent any

    stages {
        stage('Cleanup Previous Builds') {
            steps {
                script {
                    // Define the number of builds to keep
                    def buildsToKeep = 5
                    // Delete old builds
                    def buildDir = "${env.WORKSPACE}/builds"
                    sh "find ${buildDir} -type f -mtime +${buildsToKeep} -exec rm -f {} +"
                }
            }
        }
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
