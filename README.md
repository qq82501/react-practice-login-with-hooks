# Login with React Hooks Practicing

## Functionality<br/>

E-mail: must includes "@" and more than 1 character after "@"<br/>

password: must more than 6 characters<br/>

If Input values are not valid, when clicking Login button, invalid input will automatically focused by order from E-mail to password.

Whenever stopping typing in input for 0.3 sec, validator will invoke to check if input email & password is valid.

1. Context API and useContext  
   By Customizing Context Provider component, we can wrap <App> inside it to simplify the code in App.js.

   Also, Context API can be imagined as a external object of the project, all components wrapped by Provider component can connect to this object and get the necessary data without props transportation.

   useContext() is a more abstractive way to extract data from Context object. instead of using consumner component, useContext() is more declearative to code.

2. useEffect (Login.js)  
   useEffect makes a component to do side effects, which means actions are irrelative to UI presentation, such as fetching Data, Timer, DOM manipulation. And it's an alternative way of lifecycle method in function component.

3. useRef / forwardRef (Login.js / Input.js)  
   When you want to get information from an element, or manipulate DOM without triggering re-render, useRef comes to rescue. useRef is used on html components, while forwardRef is used on customized react components.

4. useImperativeHandle (Input.js)  
   MUST be used in an component created by forwardRef.
   With useImperativeHandle, subscriber component can not only get the information from html component in the react component, but also can use function inside of the react component (simply speaking: parent is able to execute child's function)

5. useReducer (Login.js)  
   Using useReducer when there is a state which value changes according to other state, or a state changes followed by plural states changing. useReducer is like a box to storage states inside it, and developer can define few situation to controll how state's value changes.
