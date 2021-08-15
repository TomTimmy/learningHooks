import "./styles.css";
import React, { useState } from "react";

const useInput = (initialValue, validator) => { // validator (검증기능) 추가. 사용자가 ㄱㅈㄹ 떠는거 방지.
  const [value, setValue] = useState(initialValue);
  
  const onChange = event => {
    const {
      target: {value}
    } = event;
    let willUpdate = true; 
    if (typeof validator === "function") {
      willUpdate = validator(value); // validator 에 따라 willUpdate 값 결정됨.
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
  
};


const App = () => {
  // validator 에 대입할 함수들을 만들어보자.
  const maxLen = x => x.length <= 10; // maxLen 은 인자값을 받는 함수이다. // 인자값 x 의 길이가 <= 10 이면, 함수값은 true.
  const prvntSign = x => !x.includes("@") // x 가 @ 를 포함하면, false !

  const name = useInput("Mr.", prvntSign)
  console.log(name)
  console.log({...name})

  return (
    <div className="App">  
      <input placeholder="Name" {...name}/>
    </div>
  );
}

export default App