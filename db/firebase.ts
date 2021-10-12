// import admin, { ServiceAccount } from 'firebase-admin';

// const accessKey: ServiceAccount = {
//   projectId: "trendbase-4b283",
//   clientEmail: "firebase-adminsdk-kxpzl@trendbase-4b283.iam.gserviceaccount.com",
//   privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD2m7TZ8D+XTgN7\nWo/d7K8CAw+AB7w6/xEZ51ycrlwS3m3XIX2uYujR6ycVTLQYO0Zts4nTteW84arJ\n2jIe6Xam8SAJIjCObh2OFV0SfBDkDB/6tmHzeZ2kIATscnq45nvH/WDYrX6UsIX8\n05hUZbzSoVnQV5duTd6hU0FZg8kfSqIbaiT/xu8mTAsJLwAzSK/WiqPeC90tKJaf\nyttnzovgHKTGHoyH6EW6H4yTKrGqSubEwV8GCbmADsRQGR1uhWX3BkNNeQ+ab3/G\n/Zowc/jtdAPuEN+rI7/vWawjVmFpCHMV4vtzUFjOj57SCI2zBQhDrfEa3byz57k4\npBHw58WBAgMBAAECggEALio64luPw/bWPwbWjNBseJ9zDOAl1BOAs400sJ4RXXTn\nMhEycm1QsU9omxunUSvzhMDJ6eiQz9mc+7mNjWzeCeV0vlD4rwkdHkaQjE/OZ6p/\naBMxZf9by+g0k8DgiXGYNXmQ4i8kVZhwFMLVruL2xKVw50gmcH9CUIgB4UyC34je\nlwR+4lsFb+UWZPF/MrR4tkrluLykSWSsl/1+naR1H3GM8T5CzyY8yFxpiMfdT8uv\nhRc3d9X24PwmXt1TjGKTi2QTZlHrwmW6ZZkqUSfuFD7qpzoiM0wdLti+AA23nRLf\nxaTlrZ7zB4NxpngY8WoJSHLzNSPHeIc/K48ALVA0mwKBgQD/Y9l3Fu6rvCs1+i5x\nUm/k4+IZpDemqgUSJhEPK5G0sRAGh/CFVQby6Ui7B3RiorbQJHSGOP/3pH9aoLo7\nPqD+wF6ir++ZkhHIynQusLEjc2ZSEiY8uvfNeiyY57oAcl5hLrcFGWLVa3/PMyo3\nIHteCRar3kSq7BYUBztBlcLhAwKBgQD3MnzTs6h+co7K2rE4j17J03Xy7lDuYvv/\nKAV3voQKsdYoujSpnVb9pbbtJeV8XnoSX8QI6E0xcSleVVlDCMaDckyMu1kyAF0y\nilKwYggbCAoQ7G/RbhgX1JGPid2tRBxDyKwApgO+SIUrwhipZsqrleMd4XbImHKS\n2FO2hvn+KwKBgQCDLkeiiy33GoVbiXFXlg+Rk5gssZRAUG6gXts+XpPOK3De2e6q\nnf0ewsMwBmk6zPd4PHF6DEc2bdFYvNxL2CScFjXF/PbmfAgUiiFZZjrmybzSBS6M\n3UCx08Kam9SHrDdcVcF+pgaFN12EEXTqsg2MRMDXcSj2XqQMj5ZZXtKl/wKBgQCE\nUjFBfVT/QsEu0vu0hAJAVQI5JNqLkM7FmZ27qG6z7tfteyc/d+qd4fvWW8fI2CXN\n+hdMkVTo12NGjLc4S9U/fYp+drbbLhi1OhfjNMaT+ayxvG5qk90vvGiihjD0U5Yx\nrpRr0HIGhHlMoBxlaZGpYZVuZEcaP4htFIFTHlNpewKBgA7/waO1m9ERsM8tIRkz\neUj531JZjoz/QVnAySFTZmr3au6Vb0u4vp5TuAT6zoume8iNKnuH5EwIqH7mj7ki\nNz5Mq33Zt4vRGRPV+bWmNHdLbWfDTr0auKrF4sAwaRR2DT8m/5oq6AtwC9Vot85x\nc6UN0rjwqiNYa1zoifHMNgvK\n-----END PRIVATE KEY-----\n",
// }

// if (!admin.apps.length) {
//   try {
//     admin.initializeApp({
//       credential: admin.credential.cert(accessKey),
//       databaseURL: "https://trendbase-4b283-default-rtdb.firebaseio.com"
//     });
//   } catch (error) {
//     console.log('Firebase admin initialization error', error.stack);
//   }
// }
// const fb = admin.firestore();
// export default fb;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const clientCredentials = {
  apiKey: "AIzaSyB5sfB-j7n6Nh2-rIJlZL0JIK-eorjVC-k",
  authDomain: "trendbase-4b283.firebaseapp.com",
  databaseURL: "https://trendbase-4b283-default-rtdb.firebaseio.com",
  projectId: "trendbase-4b283",
  storageBucket: "trendbase-4b283.appspot.com",
  messagingSenderId: "874029703633",
  appId: "1:874029703633:web:f043245e6627a84f4480f0"
};

try {
  firebase.initializeApp(clientCredentials);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;