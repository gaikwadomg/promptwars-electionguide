import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app = null;
let analytics = null;

// Initialize Firebase only if config is provided
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = initializeApp(firebaseConfig);
    // Analytics requires browser support — check before initializing
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
  }
}

/**
 * Log a custom event to Firebase Analytics.
 * Gracefully no-ops if analytics is not available.
 * @param {string} eventName - The event name (e.g. 'chapter_completed')
 * @param {Object} [params] - Optional event parameters
 */
export function logEvent(eventName, params = {}) {
  if (analytics) {
    try {
      firebaseLogEvent(analytics, eventName, params);
    } catch (error) {
      console.warn('Analytics logEvent failed:', error.message);
    }
  }
}

export { app, analytics };
export default app;
