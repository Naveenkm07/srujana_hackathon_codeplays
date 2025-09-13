# 🌊 Windsurf Firebase Admin Panel

A secure admin-only web panel built with Firebase Authentication (Google Sign-In + Email/Password) and Cloud Firestore. No custom backend required.

## 🎯 Features

- **Dual Authentication**: Google Sign-In and Email/Password registration
- **Admin-Only Access**: Only users with admin privileges can access the panel
- **User Management**: View all registered users with login tracking
- **Real-time Updates**: Live user list with automatic updates
- **Search & Filter**: Find users by name/email, filter by authentication provider
- **Admin Controls**: Grant/revoke admin status for users
- **Mobile-Friendly**: Responsive design for all devices
- **Security**: Firestore rules enforce admin-only access

## 🚀 Quick Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable **Google** and **Email/Password** providers
4. Create Firestore Database:
   - Go to Firestore Database → Create database
   - Start in test mode (we'll add security rules later)

### 2. Get Firebase Configuration

1. Go to Project Settings → General → Your apps
2. Add a web app or select existing one
3. Copy the Firebase configuration object
4. Replace the placeholder values in `firebase.js`

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. Deploy Firestore Security Rules

1. Go to Firestore Database → Rules
2. Replace existing rules with content from `firestore.rules`
3. Click **Publish**

### 4. Create Initial Admin

⚠️ **IMPORTANT**: You must manually create the first admin user.

1. Sign up through the web app first (to create your user document)
2. Go to Firestore Console → Data
3. Create collection: `admins`
4. Add document with ID = your user's UID (found in Authentication → Users)
5. Add fields:
   ```
   role: "admin"
   addedAt: [current timestamp]
   ```

### 5. Install Dependencies & Run

```bash
cd firebase-admin-panel
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## 📊 Data Structure

### Users Collection (`users/{uid}`)
```javascript
{
  uid: "user-unique-id",
  name: "John Doe",
  email: "john@example.com",
  provider: "google.com" | "password",
  createdAt: Timestamp,
  lastLogin: Timestamp
}
```

### Admins Collection (`admins/{uid}`)
```javascript
{
  role: "admin",
  addedAt: Timestamp
}
```

## 🔐 Security Rules

The Firestore rules ensure:
- Users can only write their own user documents
- Only admins can read the users collection
- Admin status is controlled by document existence in `admins/{uid}`
- Bootstrap protection for initial admin setup

## 🎮 Usage

### For Regular Users
1. Visit the login page
2. Sign in with Google or create email/password account
3. User data is automatically tracked in Firestore
4. Non-admin users see "Access Denied" message

### For Admins
1. Sign in with admin account
2. View real-time list of all users
3. Search users by name or email
4. Filter by authentication provider (Google/Email)
5. Grant or revoke admin privileges
6. See user registration and last login times

## 📱 Mobile Support

The interface is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Touch interactions

## 🔧 Development

### Project Structure
```
firebase-admin-panel/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── app.js             # Main application logic
├── firebase.js        # Firebase configuration
├── auth.js           # Authentication functions
├── admin.js          # Admin panel functions
├── firestore.rules   # Security rules
├── package.json      # Dependencies
└── README.md         # This file
```

### Key Functions

**Authentication (`auth.js`)**
- `loginWithGoogle()` - Google Sign-In
- `loginWithEmail()` - Email/Password Sign-In
- `signUpWithEmail()` - Email/Password Registration
- `upsertUser()` - Create/update user document
- `isUserAdmin()` - Check admin status

**Admin Panel (`admin.js`)**
- `subscribeToUsers()` - Real-time user list
- `makeAdmin()` - Grant admin privileges
- `revokeAdmin()` - Revoke admin privileges
- `filterUsers()` - Search and filter functions

## 🚨 Security Considerations

- **Client-side validation**: All logic runs in browser with Firestore rules as security layer
- **Admin bootstrap**: First admin must be created manually in Firestore console
- **Provider validation**: Users can potentially modify provider values (add server-side validation for production)
- **Audit trail**: Consider Cloud Functions for stronger audit guarantees in production

## 🐛 Troubleshooting

### Common Issues

**"Permission denied" errors**
- Check Firestore rules are deployed correctly
- Ensure admin document exists for your user
- Verify authentication is working

**Google Sign-In not working**
- Check Firebase Authentication configuration
- Verify authorized domains in Firebase console
- Ensure correct client ID in firebase.js

**Users not appearing in admin panel**
- Check Firestore rules allow admin read access
- Verify user documents are being created on login
- Check browser console for errors

### Debug Steps

1. Open browser developer tools
2. Check Console tab for errors
3. Verify Firebase configuration
4. Test authentication flow
5. Check Firestore documents are created

## 📄 License

MIT License - feel free to use for any purpose.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify Firebase project configuration
- Review Firestore security rules
- Ensure admin document exists

---

**Built with ❤️ for Windsurf using Firebase**
