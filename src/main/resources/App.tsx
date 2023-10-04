import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState} from "react";

function App() {

  //user cache
  // useState gives us the user object and a setter function
  const [user, setUser ] = useState({});
  
    // global google
    function handleCallbackResponse(response){
      // response.credential is the JSON web token we recieve from login
      // response comes from documentation from google's id services
      console.log("Encoded JWT ID Token: "+ response.credential)
      

      var userObject = jwt_decode(response.credential);
      console.log(userObject);
      setUser(userObject);
      // hide the sign in button when we log in
      document.getElementById("signInDiv").hidden = true;
    }

  function handleSignOut(event){
    // clear user object
    setUser({});
    document.getElementById("signInDiv").hidden = false;


  }  

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "633951300634-vu1l1cnpnmuuls39nteir5qr0s1rj4dj.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

    // google's "1-tap dialogue" to log in 
      // prompt (pop-up) shows accounts that you recently logged in with for easier access.
      // prompt still activates the same callback response.
    google.accounts.id.prompt();

  }, []);
//  user object == null -> show a sign in button
// user object != null -> show a log out button




  // if anything in the array changes, the "useEffect" runs again. if no change, "useEffect runs only once."

  return (
    

    <div className="App">
      <div id = "signInDiv"></div>{
        //to show signout button when logged in

        //P && Q: if P is true do Q
        Object.keys(user).length != 0 &&

        <button onClick = {(e) => handleSignOut(e)}>Sign Out</button> 
      }
      
      { user &&
        <div>
          {/* once signed in, we display the username and profile picture */}
          <img src={user.picture}></img>
          <h3>{user.name}</h3>

        </div>
      }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
