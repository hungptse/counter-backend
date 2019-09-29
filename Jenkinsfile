pipeline {
    agent any 
    stages {
        stage('Install pkg') { 
            steps {
                sh 'yarn install'
            }
        }
        stage('Build and Realease') { 
            steps {
                sh 'docker-compose up --force-recreate --no-deps app'
            }
        }
    }
}