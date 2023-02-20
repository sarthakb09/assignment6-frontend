import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'YOUR_AUTH0_DOMAIN';
  const clientId = 'YOUR_AUTH0_CLIENT_ID';
  const audience = 'YOUR_AUTH0_AUDIENCE';
  const scope = 'openid profile email';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
      scope={scope}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
