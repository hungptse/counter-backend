pipeline {
    agent any 
    stages {
        stage('Build and Realease') { 
            steps {
                sh 'docker-compose up'
            }
        }
        // stage('Release') { 
        //     steps {
        //         sh 'docker run -it -d -p 3000:3000 fe:latest'
        //     }
        // }
    }
}