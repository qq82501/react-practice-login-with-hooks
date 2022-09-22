import React, { useEffect, useReducer, useRef, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const reducerLogin = function (state, action) {
  switch (action.type) {
    case "EMAIL_VALID":
      return { ...state, emailIsValid: true };
    case "EMAIL_INVALID":
      return { ...state, emailIsValid: false };
    case "PSW_VALID":
      return { ...state, passwordIsValid: true };
    case "PSW_INVALID":
      return { ...state, passwordIsValid: false };
    case "FORM_VALID":
      return {
        ...state,
        formIsValid: true,
        email: action.payload.email,
        password: action.payload.password,
      };
    case "FORM_INVALID":
      return { ...state, formIsValid: false };

    default:
      return state;
  }
};

const initialState = {
  email: "",
  password: "",
  emailIsValid: null,
  passwordIsValid: null,
  formIsValid: false,
};

const Login = (props) => {
  const myContext = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducerLogin, initialState);
  const refEmail = useRef();
  const refPassword = useRef();
  useEffect(() => {
    //1. Run at first time Login component renders, and while enterEmail & enteredPassword changes
    //2. Using timer to valid input value once user stop for 0.5sec, by doing so, website doesn't have to valid date every keystroke.
    const bufferTime = setTimeout(() => {
      if (state.emailIsValid && state.passwordIsValid)
        dispatch({
          type: "FORM_VALID",
          payload: {
            email: refEmail.current.inputValue,
            password: refPassword.current.inputValue,
          },
        });
      else dispatch({ type: "FORM_INVALID" });
    }, 300);

    //3. return of useEffect's callback function, works as similar as ComponentWillUnmount, so ar first render, return won't be triggered, then re-render occurs, Login component will unmount then render again, so clearTimeout() will execute first, next setTimeout does.
    return () => {
      clearTimeout(bufferTime);
    };
  }, [state.emailIsValid, state.passwordIsValid]);

  const emailChangeHandler = (event) => {
    if (event.target.value.includes("@")) dispatch({ type: "EMAIL_VALID" });
    else dispatch({ type: "EMAIL_INVALID" });
  };

  const passwordChangeHandler = (event) => {
    if (event.target.value.trimEnd().length > 6)
      dispatch({ type: "PSW_VALID" });
    else dispatch({ type: "PSW_INVALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (state.formIsValid) {
      myContext.onLogIn(state.email, state.password);
    } else if (!state.emailIsValid) {
      refEmail.current.focus();
    } else {
      refPassword.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          onChange={emailChangeHandler}
          ref={refEmail}
          labelName="E-Mail"
          labelFor="email"
          inputType="email"
          inputId="email"
          isEmailValid={state.emailIsValid}
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ""
          }`}
        />
        <Input
          onChange={passwordChangeHandler}
          ref={refPassword}
          labelName="Password"
          labelFor="password"
          inputType="password"
          inputId="password"
          isPasswordValid={state.passwordIsValid}
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ""
          }`}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
