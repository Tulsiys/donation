import { authenticationService } from '../_services';
import { authContext } from "../../data/authContext";
export function authHeader() {
    // return authorization header with jwt token
    // const currentUser = authenticationService.currentUserValue; 
    // console.log(authContext, "from auht header");
    return {
        "givepls_token": authContext.IdToken,
        "Content-Type": "application/json",
        // mode: 'cors',
        // mode: 'no-cors',
        // "accept": "*/*",
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin" : '*',
        // "Access-Control-Allow-Credentials": true,
        // "Access-Control-Expose-Headers": "Date, x-api-id",
        // "Access-Control-Max-Age": 300,
        // "Access-Control-Allow-Methods": '*',
        // "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        // "Access-Control-Allow-Origin" : "https://dev-ngs.givepls.com",        
        // "Content-Type": "application/json-patch+json"
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
        // Access-Control-Allow-Origin'
    };

}