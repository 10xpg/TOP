import { useEffect, useState } from "react";

const Card = ({ text, imageUrl, onClick }) => {
  return (
    <li>
      <button onClick={onClick}>
        <img src={imageUrl} alt="" />
        <div>{text}</div>
      </button>
    </li>
  );
};

const Cards = ({ setScore, setHighScore }) => {
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=Pv6Y0a7vBuKKqrka7LfMRzdVY0QVjdsD&limit=12&offset=0",
      { mode: "cors" }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
  console.log("logging data:", data);

  const handleClick = () => {
    setSelectedCard(!selectedCard);
    setScore((prevScore) => prevScore + 1);
  };
  return (
    <ul>
      {data.map((obj) => (
        <Card
          key={obj.id}
          text={obj.title}
          imageUrl={obj.images.original.url}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
};

//TODO: score board
//TODO: highscore board
const Playground = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  // * interface for game play
  // // TODO: render cards
  // TODO: make cards clickable (update score on click)
  // TODO: reshuffle cards onMount and reRenders

  return (
    <main>
      <h2>Playground</h2>{" "}
      <section>
        <div>Highest Score: {highestScore}</div>
        <div>Current Score: {currentScore}</div>
      </section>
      <Cards setScore={setCurrentScore} setHighScore={setHighestScore} />
    </main>
  );
};

export { Playground };
