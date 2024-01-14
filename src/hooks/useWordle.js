import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array // set the length of guess array to be of length 6
  const [history, setHistory] = useState(['quade', 'hello']) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
    console.log(solution)
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((letter) => {
        return {key:letter, color:'grey'}
    })
    
    console.log('formatting the guess: ', currentGuess)
    
    // find any green letters
    formattedGuess.forEach((letter, i) => {
        if (solution[i] === letter.key){
            formattedGuess[i].color = 'green'
            solutionArray[i] = null
        }
    })

    // Example correct word: piped and guessed word:plans
    // Now after green letters code snippet is run
    // 

    // find any yellow letters
    formattedGuess.forEach((letter, i) => {
        if (solutionArray.includes(letter.key) && letter.color !== 'green'){
            formattedGuess[i].color = 'yellow'
            solutionArray[solutionArray.indexOf(letter.key)] = null
        }
    })
    return formattedGuess
    }


  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess // initially turn is 0 and turn keeps increasing until 6
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn) => {
            return prevTurn + 1 
        })
        setCurrentGuess('') // leave it empty for next round
    }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({key}) => {
    console.log(key)

    if (key === 'Enter'){
        //only add guess if turn is less than 5
        if (turn > 5){
            console.log('All tries are exhausted')
            return
        }
        // do not allow duplicate words
        if (history.includes(currentGuess)){
            console.log('you already tried that word')
            return
        }
        // check word is 5 chars long
        if (currentGuess.length !==5){
            console.log('Word must be of length 5')
            return
        }
        const formattedGuess = formatGuess()
        addNewGuess(formattedGuess)
        console.log(formattedGuess)
    }

    if (key === 'Backspace'){
        setCurrentGuess((prev) => {
            return prev.slice(0, -1)
        })
        return 
       
    }
    if (/^[A-Za-z]$/.test(key)){
        if (currentGuess.length < 5 ){
            setCurrentGuess((prev) => {
                return prev + key
            })
        }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle