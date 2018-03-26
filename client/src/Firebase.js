import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDRWzyi5nn7qEwvCg9MCDqM8esdni7r8xQ',
  authDomain: 'adhiarta-kanban.firebaseapp.com',
  databaseURL: 'https://adhiarta-kanban.firebaseio.com',
  projectId: 'adhiarta-kanban',
  storageBucket: '',
  messagingSenderId: '1031906230183'
}

const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.database()
