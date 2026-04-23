import { useState, useEffect, useRef } from "react";

const decks = {

  "Anime": [
    "Naruto", "One Piece", "Attack on Titan", "Death Note", "Demon Slayer",
    "Jujutsu Kaisen", "Tokyo Ghoul", "My Hero Academia", "Dragon Ball Z", "Bleach",
    "Fullmetal Alchemist", "Hunter x Hunter", "Black Clover", "Chainsaw Man", "Vinland Saga",
    "Steins Gate", "Code Geass", "Sword Art Online", "Blue Lock", "Haikyuu",
    "Fairy Tail", "Mob Psycho 100", "Re Zero", "Overlord", "Parasyte",
    "Akame ga Kill", "Dr Stone", "Fire Force", "Noragami", "Gintama",
    "Kuroko no Basket", "Food Wars", "Spy x Family", "The Promised Neverland", "Berserk",
    "JoJo's Bizarre Adventure", "Cowboy Bebop", "Neon Genesis Evangelion", "Trigun", "Erased",
    "Horimiya", "Your Lie in April", "Clannad", "Angel Beats", "Another",
    "Tokyo Revengers", "Made in Abyss", "Zom 100", "Hell's Paradise", "Monster"
  ],

  "Car Brands": [
    "Toyota", "Honda", "BMW", "Mercedes Benz", "Audi",
    "Lamborghini", "Ferrari", "Porsche", "Bugatti", "McLaren",
    "Tesla", "Ford", "Chevrolet", "Volkswagen", "Hyundai",
    "Kia", "Nissan", "Mazda", "Subaru", "Jaguar",
    "Land Rover", "Rolls Royce", "Bentley", "Aston Martin", "Volvo",
    "Skoda", "Renault", "Peugeot", "Citroen", "Mini",
    "Dodge", "Jeep", "Chrysler", "GMC", "Cadillac",
    "Infiniti", "Acura", "Genesis", "Suzuki", "Mitsubishi",
    "Tata Motors", "Mahindra", "MG Motors", "BYD", "Rivian",
    "Lucid Motors", "Koenigsegg", "Pagani", "Alfa Romeo", "Fiat"
  ],

  "Food": [
    "Pizza", "Burger", "Pasta", "Biryani", "Fried Rice",
    "Butter Chicken", "Paneer Tikka", "Sushi", "Ramen", "Noodles",
    "Tacos", "Burrito", "Hot Dog", "Sandwich", "Fries",
    "Ice Cream", "Chocolate Cake", "Donut", "Cupcake", "Brownie",
    "Waffles", "Pancakes", "Omelette", "Scrambled Eggs", "Salad",
    "Soup", "Steak", "Grilled Chicken", "Fish Curry", "Dosa",
    "Idli", "Vada Pav", "Pav Bhaji", "Chole Bhature", "Rajma Chawal",
    "Dal Makhani", "Kebab", "Shawarma", "Falafel", "Hummus",
    "Nachos", "Popcorn", "Mac and Cheese", "Lasagna", "Risotto",
    "Croissant", "Bagel", "Samosa", "Spring Rolls", "Dim Sum"
  ],

  "Brands": [
    "Apple", "Samsung", "Nike", "Adidas", "Puma",
    "Gucci", "Louis Vuitton", "Zara", "H&M", "Uniqlo",
    "Coca Cola", "Pepsi", "Starbucks", "McDonalds", "KFC",
    "Dominos", "Pizza Hut", "Subway", "Burger King", "Amazon",
    "Flipkart", "Google", "Microsoft", "Meta", "Netflix",
    "YouTube", "Spotify", "Uber", "Ola", "Paytm",
    "PhonePe", "Visa", "Mastercard", "Rolex", "Casio",
    "Tissot", "Levis", "Calvin Klein", "Tommy Hilfiger", "Reebok",
    "Dell", "HP", "Lenovo", "Asus", "Acer",
    "Sony", "LG", "Panasonic", "Philips", "Bose"
  ],

  "Video Games": [
    "GTA V", "Call of Duty", "FIFA", "Fortnite", "Minecraft",
    "PUBG", "Valorant", "CSGO", "Apex Legends", "League of Legends",
    "Dota 2", "Elden Ring", "Dark Souls", "Sekiro", "Cyberpunk 2077",
    "Red Dead Redemption 2", "Assassin's Creed", "God of War", "The Last of Us", "Uncharted",
    "Resident Evil", "Silent Hill", "Far Cry", "Watch Dogs", "Hitman",
    "Need for Speed", "Forza Horizon", "Gran Turismo", "Rocket League", "Among Us",
    "Fall Guys", "Clash of Clans", "Clash Royale", "Candy Crush", "Temple Run",
    "Subway Surfers", "Mario Kart", "Super Mario", "Zelda", "Pokemon",
    "Animal Crossing", "Overwatch", "Battlefield", "Halo", "Destiny",
    "Warframe", "Diablo", "Starfield", "The Witcher 3", "Hades"
  ],

  "Bollywood Movies": [
  "3 Idiots", "Dangal", "PK", "Sholay", "Kabir Singh",
  "Zindagi Na Milegi Dobara", "Dil Chahta Hai", "War", "Pathaan", "Jawan",
  "Andhadhun", "Drishyam", "Gangs of Wasseypur", "Queen", "Barfi",
  "Bajrangi Bhaijaan", "Chennai Express", "Kick", "Don", "Don 2",
  "Kal Ho Naa Ho", "Kuch Kuch Hota Hai", "My Name is Khan", "Raees", "Fan",
  "Badhaai Ho", "Stree", "Bhool Bhulaiyaa", "Hera Pheri", "Phir Hera Pheri",
  "Golmaal", "Golmaal Returns", "Housefull", "Housefull 2", "Tiger Zinda Hai",
  "Ek Tha Tiger", "Rockstar", "Tamasha", "Yeh Jawaani Hai Deewani", "Student of the Year",
  "Kesari", "Uri", "Special 26", "Baby", "Airlift",
  "Raazi", "Talaash", "Agneepath", "Devdas", "Swades"
],

"Bollywood Songs": [
  "Tum Hi Ho", "Kesariya", "Chaiyya Chaiyya", "Kal Ho Naa Ho", "Tujh Mein Rab Dikhta Hai",
  "Kabira", "Agar Tum Saath Ho", "Galliyan", "Raabta", "Ghungroo",
  "Jai Ho", "Sheila Ki Jawani", "Munni Badnaam", "Badtameez Dil", "Subhanallah",
  "Nashe Si Chadh Gayi", "Bekhayali", "Apna Bana Le", "Ilahi", "Zaalima",
  "Dil Diyan Gallan", "Gerua", "Janam Janam", "Pee Loon", "Tum Se Hi",
  "Tera Hone Laga Hoon", "Tera Ban Jaunga", "Dilbar", "O Saki Saki", "Kar Gayi Chull",
  "Bom Diggy", "Morni Banke", "London Thumakda", "Nagada Sang Dhol", "Deewani Mastani",
  "Malhari", "Nagada", "Radha", "Hookah Bar", "Party All Night",
  "Kala Chashma", "High Rated Gabru", "Suit Suit", "Proper Patola", "Dil Chori",
  "Aankh Marey", "Coca Cola", "Naacho Naacho", "Jhoome Jo Pathaan", "Besharam Rang"
],

"Hollywood Movies": [
  "Inception", "Interstellar", "The Dark Knight", "Titanic", "Avatar",
  "Avengers Endgame", "Avengers Infinity War", "Iron Man", "Spider Man No Way Home", "Joker",
  "The Matrix", "Gladiator", "The Godfather", "Fight Club", "Forrest Gump",
  "The Shawshank Redemption", "Jurassic Park", "The Lion King", "Frozen", "Toy Story",
  "Finding Nemo", "Cars", "Up", "Coco", "Inside Out",
  "Doctor Strange", "Black Panther", "Thor Ragnarok", "Captain America Civil War", "Deadpool",
  "Logan", "The Wolverine", "Transformers", "Fast and Furious", "John Wick",
  "Mission Impossible", "Top Gun Maverick", "Mad Max Fury Road", "Dune", "Oppenheimer",
  "Tenet", "The Batman", "Aquaman", "Justice League", "Suicide Squad",
  "Harry Potter", "Fantastic Beasts", "Pirates of the Caribbean", "The Hobbit", "The Lord of the Rings"
],

"Hollywood Actors": [
  "Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Robert Downey Jr", "Chris Evans",
  "Chris Hemsworth", "Scarlett Johansson", "Jennifer Lawrence", "Angelina Jolie", "Will Smith",
  "Dwayne Johnson", "Keanu Reeves", "Johnny Depp", "Morgan Freeman", "Samuel L Jackson",
  "Hugh Jackman", "Ryan Reynolds", "Mark Wahlberg", "Christian Bale", "Joaquin Phoenix",
  "Matt Damon", "Ben Affleck", "Henry Cavill", "Gal Gadot", "Margot Robbie",
  "Emma Watson", "Daniel Radcliffe", "Rupert Grint", "Tom Holland", "Zendaya",
  "Timothee Chalamet", "Florence Pugh", "Anya Taylor Joy", "Chris Pratt", "Paul Rudd",
  "Jeremy Renner", "Sebastian Stan", "Anthony Mackie", "Idris Elba", "Michael B Jordan",
  "Jamie Foxx", "Eddie Murphy", "Jim Carrey", "Adam Sandler", "Jack Black",
  "Jason Statham", "Vin Diesel", "Jason Momoa", "Oscar Isaac", "Pedro Pascal"
],

"IPL": [
  "Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bangalore", "Kolkata Knight Riders", "Delhi Capitals",
  "Sunrisers Hyderabad", "Rajasthan Royals", "Punjab Kings", "Lucknow Super Giants", "Gujarat Titans",
  "MS Dhoni", "Rohit Sharma", "Virat Kohli", "AB de Villiers", "Chris Gayle",
  "Hardik Pandya", "Jasprit Bumrah", "KL Rahul", "Rishabh Pant", "Shubman Gill",
  "David Warner", "Kane Williamson", "Andre Russell", "Sunil Narine", "Yuzvendra Chahal",
  "Jos Buttler", "Sanju Samson", "Ben Stokes", "Ravindra Jadeja", "Dwayne Bravo",
  "Lasith Malinga", "Harbhajan Singh", "Suresh Raina", "Gautam Gambhir", "Zaheer Khan",
  "Brendon McCullum", "Faf du Plessis", "Glenn Maxwell", "Nicholas Pooran", "Marcus Stoinis",
  "Quinton de Kock", "Trent Boult", "Kagiso Rabada", "Pat Cummins", "Mitchell Starc",
  "Bhuvneshwar Kumar", "Ishan Kishan", "Deepak Chahar", "Prithvi Shaw", "Axar Patel"
],

"Football": [
  "Lionel Messi", "Cristiano Ronaldo", "Neymar Jr", "Kylian Mbappe", "Erling Haaland",
  "Kevin De Bruyne", "Luka Modric", "Karim Benzema", "Mohamed Salah", "Harry Kane",
  "Robert Lewandowski", "Sadio Mane", "Antoine Griezmann", "Vinicius Jr", "Jude Bellingham",
  "Pedri", "Gavi", "Sergio Ramos", "Gerard Pique", "Paul Pogba",
  "Zlatan Ibrahimovic", "Wayne Rooney", "David Beckham", "Ronaldinho", "Thierry Henry",
  "Xavi Hernandez", "Andres Iniesta", "Iker Casillas", "Manuel Neuer", "Alisson Becker",
  "Real Madrid", "Barcelona", "Manchester United", "Manchester City", "Liverpool",
  "Chelsea", "Arsenal", "Bayern Munich", "PSG", "Juventus",
  "Serie A", "La Liga", "Premier League", "Champions League", "Europa League",
  "FIFA World Cup", "UEFA Euro", "Copa America", "El Clasico", "Ballon d'Or"
],

"NBA": [
  "LeBron James", "Stephen Curry", "Kevin Durant", "Michael Jordan", "Kobe Bryant",
  "Shaquille O Neal", "Tim Duncan", "Kawhi Leonard", "James Harden", "Giannis Antetokounmpo",
  "Luka Doncic", "Nikola Jokic", "Joel Embiid", "Russell Westbrook", "Damian Lillard",
  "Chris Paul", "Anthony Davis", "Devin Booker", "Jayson Tatum", "Ja Morant",
  "Zion Williamson", "Kyrie Irving", "Paul George", "Jimmy Butler", "Draymond Green",
  "Klay Thompson", "Dwyane Wade", "Dirk Nowitzki", "Allen Iverson", "Tracy McGrady",
  "Scottie Pippen", "Dennis Rodman", "Magic Johnson", "Larry Bird", "Steve Nash",
  "Charles Barkley", "Yao Ming", "Vince Carter", "Ray Allen", "Reggie Miller",
  "Boston Celtics", "Los Angeles Lakers", "Golden State Warriors", "Chicago Bulls", "Miami Heat",
  "Brooklyn Nets", "Phoenix Suns", "Dallas Mavericks", "Milwaukee Bucks", "Denver Nuggets"
],

"Marvel": [
  "Iron Man", "Captain America", "Thor", "Hulk", "Black Widow",
  "Hawkeye", "Spider Man", "Doctor Strange", "Black Panther", "Scarlet Witch",
  "Vision", "Falcon", "Winter Soldier", "Ant Man", "Wasp",
  "Star Lord", "Gamora", "Drax", "Rocket", "Groot",
  "Loki", "Thanos", "Nick Fury", "Maria Hill", "Shang Chi",
  "Moon Knight", "She Hulk", "Ms Marvel", "Captain Marvel", "Deadpool",
  "Wolverine", "Professor X", "Magneto", "Cyclops", "Storm",
  "Jean Grey", "Beast", "Nightcrawler", "Quicksilver", "Cable",
  "Venom", "Carnage", "Green Goblin", "Doctor Octopus", "Sandman",
  "Mysterio", "Vulture", "Ultron", "Red Skull", "Killmonger"
],

"DC": [
  "Batman", "Superman", "Wonder Woman", "Flash", "Aquaman",
  "Cyborg", "Green Lantern", "Martian Manhunter", "Shazam", "Black Adam",
  "Joker", "Harley Quinn", "Lex Luthor", "Darkseid", "Deathstroke",
  "Bane", "Riddler", "Penguin", "Two Face", "Scarecrow",
  "Catwoman", "Poison Ivy", "Robin", "Nightwing", "Batgirl",
  "Supergirl", "Green Arrow", "Black Canary", "Zatanna", "Constantine",
  "Blue Beetle", "Hawkman", "Hawkgirl", "Doctor Fate", "Brainiac",
  "Reverse Flash", "Zoom", "Ra’s al Ghul", "Talia al Ghul", "Deadshot",
  "Suicide Squad", "Justice League", "Teen Titans", "Watchmen", "Sandman",
  "Lucifer", "Peacemaker", "King Shark", "Amanda Waller", "Booster Gold"
],
"TMKOC": [
  "Jethalal", "Daya", "Tapu", "Champaklal", "Bapuji",
  "Taarak Mehta", "Anjali Mehta", "Atmaram Bhide", "Madhavi Bhide", "Sonu",
  "Dr Hathi", "Komal Hathi", "Goli", "Roshan Singh Sodhi", "Mrs Roshan Sodhi",
  "Gogi", "Popatlal", "Abdul", "Bagha", "Nattu Kaka",
  "Bawri", "Magan", "Sundar", "Rita Reporter", "Inspector Chalu Pandey",
  "Gokuldham Premier League","Tapu Sena", "Mahila Mandal", "Gokuldham Society",
  "Gada Electronics", "Bhide Tuition Classes", "Sodhi Garage",
  "Abdul Shop"
],

"Doraemon": [
  "Doraemon", "Nobita", "Shizuka", "Gian", "Suneo",
  "Dorami", "Dekisugi", "Nobita Mom", "Nobita Dad", "Teacher",
  "Anywhere Door", "Time Machine", "Take-copter", "Bamboo Copter",
  "Small Light", "Big Light", "Air Cannon", "4D Pocket",
  "Translation Jelly", "Memory Bread",
  "Future World", "Time Travel", "Robot Cat", "Gadgets",
  "School", "Playground", "Nobita House", "Shizuka House",
  "Gian Shop", "Park",
  "Time Patrol", "Future Gadgets", "Robot Friends",
  "Space", "Underwater World", "Sky World",
  "Magic World", "Dream World",
  "Exam", "Homework", "Classroom",
  "Baseball Team", "Friend Group",
  "Secret Gadget", "Adventure Mission",
  "Robot Army", "Time Journey"
],

"Friends": [
  "Ross Geller", "Rachel Green", "Monica Geller", "Chandler Bing", "Joey Tribbiani", "Phoebe Buffay",
  "Gunther", "Janice", "Mike Hannigan", "Carol Willick", "Susan Bunch", "Ben Geller", "Emma Geller",

  "Central Perk", "Monica Apartment", "Joey and Chandler Apartment", "Ross Apartment",
  "Coffee House", "Museum", "Office", "Restaurant Kitchen",

  "Friends Group", "Roommates", "Neighbours",
  "Waitress", "Actor", "Chef", "Paleontologist",

  "Thanksgiving Dinner", "Apartment Switch", "Wedding Planning",
  "Holiday Party", "Dating Life",

  "Couch", "Coffee", "Guitar", "Smelly Cat",
  "Foosball Table", "Duck and Chick", "Wedding Dress",
  "Las Vegas Trip", "London Trip"
],

"The Office": [
  "Michael Scott", "Jim Halpert", "Pam Beesly", "Dwight Schrute", "Angela Martin",
  "Kevin Malone", "Oscar Martinez", "Stanley Hudson", "Phyllis Vance", "Andy Bernard",
  "Ryan Howard", "Kelly Kapoor", "Toby Flenderson", "Creed Bratton", "Meredith Palmer",
  "Jan Levinson", "David Wallace", "Holly Flax",

  "Dunder Mifflin", "Scranton Office", "Conference Room", "Reception Desk",
  "Warehouse", "Break Room", "Parking Lot",

  "Sales Team", "Accounting Team", "HR Department",
  "Manager Office", "Assistant to the Regional Manager",

  "Office Meeting", "Paper Company", "Sales Call",
  "Office Party", "Office Olympics", "Training Session",

  "Desk", "Stapler", "Beet Farm", "Printer", "Whiteboard",
  "Office Prank"
],

"The BBT": [
  "Sheldon Cooper", "Leonard Hofstadter", "Penny", "Howard Wolowitz", "Raj Koothrappali",
  "Amy Farrah Fowler", "Bernadette Rostenkowski", "Stuart Bloom",

  "Apartment 4A", "Apartment 4B", "Cheesecake Factory",
  "Comic Book Store", "University", "Laboratory", "Cafeteria",

  "Physics Department", "Friends Group", "Research Team",
  "Roommates", "Scientists", "Engineers",

  "Game Night", "Comic Convention", "Science Project",
  "Space Mission", "Nobel Prize", "Research Work",

  "Whiteboard", "Comic Books", "Video Games",
  "Chess", "Science Experiments", "Physics",
  "String Theory", "Quantum Mechanics"
],

"HIMYM": [
  "Ted Mosby", "Robin Scherbatsky", "Marshall Eriksen", "Lily Aldrin", "Barney Stinson",
  "Tracy McConnell", "Ranjit", "Victoria", "Stella", "James Stinson",

  "MacLaren's Pub", "Ted Apartment", "Bar", "Office",
  "Law Firm", "Kindergarten", "News Studio",

  "Friends Group", "Roommates", "Couples",
  "Architect", "Lawyer", "Teacher", "Journalist",

  "Game Night", "Wedding Planning", "Bachelor Party",
  "Road Trip", "Bar Nights",

  "Suit", "Playbook", "Yellow Umbrella",
  "Blue French Horn", "High Five",
  "Slap Bet", "Legendary", "Challenge"
],

"Sitcoms": [
  "Friends", "The Office", "Brooklyn Nine Nine", "How I Met Your Mother", "The Big Bang Theory",
  "Modern Family", "Two and a Half Men", "Parks and Recreation", "Community", "Arrested Development",
  "Seinfeld", "That 70s Show", "New Girl", "Schitts Creek", "The Good Place",
  "Young Sheldon", "Full House", "Fuller House", "Everybody Loves Raymond", "Fresh Prince of Bel Air",
  "Ted Lasso", "The IT Crowd", "Silicon Valley", "Superstore", "Blackish",
  "Kim's Convenience", "Curb Your Enthusiasm", "Scrubs", "Malcolm in the Middle", "Jane the Virgin",
  "Fleabag", "The Middle", "Happy Endings", "Rules of Engagement", "Mom",
  "30 Rock", "Will and Grace", "2 Broke Girls", "Baby Daddy", "Grounded for Life",
  "TMKOC", "Sarabhai vs Sarabhai", "Khichdi", "Office Office", "FIR",
  "Bhabiji Ghar Par Hai", "Yes Minister", "Mind Your Language", "Only Fools and Horses", "Extras"
],

"Sports": [
  "Cricket", "Football", "Basketball", "Tennis", "Badminton",
  "Hockey", "Baseball", "Rugby", "Golf", "Table Tennis",
  "Swimming", "Athletics", "Boxing", "Wrestling", "Kabaddi",
  "Formula 1", "MotoGP", "Cycling", "Skating", "Archery",
  "Shooting", "Weightlifting", "Gymnastics", "Volleyball", "Handball",
  "American Football", "Ice Hockey", "Softball", "Squash", "Snooker",
  "Chess", "Esports", "Marathon", "Triathlon", "Decathlon",
  "Long Jump", "High Jump", "Pole Vault", "Javelin Throw", "Discus Throw",
  "Shot Put", "Sprint", "Relay Race", "Freestyle Swimming", "Backstroke",
  "Butterfly Stroke", "Breaststroke", "Climbing", "Surfing", "Skiing"
],

"2000s Songs": [
  "In the End", "Numb", "Boulevard of Broken Dreams", "Hey Ya", "Yeah",
  "Umbrella", "Hips Don't Lie", "Complicated", "Toxic", "Oops I Did It Again",
  "Mr Brightside", "Seven Nation Army", "Fix You", "Clocks", "Viva La Vida",
  "Beautiful Day", "Where Is The Love", "Lose Yourself", "Stan", "Without Me",
  "Hot N Cold", "I Kissed a Girl", "Poker Face", "Bad Romance", "Just Dance",
  "Low", "Crank That", "Temperature", "Candy Shop", "Gold Digger",
  "Drop It Like It's Hot", "Apologize", "Bleeding Love", "Irreplaceable", "Crazy in Love",
  "No One", "Because of You", "Since U Been Gone", "Sk8er Boi", "All the Small Things",
  "Welcome to the Black Parade", "Sugar We're Going Down", "Take Me Out", "Use Somebody", "Sex on Fire",
  "Hey There Delilah", "You're Beautiful", "Big Girls Don't Cry", "With You", "So What"
],

"2010s Songs": [
  "Shape of You", "Blinding Lights", "Uptown Funk", "Despacito", "Closer",
  "Someone Like You", "Rolling in the Deep", "Love Story", "Blank Space", "Shake It Off",
  "Sorry", "Baby", "Peaches", "Stay", "Sunflower",
  "Counting Stars", "Firework", "Roar", "Dark Horse", "Senorita",
  "Havana", "Bad Guy", "Lovely", "Believer", "Radioactive",
  "Demons", "Thunder", "Stressed Out", "Heathens", "We Found Love",
  "Diamonds", "Take a Bow", "Halo", "Grenade", "Just the Way You Are",
  "Locked Out of Heaven", "24K Magic", "Old Town Road", "God’s Plan", "Hotline Bling",
  "One Dance", "Work", "Lean On", "Cheap Thrills", "Titanium",
  "Let Her Go", "Rude", "Wake Me Up", "Counting Stars", "Pompeii"
],
};

const deckMeta = {
  "Anime": { icon: "🍥", color: "#e84393" },
  "Car Brands": { icon: "🚗", color: "#0984e3" },
  "Food": { icon: "🍔", color: "#e17055" },
  "Brands": { icon: "🏷️", color: "#6c5ce7" },
  "Video Games": { icon: "🎮", color: "#00b894" },

  "Bollywood Movies": { icon: "🎬", color: "#d63031" },
  "Bollywood Songs": { icon: "🎵", color: "#8e44ad" },
  "Hollywood Movies": { icon: "🎥", color: "#0984e3" },
  "Hollywood Actors": { icon: "⭐", color: "#f1c40f" },

  "IPL": { icon: "🏏", color: "#e67e22" },
  "Football": { icon: "⚽", color: "#27ae60" },
  "NBA": { icon: "🏀", color: "#d35400" },

  "Marvel": { icon: "🕷️", color: "#c0392b" },
  "DC": { icon: "🦇", color: "#2c3e50" },

  "TMKOC": { icon: "🏢", color: "#16a085" },
  "Doraemon": { icon: "🤖", color: "#3498db" },

  "Friends": { icon: "☕", color: "#e67e22" },
  "The Office": { icon: "📎", color: "#7f8c8d" },
  "The BBT": { icon: "🧠", color: "#9b59b6" },
  "HIMYM": { icon: "🍺", color: "#2980b9" },

  "Sitcoms": { icon: "😂", color: "#1abc9c" },
  "Sports": { icon: "🏅", color: "#27ae60" },

  "2000s Songs": { icon: "💿", color: "#8e44ad" },
  "2010s Songs": { icon: "🎧", color: "#2980b9" }
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

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        marginTop: "20px",
        width: "90%",
        maxWidth: "400px"
      }}
    >
      {Object.keys(decks).map((deckName) => {
  const meta = deckMeta[deckName] || { icon: "🎲", color: "#7f8c8d" };

  return (
    <div
      key={deckName}
      onClick={() => {
        setDeck([...decks[deckName]].sort(() => Math.random() - 0.5));
        setCardIndex(0);
        setTime(roundTime);
        setScreen("game");
      }}
      style={{
        padding: "14px",
        borderRadius: "14px",
        background: `linear-gradient(135deg, ${meta.color}, #111)`,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
        transition: "all 0.2s ease"
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ fontSize: "20px", marginBottom: "6px" }}>
        {meta.icon}
      </div>

      <div style={{ fontSize: "13px" }}>
        {deckName}
      </div>
    </div>
  );
})}
    </div>
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