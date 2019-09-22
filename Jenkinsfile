pipeline {
    agent any 
    stages {
        stage('Install') { 
            steps {
                sh 'yarn install'
            }
        }
        stage('Build and Realease') { 
            steps {
                sh 'docker-compose up'
            }
        }
    }
}