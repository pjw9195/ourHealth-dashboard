import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################


async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  // const [status,setStatus] = useState(false)
  const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
  const signIn = (Username, Password, history) => {
    const poolData = {
      UserPoolId: process.env.REACT_APP_USER_POOL_ID, // your user pool id here
      ClientId: process.env.REACT_APP_CLIENT_ID, // your app client id here
    };
    console.log(poolData)
// Create the User Pool Object
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username: Username, // your username here
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const authenticationData = {
      Username, // your username here
      Password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData,
    );
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        localStorage.setItem("token", result);
        localStorage.setItem("status", "true");
        var accessToken = result.getAccessToken().getJwtToken();
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
        var idToken = result.idToken.jwtToken;
      },
      onFailure: function(err) {
        console.log(err);
        localStorage.setItem("status", "false");

      },
    });
  };
  console.log(login,password)
  signIn(login, password);
  console.log('test')
  if (localStorage.getItem("status")
    === "true") {
    setTimeout(() => {
      setError(null);
      setIsLoading(false);
      dispatch({ type: "LOGIN_SUCCESS" });
      history.push("/app/dashboard");
    }, 2000);
  } else {
    // dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
