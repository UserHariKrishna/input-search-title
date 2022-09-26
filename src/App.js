import React, { useState,useEffect } from "react";

function App() {
 
  const [names,setNames] = useState([
    "a",
    "b"
  ]);
  useEffect(()=>{
    fetch("https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words")
    .then((res)=>res).then((data)=>
    {
      //Implement the logic to get the data and setNames()
      console.log(data,"incoming data")
    });
  },[]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredName = names.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });
  const renderStatementResult = searchTerm && searchTerm.length > 0;
  return (
    <>
      <div className="srchField">
        <label for="statement">Name</label>
        <div className="valueField">
          <input
            type="text"
            name="fileName"
            id="statement"
            data-validate="true"
            placeholder="Type Name"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          {renderStatementResult ? (
            <ul className="lookup-results">
              {filteredName.map((value) => {
                let patt = new RegExp(searchTerm.toLowerCase, "g");
                let result = value.matchAll(patt);
                for (let res of result) {
                  console.log("hi");
                  console.log(res);
                }
                let string = value.substr(
                  0,
                  value.toLowerCase().indexOf(searchTerm.toLowerCase())
                );
                let endString = value.substr(
                  value.toLowerCase().indexOf(searchTerm.toLowerCase()) +
                    searchTerm.length
                );
                let highlightedText = value.substr(
                  value.toLowerCase().indexOf(searchTerm.toLowerCase()),
                  searchTerm.length
                );
                return (
                  <li key={value}>
                    {string}
                    <span style={{ "background-color": "#FFFF00" }}>
                      {highlightedText}
                    </span>
                    {endString}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
