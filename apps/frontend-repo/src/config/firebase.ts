import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAZGZx3fUNVwYn_2alYCh0AuJIimc0X0K4",
  authDomain: "hegy-project.firebaseapp.com",
  projectId: "hegy-project",
  storageBucket: "hegy-project.firebasestorage.app",
  messagingSenderId: "1090871801984",
  appId: "1:1090871801984:web:e5dae2d77bfa7bacb44e65",
  measurementId: "G-YJ3RGC44L9"
};

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}