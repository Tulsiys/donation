import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { PaymentContext } from "./data/context";
import { ContextProvider } from "./context";
import { homePageService } from "./jwt/_services/home-page-service";
import './assets/css/style.css';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { PASSWORD_AWS_COGNITO, USER_NAME_AWS_COGNITO } from "./common";
import authAwsPool from './aws-pool/auth-aws';
import Loader from "./views/KDF/loader";
import DonationWidget from "./section/donation/donation-widget";

class Donation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: true,
      settingsData: [],
      isAuthorised: false
    }
  }

  getHomePageData() {
    homePageService.getHomePageSettings()
      .then(response => {
        if (response) {
          response.PaymentContext = PaymentContext;
          this.setState({
            settingsData: response ?? [],
            isDataLoaded: true
          });
        } else {
          this.setState({
            isOnline: false,
            isDataLoading: true,
            settingsData: []
          })
        }
      });
  }

  //isLoadHomePage allow to load homepage data boolian flag
  getAuthorisedHomePage(isLoadHomePage) {
    const user = new CognitoUser({
      Username: USER_NAME_AWS_COGNITO,
      Pool: authAwsPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: USER_NAME_AWS_COGNITO,
      Password: PASSWORD_AWS_COGNITO,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        this.getHomePageData();
        this.setState({
          isAuthorised: true
        })
      },
    })
  }

  componentDidMount() {
    this.getAuthorisedHomePage(true)
  }

  render() {
    return (
      <>
        <ContextProvider value={this.state.settingsData}>
          {
            <BrowserRouter>
              <Suspense fallback={<Loader />}>
                {/* <Route path="/" component={DonationWidget} /> */}
                <Route path="/" component={() => <DonationWidget name={this.props} />} /> 
              </Suspense>
            </BrowserRouter>
          }
        </ContextProvider>
      </>
    )
  }
}

export default Donation;