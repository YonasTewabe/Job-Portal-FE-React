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
                            script { def nodeVersion = env.NODE_VERSION
                                echo "Using Node.js version: $nodeVersion"
                                withCredentials([usernamePassword(credentialsId: '596fe7ad-856d-4f00-b2fc-c3277fffd85c', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                sh '''
                                        export N_PREFIX=$WORKSPACE/n
                                        mkdir -p $N_PREFIX
                                        curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /tmp/n
                                        chmod +x /tmp/n
                                        mv /tmp/n $N_PREFIX/n
                                        export PATH=$N_PREFIX:$PATH
                                        $N_PREFIX/n $nodeVersion
                                        node -v
                                        echo $USERNAME
                                        echo $PASSWORD
                                    '''
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
