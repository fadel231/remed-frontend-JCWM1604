import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.submit ? "submit" : "button"}
      className={props.className}
      style={{
        backgroundColor: 'rgb(50, 50, 50)',
        color: 'white',
        borderRadius: '5px',
        height: '60px',
        fontWeight: '500',
        border: 'none',
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;