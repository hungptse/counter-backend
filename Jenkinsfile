pipeline {
    agent any 
    stages {
        stage('Install pkg') { 
            steps {
                sh 'yarn install'
            }
        }
        stage('Remove old container') { 
            steps {
                sh 'docker-compose rm -f'
            }
        }
        stage('Build and Realease') { 
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}