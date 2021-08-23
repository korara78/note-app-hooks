import React from 'react';
import './style.css';
import {useState, useEffect } from 'react'; //2 import the useState fuction from react
import {produce} from 'immer'; //3 import produce from immer library


//Based on Akash Joshi's article on https://flexiple.com/react/react-hooks-learn-by-building-a-notes-app/

/*
-Step 1: create the functional component
-Step 2: get useState Hook set up
-Step 3: implement useState Hook 
-Step 4: implement the useEffect Hook
*/

/*
-1 var Notes functions to accept an array as props input and returns the notes.
-1 Iterates over the props array (data) using a map and returns the required divs.
*/
const Notes = (props) => props.data.map(note => <div>{note.text}</div>);

/*
-1 var initialData added to default function 
-1 var initialData is an array containing the initial text.
-2 useState is a Hook that lets you add React state to function components. 
-2 var data will access useState Hook with var initialData as initial argument.
-2 var setDate will update var data, thus updating current useState argument. 
-3 add handleClick function to check if text input is empty.
-3 var text based on value found by querySelector in the div-id '#noteinput'
-3 var nextState uses the produce function that takes 2 arguments... 
    (baseState, draftState which drafts changes to the nextState)
-3 import produce from the immer library.
-3 This new state is set via setData(nextState). We have also cleared the text input field. 
-3 add 'noteinput' to input element id
-4 useEffect tells React that your component needs to do something after each render.
-4 useEffect hook takes a function as input and a variable it is linked to upon each render. 
-4 useEffeck ensures typeOf is not 'undefined', 
  -proceeds to get data from localStorage,
  -and then checks whether it actually exists,
  -useEffect linkedVar is set to a static value 0 to run only once.
-4 add if statement in handleClick to push newly created notes to the localStorage too. 
*/

/* Returning:
-1 return Notes component to display the var data values
-2 return elements input field and a button to app to add more notes.
-2 when returning mult components at once they are wrapped with <> </>. 
-3 call the handleClick function inside the button element via the onClick API.
-4 useEffect either returns setData by parsing through JSON file.
-4 useEffect returns setDate as an empty array waiting for new input.
*/

export default function App() {

  const initialData = [{ text: 'Loading Data ...' }];
  const [data, setData] = useState(initialData);

  const handleClick = () => {
    const text = document.querySelector('#noteinput').value.trim();
    if (text) {
      const nextState = produce(data, draftState => {
        draftState.push({ text });
      });
      document.querySelector('#noteinput').value = '';

      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }

      setData(nextState);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');
      if (getData !== '' && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, []);

  return (
  
<body>
    <>
      <h3>The Note Reminder App</h3>
      <h5>Step 1: Click input text field and select a reminder. Step 2: Click Add note to set reminder.</h5>   

      <form class="w3-container">
      <input class="w3-input" id="noteinput" style={{ width: '70%' }} type="text" placeholder="Enter new note and Press ENTER to be stored in memory. Press Add Note to display reminder. " />
      </form>   
      <button onClick={() => handleClick()}>Add note</button>
      <Notes data={data} />
       </>
 </body>
  );
};




