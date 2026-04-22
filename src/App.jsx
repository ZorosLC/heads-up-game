import { useState, useEffect, useRef } from "react";

/* =========================
   DATA
========================= */

const decks = {
  "Anime Characters": [
    "Naruto","Sasuke Uchiha","Luffy","Zoro","Goku","Vegeta","Ichigo Kurosaki",
    "Eren Yeager","Levi Ackerman","Mikasa Ackerman","Light Yagami","L",
    "Gojo Satoru","Tanjiro Kamado","Nezuko Kamado","Killua","Gon",
    "Hisoka","Itachi Uchiha","Madara Uchiha","Kakashi Hatake","Jiraiya",
    "Orochimaru","Deku","Bakugo","All Might","Todoroki","Asta","Yuno",
    "Edward Elric","Alphonse Elric","Spike Spiegel","Vash","Kaneki",
    "Mob","Reigen","Saitama","Genos","Meliodas","Escanor","Ban",
    "Rimuru","Subaru","Rem","Zero Two","Anos","Denji","Power","Makima"
  ],

  "Football": [
    "Lionel Messi","Cristiano Ronaldo","Neymar","Kylian Mbappe","Erling Haaland",
    "Kevin De Bruyne","Mohamed Salah","Robert Lewandowski","Karim Benzema",
    "Luka Modric","Zinedine Zidane","Ronaldinho","David Beckham","Andres Iniesta",
    "Xavi","Sergio Ramos","Virgil van Dijk","Harry Kane","Son Heung-min",
    "Paul Pogba","Wayne Rooney","Thierry Henry","Didier Drogba",
    "Frank Lampard","Steven Gerrard","Iker Casillas","Manuel Neuer",
    "Gianluigi Buffon","Jude Bellingham","Vinicius Junior","Rodrygo",
    "Pedri","Gavi","Phil Foden","Bukayo Saka","Jack Grealish",
    "Declan Rice","Bruno Fernandes","Casemiro","Toni Kroos",
    "Gerard Pique","Carles Puyol","Rio Ferdinand","Paolo Maldini",
    "Alessandro Del Piero","Francesco Totti","Kaka","Rivaldo"
  ]
};

/* =========================
   APP
========================= */

export default function App() {
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const [screen, setScreen] = useState("players");
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [time, setTime] = useState(60);

  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState(null);

  const touchStartX = useRef(null);

  const correctAudio = useRef(null);
  const passAudio = useRef(null);

  // ✅ PRELOAD + WARMUP (NO DELAY)
  useEffect(() => {
    correctAudio.current = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");
    passAudio.current = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

    correctAudio.current.volume = 0.4;
    passAudio.current.volume = 0.4;

    const unlock = () => {
      correctAudio.current.play().then(() => {
        correctAudio.current.pause();
        correctAudio.current.currentTime = 0;
      });
      passAudio.current.play().then(() => {
        passAudio.current.pause();
        passAudio.current.currentTime = 0;
      });
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("touchstart", unlock);
  }, []);

  // ⚡ INSTANT SOUND
  const playSound = (type) => {
    const audio = type === "correct" ? correctAudio.current : passAudio.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  };

  // TIMER
  useEffect(() => {
    if (screen === "game" && time > 0) {
      const t = setTimeout(() => setTime((t) => t - 1), 1000);
      return () => clearTimeout(t);
    }
    if (time === 0 && screen === "game") endRound();
  }, [time, screen]);

  const triggerFeedback = (type) => {
    playSound(type);
    setFeedback(type);

    setTimeout(() => {
      setFeedback(null);
      nextCard();
    }, 600);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      handleCorrect();
      triggerFeedback("correct");
    } else {
      triggerFeedback("pass");
    }

    touchStartX.current = null;
  };

  const startGame = (name) => {
    setDeck([...decks[name]].sort(() => Math.random() - 0.5));
    setCardIndex(0);
    setTime(60);
    setScreen("game");
  };

  const handleCorrect = () => {
    const player = players[currentPlayer];
    setScores((prev) => ({
      ...prev,
      [player]: (prev[player] || 0) + 1
    }));
  };

  const nextCard = () => {
    setCardIndex((prev) =>
      prev + 1 >= deck.length ? prev : prev + 1
    );
  };

  const endRound = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer((p) => p + 1);
      setScreen("deck");
      setTime(60);
    } else {
      setScreen("leaderboard");
    }
  };

  const addPlayer = () => {
    if (!input) return;
    setPlayers([...players, input]);
    setInput("");
  };

  const resetGame = () => {
    setPlayers([]);
    setScores({});
    setCurrentPlayer(0);
    setScreen("players");
  };

  const button = {
    padding: "12px 20px",
    margin: "10px",
    borderRadius: "12px",
    border: "none",
    background: "#1f1f1f",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer"
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif"
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {screen === "players" && (
        <>
          <h1>Heads Up</h1>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ padding: 10, borderRadius: 8 }}
          />
          <button style={button} onClick={addPlayer}>Add Player</button>
          {players.length > 0 && (
            <button style={button} onClick={() => setScreen("deck")}>
              Start Game
            </button>
          )}
        </>
      )}

      {screen === "deck" && (
        <>
          <h2>{players[currentPlayer]}'s Turn</h2>
          {Object.keys(decks).map((d) => (
            <button key={d} style={button} onClick={() => startGame(d)}>
              {d}
            </button>
          ))}
        </>
      )}

      {screen === "game" && deck.length > 0 && (
        <div style={{ transform: "rotate(90deg)", textAlign: "center" }}>
          {feedback ? (
            <h1 style={{ color: feedback === "correct" ? "#00e676" : "#ff5252" }}>
              {feedback.toUpperCase()}
            </h1>
          ) : (
            <>
              <h2>{players[currentPlayer]}</h2>
              <h3>{time}s</h3>
              <div
                style={{
                  fontSize: "clamp(30px, 6vw, 60px)",
                  padding: "30px",
                  background: "#1e1e1e",
                  borderRadius: "20px",
                  marginTop: 20
                }}
              >
                {deck[cardIndex]}
              </div>
            </>
          )}
        </div>
      )}

      {screen === "leaderboard" && (
        <>
          <h2>Leaderboard</h2>
          {Object.entries(scores).map(([p, s]) => (
            <div key={p}>{p}: {s}</div>
          ))}
          <button style={button} onClick={() => setScreen("deck")}>Play Again</button>
          <button style={button} onClick={resetGame}>New Game</button>
        </>
      )}
    </div>
  );
}