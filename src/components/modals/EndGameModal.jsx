import React, {useEffect, useState} from "react"

const endGameModal = ({win, word, setnewWord, setgameEnding, gameStats}) => {
  const [wordInfo, setWordInfo] = useState(null)

  useEffect(() => {
    // Function to fetch word information from the dictionary API
    const fetchWordInfo = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        )
        const data = await response.json()
        setWordInfo(data[0])
      } catch (error) {
        console.error("Error fetching word information", error)
      }
    }

    fetchWordInfo()
  }, [word])
  // console.log(gameStats);
  return (
    <dialog className="endGameModal" open>
      <h1 className="hhhh">
        Game has ended,<br></br>You {win ? "won" : "lost"}!
      </h1>
      <p className="word-sentence">
        The correct word was <span className="word">{word}</span>
      </p>
      {wordInfo && (
        <div className="text-hh">
          <p className="info-header">Information about the word:</p>
          <ul className="info-list">
            {wordInfo.meanings.map((meaning, index) => (
              <li key={index}>
                <p className="part-of-speech">
                  Part of Speech: {meaning.partOfSpeech}
                </p>
                <p className="definition">
                  Definition: {meaning.definitions[0].definition}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="game-stats">
        <p>Your game stats</p>
        <ul>
          <li>Played: {gameStats.played}</li>
          <li>
            Winrate: {gameStats.winrate} % ({gameStats.wins} W:{" "}
            {gameStats.loses}
            L)
          </li>
          <li>Current Streak: {gameStats.streak}</li>
        </ul>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          setgameEnding({end: false, win: false})
          setnewWord()
        }}
      >
        <button className="play-again-button" type="submit">
          Play Again
        </button>
      </form>
    </dialog>
  )
}

export default endGameModal
