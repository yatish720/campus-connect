# Campus Connect — Firebase Setup

## 1. Create Firebase project
1. Open Firebase Console.
2. Create a project named `campus-connect-ncj`.
3. Add a Web App.
4. Copy the Web App configuration into `firebase/firebase-config.js`.

## 2. Enable Authentication
Firebase Console → Authentication → Sign-in method → Email/Password → Enable.

## 3. Create Firestore
Firebase Console → Firestore Database → Create database.

## 4. Deploy Firestore rules
Copy `firebase/firestore-rules.txt` into Firestore Rules.

## 5. Create the first admin
Create an Email/Password user in Firebase Authentication.
Then create a Firestore document:
`users/{THE_AUTH_USER_UID}`

Example:
```json
{
  "collegeId": "ADMIN001",
  "name": "College Administrator",
  "email": "admin@example.com",
  "role": "admin",
  "accountStatus": "active"
}
```

## 6. Student accounts
For a real permanent-ID system, each student should have a Firebase Authentication account.
Store their college ID in `users/{uid}`. The college ID is an identifier, not the password.

## 7. GitHub Pages
Upload the project to GitHub and enable Pages from:
Settings → Pages → Deploy from branch → main → /(root).

IMPORTANT:
Do not upload Firebase service-account JSON files or private server keys to GitHub.
