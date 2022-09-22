import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activeInput = function () {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activeInput,
      inputValue: inputRef.current.value,
    };
  });

  return (
    <div className={props.className}>
      <label htmlFor={props.labelFor}>{props.labelName}</label>
      <input
        type={props.inputType}
        id={props.inputId}
        onChange={props.onChange}
        ref={inputRef}
      />
    </div>
  );
});

export default Input;
