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

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             def imageName = 'yonastewabe/job-portal'
        //             def imageTag = "latest"
                    
        //             sh "docker build -t ${imageName}:${imageTag} ."
        //             // sh "docker push ${imageName}:${imageTag}"
        //         }
        //     }
        // }
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
