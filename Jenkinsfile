pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.nvm/versions/node/v20.9.0/bin:/var/lib/jenkins/bin:${env.PATH}"
    }
    stages {
        stage("Populate env") {
            steps {
                sh 'rm .env || true'
                sh 'echo VITE_BACKEND_URL=https://rimajon.araozu.dev>>.env'
                sh 'echo VITE_WS_URL=wss://rimajon.araozu.dev>>.env'
            }
        }
        stage('Install') {
            steps {
                sh 'pnpm i'
            }
        }
        stage('Build') {
            steps {
                sh './node_modules/.bin/vite build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf /var/www/rimajon-fe/*'
                sh 'cp -r ./dist/* /var/www/rimajon-fe/'
            }
        }
    }
}