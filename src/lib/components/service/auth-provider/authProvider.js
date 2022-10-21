// src/auth/auth0-provider-with-history.js
import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } from "../../common/constant";

const AuthProvider = ({ children }) => {
  const domain = REACT_APP_AUTH0_DOMAIN;
  const clientId = REACT_APP_AUTH0_CLIENT_ID;

  // const domain = "test-business.us.auth0.com";  
  // const clientId = "7580LbTiCevcCavFsfux90TlYtZKprnX";

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    // console.log(appState, "app");
    // history.push(appState?.returnTo || window.location.pathname);
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      buildLogoutUrl={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;