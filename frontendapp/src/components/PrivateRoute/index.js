// Dependencies
import React ,{ useState,useEffect} from "react";
import { Redirect, Route } from "react-router";
import { auth, provider } from "../../firebase";

const PrivateRoute = (props) => {
    const [user,setUser] = useState({})
    useEffect(() => {
        auth.onAuthStateChanged(async (currentUser) => {
              setUser(currentUser);
              console.log(currentUser)
              //history.push("/orders");
          });
    }, [])
  return user ? (
    <Route {...props}  component={props.component} render={undefined} />
  ) : (
    <Redirect to={props.redirectPath} />
  );
};
export default PrivateRoute;