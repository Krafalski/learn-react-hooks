
import './App.css';

import { useState, useEffect, useRef } from 'react';

// ✌️ Rules of Hooks
// Hooks are JavaScript functions, but they impose two additional rules:
//
// Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
// Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks — your own custom Hooks. We’ll learn about them in a moment.)

// Hooks cannot be in loops, conditions
// or nested functions??
// only call hooks from react components


function Example() {


  // Declare a new state variable, which we'll call "count"
  // Declare a function that will let me update the value
  // The argument in useState is the default/initial value
  // only used in the first render
  const [count, setCount] = useState(0);
  // similiar to componentDidMount & componentDidUpdate
  useEffect(() => {
    document.title = `U ${count} times`
  })
  console.log(typeof setCount);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  let selectFruit = 0
  const [fruits, setFruit] = useState(['banana' , 'pinapple', 'lawyer']);
  // const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
  function handleFruits () {
    const length = fruits.length - 1
    selectFruit = (selectFruit > length)
    ? 0
    : selectFruit++
    console.log(fruits);
    setFruit(fruits[selectFruit])
  }

  return (
    <div>
      <h1 onClick={() => setAge('whatever')}>Meaning of life {age}</h1>
            <h1 onClick={handleFruits}>The { fruits[selectFruit] } is ready to eat</h1>
    </div>
  )
}

// Non working example no ChatAPI - just code example
// effect is short for side effects
// side effects are data fetching, subscriptions or manually changin the DOM from react components
// useEffect 'hey react, run this function after flushing changes to the DOM'
// default is to runs the effects after every render, including the first render
// making it akin to componentDidMount/componentDidUpdate
// can also specify cleanup by returning a function // stop subscription/timer etc
// useEffect is different every render
// Every time we render we schedule a different effect

function Timer () {
    const [seconds, setSeconds] = useState(0)
    // function handleChange () {
    //   // on start start timer
    //   incrementSeconds(seconds)
    //   return () => {
    //     // on removing from the DOM
    //     clearTimeout(incrementSeconds)
    //   }
    // }

    const didPageJustLoad = useRef(true)

    useEffect(() => {
      !didPageJustLoad.current && startTimer()
    })
    function incrementSeconds () {
      setSeconds(seconds + 1)
      console.log(seconds)
    }
    function startTimer () {
      setTimeout(incrementSeconds, 1000)
        didPageJustLoad.current = false
    }

    function stopTimer () {
      clearTimeout(incrementSeconds)
      didPageJustLoad.current = true
      console.log('dude stop');
    }
    function resetTimer () {
      setSeconds(0)
    }

    return (
      <div>
        <h1>Timer</h1>
        <h2>{seconds}</h2>
        <button onClick={startTimer}>start timer</button>
        <button onClick={stopTimer}>stop timer</button>
        <button onClick={resetTimer}>reset timer</button>
      </div>
    )
}
// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null);
//
//   function handleStatusChange(status) {
//     setIsOnline(status.isOnline);
//   }
//
//   useEffect(() => {
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });
//
//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }


function App() {
  return (
    <div className="App">
     <Example />
     <ExampleWithManyStates />
     <Timer />
    </div>
  );
}

export default App;
