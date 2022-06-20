// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: process.env.REACT_APP_AUTH_PROVIDER_AUTHORITY,
    clientId: process.env.REACT_APP_AUTH_PROVIDER_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH_PROVIDER_REDIRECT_URL
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    "user.read"
  ]
}
 
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)