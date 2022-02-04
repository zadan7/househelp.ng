import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{ overflow: 'scroll', border: '1px solid green', height: '800px' ,width:"97%",margin:"10px auto"}}>
      {props.children}
    </div>
  );
};

export default Scroll;