import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogOut: function () {},
  onLogIn: function (email, password) {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") setIsLoggedIn(true);
  }, []);

  const loginHandler = (email, password) => {
    console.log(email, password);
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLogged", "true");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLogged");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogOut: logoutHandler,
        onLogIn: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
