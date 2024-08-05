pipeline {
    agent any

    environment {
        NODE_VERSIONS = ['14', '16', '18']
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
                        values '14', '16', '18'
                    }
                }
                stages {
                    stage('Setup Node') {
                        steps {
                            script {
                                def nodeVersion = env.NODE_VERSION
                                echo "Using Node.js version: $nodeVersion"
                                withCredentials([usernamePassword(credentialsId: '596fe7ad-856d-4f00-b2fc-c3277fffd85c', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                    sh """
                                        export N_PREFIX=\$WORKSPACE/n
                                        mkdir -p \$N_PREFIX
                                        curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
                                        bash n $nodeVersion
                                        export PATH=\$N_PREFIX/bin:\$PATH
                                        node -v
                                        echo \$USERNAME
                                        echo \$PASSWORD
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
