# Third-Party Authentication Setup Guide

This document outlines how to integrate third-party authentication (Google OAuth, GitHub OAuth) into the Hexad Library application.

## Current Status

Currently, the application uses **mock authentication** for demonstration purposes. Users can select a role (USER or ADMIN) and login without credentials.

## Integration Steps for Google OAuth

### 1. Install Dependencies

```bash
npm install @react-oauth/google
```

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`
5. Copy your **Client ID**

### 3. Update AuthContext.tsx

```typescript
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Wrap your app with GoogleOAuthProvider in App.tsx
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
</GoogleOAuthProvider>

// In AuthContext.tsx, add Google login handler
const loginWithGoogle = (credentialResponse: any) => {
  const decoded = jwtDecode(credentialResponse.credential);
  const user = {
    id: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    role: determineUserRole(decoded.email) // Implement role logic
  };
  setUser(user);
  // Store token in localStorage or secure cookie
  localStorage.setItem('authToken', credentialResponse.credential);
};
```

### 4. Update LoginPage.tsx

```typescript
import { GoogleLogin } from '@react-oauth/google';

// Add Google login button
<GoogleLogin
  onSuccess={loginWithGoogle}
  onError={() => setError('Google login failed')}
/>
```

## Integration Steps for GitHub OAuth

### 1. Install Dependencies

```bash
npm install react-github-login
```

### 2. Get GitHub OAuth Credentials

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: Hexad Library
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Copy your **Client ID** and **Client Secret**

### 3. Setup Backend Proxy (Required for GitHub)

GitHub OAuth requires a backend to exchange the code for an access token.

**Option A: Create a simple backend endpoint**
```javascript
// backend/auth.js
app.post('/auth/github', async (req, res) => {
  const { code } = req.body;
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  const data = await tokenResponse.json();
  res.json(data);
});
```

**Option B: Use a serverless function (Vercel, Netlify)**

### 4. Update AuthContext.tsx

```typescript
const loginWithGitHub = async (code: string) => {
  // Exchange code for access token via your backend
  const response = await fetch('/api/auth/github', {
    method: 'POST',
    body: JSON.stringify({ code })
  });
  const { access_token } = await response.json();
  
  // Get user info from GitHub API
  const userResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const githubUser = await userResponse.json();
  
  const user = {
    id: githubUser.id.toString(),
    name: githubUser.name || githubUser.login,
    email: githubUser.email,
    role: determineUserRole(githubUser.email)
  };
  setUser(user);
  localStorage.setItem('authToken', access_token);
};
```

## Token Security

### Best Practices

1. **Store tokens securely**
   - Use `httpOnly` cookies for production
   - For development: `localStorage` is acceptable but less secure

2. **Implement token refresh**
   ```typescript
   const refreshToken = async () => {
     const token = localStorage.getItem('refreshToken');
     const response = await fetch('/api/auth/refresh', {
       method: 'POST',
       headers: { Authorization: `Bearer ${token}` }
     });
     const { accessToken } = await response.json();
     localStorage.setItem('authToken', accessToken);
   };
   ```

3. **Add token expiration checking**
   ```typescript
   useEffect(() => {
     const token = localStorage.getItem('authToken');
     if (token) {
       const decoded = jwtDecode(token);
       if (decoded.exp * 1000 < Date.now()) {
         logout(); // Token expired
       }
     }
   }, []);
   ```

4. **Implement CSRF protection**
   - Use anti-CSRF tokens for state-changing operations
   - Validate token signatures on the backend

## Role Assignment Strategy

```typescript
const determineUserRole = (email: string): "USER" | "ADMIN" => {
  // Option 1: Hardcode admin emails
  const adminEmails = ['admin@library.com', 'manager@library.com'];
  if (adminEmails.includes(email)) return "ADMIN";
  
  // Option 2: Check against database
  // const userRole = await getUserRoleFromDB(email);
  // return userRole;
  
  // Option 3: Domain-based
  // if (email.endsWith('@admin.library.com')) return "ADMIN";
  
  return "USER";
};
```

## Environment Variables

Create a `.env` file:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
REACT_APP_API_URL=http://localhost:3001
```

Access in code:
```typescript
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
```

## Security Checklist

- [ ] Never expose client secrets in frontend code
- [ ] Use HTTPS in production
- [ ] Implement token refresh mechanism
- [ ] Add token expiration validation
- [ ] Store sensitive tokens in httpOnly cookies (production)
- [ ] Implement CSRF protection
- [ ] Validate tokens on backend for sensitive operations
- [ ] Add rate limiting to prevent brute force attacks
- [ ] Implement proper logout (clear tokens)
- [ ] Add password/session timeout

## Testing Authentication

```typescript
// Mock authentication for testing
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: ({ onSuccess }: any) => (
    <button onClick={() => onSuccess({ credential: 'mock_token' })}>
      Mock Google Login
    </button>
  )
}));
```

## Next Steps

1. Choose authentication provider (Google, GitHub, or both)
2. Set up OAuth application in provider's console
3. Install required dependencies
4. Implement authentication flow
5. Add token security measures
6. Test authentication flow
7. Deploy to production with HTTPS

---

**Note:** The current mock authentication is sufficient for development and demo purposes. Implement third-party auth when deploying to production or when real user management is required.
