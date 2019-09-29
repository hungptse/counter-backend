pipeline {
    agent any 
    stages {
        stage('Install pkg') { 
            steps {
                sh 'yarn install'
            }
        }
        stage('Docker rebuild') { 
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Build and Realease') { 
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}