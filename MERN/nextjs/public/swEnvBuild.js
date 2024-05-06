require('dotenv').config({ path: '.env.local' }); // make sure you have '.env.local' file.
const fs = require('fs');

fs.writeFileSync(
  './public/swenv.js',
  `const process = {
    env: {
      NEXT_PUBLIC_FIREBASE_API_KEY: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: '${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
      NEXT_PUBLIC_FIREBASE_APP_ID: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}',
      NEXT_PUBLIC_FIREBASE_KEY_PAIR: '${process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR}'
    },
  };`
);
