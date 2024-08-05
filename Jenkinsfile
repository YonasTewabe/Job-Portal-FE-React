pipeline {
    agent any

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
                        values '14', '16', '18', '20'
                    }
                }
                stages {
                    stage('Setup Node') {
                        steps {
                            script {
                                def nodeVersion = env.NODE_VERSION
                                echo "Using Node.js version: $nodeVersion"
                                sh """
                                    curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
                                    bash n $nodeVersion
                                    export PATH="$PATH"
                                    node -v
                                """
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
