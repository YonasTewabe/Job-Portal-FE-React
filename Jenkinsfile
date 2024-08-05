pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YonasTewabe/Job-Portal-FE-React.git'
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
                                withCredentials([string(credentialsId: 'your-credentials-id', variable: 'SECRET_TEXT')]) {
                                    sh """
                                        export N_PREFIX=\$WORKSPACE/n
                                        mkdir -p \$N_PREFIX
                                        curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
                                        bash n $nodeVersion
                                        export PATH=\$N_PREFIX/bin:\$PATH
                                        node -v
                                        echo \$SECRET_TEXT
                                    """
                                }
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
