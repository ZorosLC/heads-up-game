import { useState, useEffect, useRef } from "react";

const decks = {
  Easy: ["Apple", "Car", "Dog", "House", "Phone"],
  Medium: ["Elephant", "Laptop", "Mountain", "Airport", "Restaurant"],
  Hard: ["Philosophy", "Quantum Physics", "Artificial Intelligence", "Cryptocurrency", "Metaverse"]
};

export default function App() {
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isQuickPlay, setIsQuickPlay] = useState(false);

  const [screen, setScreen] = useState("home");
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [time, setTime] = useState(60);

  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState(null);

  const [showSettings, setShowSettings] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [roundTime, setRoundTime] = useState(60);

  const touchStartX = useRef(null);

  const correctAudio = useRef(new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg"));
  const passAudio = useRef(new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"));

  const playSound = (type) => {
    if (!soundOn) return;
    const audio = type === "correct" ? correctAudio.current : passAudio.current;
    audio.currentTime = 0;
    audio.play();
  };

  const vibrate = () => {
    if (vibrationOn && navigator.vibrate) navigator.vibrate(100);
  };

  useEffect(() => {
    if (screen === "game" && time > 0) {
      const t = setTimeout(() => setTime((t) => t - 1), 1000);
      return () => clearTimeout(t);
    }
    if (time === 0 && screen === "game") endRound();
  }, [time, screen]);

  const nextCard = () => {
    setCardIndex((prev) =>
      prev + 1 >= deck.length ? prev : prev + 1
    );
  };

  const trigger = (type) => {
    playSound(type);
    vibrate();
    setFeedback(type);

    if (type === "correct") {
      const player = isQuickPlay ? "You" : players[currentPlayer];
      setScores((prev) => ({
        ...prev,
        [player]: (prev[player] || 0) + 1
      }));
    }

    setTimeout(() => {
      setFeedback(null);
      nextCard();
    }, 400);
  };

  const handleTouchStart = (e) => {
    if (screen !== "game") return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (screen !== "game") return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) trigger("correct");
    else trigger("pass");
  };

  const endRound = () => {
    if (isQuickPlay) {
      setScreen("leaderboard");
      return;
    }

    if (currentPlayer < players.length - 1) {
      setCurrentPlayer((p) => p + 1);
      setScreen("deck");
    } else {
      setCurrentPlayer(0);
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
    setIsQuickPlay(false);
    setScreen("home");
  };

  const button = {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    background: "#2c3e50",
    color: "#fff",
    marginTop: "20px",
    fontSize: "16px",
    cursor: "pointer"
  };

  const toggle = (active) => ({
    padding: "10px 16px",
    borderRadius: "20px",
    border: "none",
    background: active ? "#00e676" : "#555",
    color: active ? "#000" : "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  });

  const pill = {
  padding: "10px 14px",
  borderRadius: "999px",
  border: "none",
  background: "#2c3e50",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "13px"
};

const smallPill = {
  padding: "6px 10px",
  borderRadius: "999px",
  border: "none",
  background: "#34495e",
  color: "#fff",
  cursor: "pointer",
  fontSize: "12px"
};


  const handleRamanClick = (e) => {
    const messages = [
      "Not possible",
      "Access denied",
      "Nice try",
      "This stays ON",
      "You cannot escape Raman",
      "Feature locked forever",
      "Why would you even try?",
      "System override failed",
      "Error: System incapable of stopping",
      "You wish",
      "I'm always TURNED ON"
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];
    alert(msg);

    const btn = e.currentTarget;
    btn.style.animation = "shake 0.3s";

    setTimeout(() => {
      btn.style.animation = "";
    }, 300);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        height: "100vh",
        background: "linear-gradient(135deg,#141e30,#243b55)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >

      {/* SETTINGS ICON */}
      <div
        onClick={() => setShowSettings(true)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontSize: 24,
          cursor: "pointer"
        }}
      >
        ⚙️
      </div>

      {/* FEEDBACK */}
      {feedback && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: feedback === "correct" ? "#00e676" : "#ff5252",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ transform: "rotate(90deg)", fontSize: "60px", fontWeight: "bold", color: "#000" }}>
            {feedback.toUpperCase()}
          </div>
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <>
          <h1 style={{ fontSize: "42px" }}>HEADS UP</h1>
          <p style={{ opacity: 0.7 }}>(but free 😉)</p>

          <button style={button} onClick={() => {
            setIsQuickPlay(true);
            setScreen("deck");
          }}>
            Quick Play
          </button>

          <button style={button} onClick={() => {
            setIsQuickPlay(false);
            setScreen("players");
          }}>
            Multiplayer
          </button>
        </>
      )}

      {/* PLAYERS */}
      {screen === "players" && (
        <>
          <h2>Add Players</h2>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button style={button} onClick={addPlayer}>Add</button>

          {players.map((p, i) => <div key={i}>{p}</div>)}

          {players.length > 0 && (
            <button style={button} onClick={() => setScreen("deck")}>
              Continue
            </button>
          )}
        </>
      )}

      {/* DECK */}
      {screen === "deck" && (
        <>
          <h2>
  {isQuickPlay
    ? "Your Turn"
    : `${players[currentPlayer]}'s Turn`}
</h2>

          {Object.keys(decks).map((deckName) => (
            <button
              key={deckName}
              style={button}
              onClick={() => {
                setDeck([...decks[deckName]].sort(() => Math.random() - 0.5));
                setCardIndex(0);
                setTime(roundTime);
                setScreen("game");
              }}
            >
              {deckName}
            </button>
          ))}
        </>
      )}

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "#1f2a38",
            padding: "24px 20px",
            borderRadius: "20px",
            width: "320px"
          }}>
            <h3>⚙️ Settings</h3>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}>
              <span>🔊 Sound</span>
              <button style={toggle(soundOn)} onClick={() => setSoundOn(!soundOn)}>
                {soundOn ? "ON" : "OFF"}
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}>
              <span>😈 Trouble Raman</span>
              <button style={toggle(true)} onClick={handleRamanClick}>ON</button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}>
              <span>📳 Vibration</span>
              <button style={toggle(vibrationOn)} onClick={() => setVibrationOn(!vibrationOn)}>
                {vibrationOn ? "ON" : "OFF"}
              </button>
            </div>

            {/* TIMER */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "18px"
  }}
>
  <span style={{ opacity: 0.8 }}>⏱ Timer</span>

  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <button
      style={smallPill}
      onClick={() => setRoundTime((t) => Math.max(30, t - 30))}
    >
      −
    </button>

    <div
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        background: "#d8e3de",
        color: "#000",
        fontWeight: "bold",
        minWidth: "50px",
        textAlign: "center"
      }}
    >
      {roundTime}s
    </div>

    <button
      style={smallPill}
      onClick={() => setRoundTime((t) => t + 30)}
    >
      +
    </button>
  </div>
</div>
            <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px",
    gap: "10px"
  }}
>
  <button
    style={{ ...pill, background: "#e74c3c" }}
    onClick={() => {
      setShowSettings(false);
      endRound();
    }}
  >
    ⏭ Skip
  </button>
             <button
    style={{ ...pill, background: "#95a5a6", color: "#000" }}
    onClick={() => {
      setShowSettings(false);
      resetGame();
    }}
  >
    🏠 Home
  </button>
            </div>

            <button
  style={{
    ...pill,
    width: "100%",
    marginTop: "20px",
    background: "#34495e"
  }}
  onClick={() => setShowSettings(false)}
>
  ✕ Close
</button>
          </div>
        </div>
      )}

      {/* GAME */}
      {screen === "game" && (
        <div style={{ transform: "rotate(90deg)", textAlign: "center" }}>
          <h2>{time}s</h2>
          <h1>{deck[cardIndex]}</h1>
        </div>
      )}

      {/* LEADERBOARD */}
      {screen === "leaderboard" && (
        <>
          <h2>Leaderboard</h2>
          {Object.entries(scores).map(([p, s]) => (
            <div key={p}>{p}: {s}</div>
          ))}
          <button style={button} onClick={() => setScreen("deck")}>Next Round</button>
          <button style={button} onClick={resetGame}>Home</button>
        </>
      )}
    </div>
  );
}