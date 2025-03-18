import { useEffect, useState } from "react";

const Card = ({ text, imageUrl, onClick }) => {
  return (
    <li>
      <span>
        <img
          src={imageUrl}
          alt={text}
          onClick={onClick}
          width="300px"
          height="auto"
        />
        <div>{text}</div>
      </span>
    </li>
  );
};

const Cards = ({ setScore, setHighScore, currentScore }) => {
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");

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
  //   console.log("logging data:", data);

  return (
    <ul>
      {shuffle(data).map((obj) => (
        <Card
          key={obj.id}
          text={obj.title}
          imageUrl={obj.images.original.url}
          onClick={(e) => {
            if (obj.title !== selectedCard) {
              setSelectedCard(e.target.alt);
              // console.log(e.target.alt);
              setScore((prevScore) => prevScore + 1);
            }
            if (obj.title === selectedCard) {
              setHighScore(currentScore);
              setScore(0);
            }
          }}
        />
      ))}
    </ul>
  );
};

const Playground = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  // // TODO: render cards
  // // TODO: make cards clickable (update score on click)
  // TODO: reshuffle cards onMount and reRenders

  return (
    <main>
      <h2>Playground</h2>{" "}
      <section>
        <div>Highest Score: {highestScore}</div>
        <div>Current Score: {currentScore}</div>
      </section>
      <Cards
        currentScore={currentScore}
        setScore={setCurrentScore}
        setHighScore={setHighestScore}
      />
    </main>
  );
};

export { Playground };

//utility function
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
