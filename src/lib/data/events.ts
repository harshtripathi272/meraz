// Event data for Meraz 6.0
export interface Event {
  id: string;
  name: string;
  category: "Culturals" | "Sci-Tech" | "Informals" | "E-Cell" | "FinTech" | "Varchasva";
  shortDescription: string;
  fullDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  registerUrl: string;
  image: string;
  tags: string[];
  prizePool?: string;
}

export const events: Event[] = [
  {
    id: "neon-nritya",
    name: "Neon Nritya",
    category: "Culturals",
    shortDescription: "Classical dance competition with a neon tribal twist",
    fullDescription: "Experience the mesmerizing fusion of classical Indian dance forms with contemporary neon aesthetics. Participants showcase their talent under ultraviolet lights, creating a visual spectacle that honors tradition while embracing the future. Solo and group performances welcome across Bharatanatyam, Kathak, Odissi, and fusion categories.",
    date: "2026-02-15",
    startTime: "18:00",
    endTime: "21:00",
    venue: "Main Stage Amphitheatre",
    contact: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "culturals@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/neon-nritya",
    image: "/assets/events/neon-nritya.jpg",
    tags: ["Dance", "Classical", "Solo", "Group"],
    prizePool: "₹50,000"
  },
  {
    id: "code-pulse",
    name: "Code Pulse",
    category: "Sci-Tech",
    shortDescription: "48-hour hackathon to build the future",
    fullDescription: "Push your limits in this intense 48-hour coding marathon. Teams of 2-4 members tackle real-world problems using cutting-edge technologies. From AI/ML to blockchain, web3 to IoT - build, innovate, and compete for glory. Mentors from top tech companies guide you through the night. Food, caffeine, and neon vibes included!",
    date: "2026-02-15",
    startTime: "09:00",
    endTime: "09:00",
    venue: "Computer Science Building",
    contact: {
      name: "Arjun Verma",
      phone: "+91 87654 32109",
      email: "scitech@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/code-pulse",
    image: "/assets/events/code-pulse.jpg",
    tags: ["Hackathon", "Coding", "Team", "48hr"],
    prizePool: "₹1,00,000"
  },
  {
    id: "tribal-beats",
    name: "Tribal Beats",
    category: "Culturals",
    shortDescription: "Battle of the Bands with tribal fusion",
    fullDescription: "Where rock meets roots! Bands compete showcasing original compositions that blend tribal rhythms with modern genres. From electronic tribal fusion to acoustic folk-rock, let your music echo the ancient pulse of the earth while resonating with the neon energy of tomorrow.",
    date: "2026-02-16",
    startTime: "19:00",
    endTime: "23:00",
    venue: "Open Air Theatre",
    contact: {
      name: "Rahul Deshmukh",
      phone: "+91 76543 21098",
      email: "music@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/tribal-beats",
    image: "/assets/events/tribal-beats.jpg",
    tags: ["Music", "Band", "Live Performance"],
    prizePool: "₹75,000"
  },
  {
    id: "robo-wars",
    name: "Robo Wars",
    category: "Sci-Tech",
    shortDescription: "Build. Battle. Dominate.",
    fullDescription: "The arena awaits! Design and build combat robots to battle in the most intense robotics competition in Central India. Weight categories from 8kg to 30kg. Flame throwers, spinners, flippers - bring your best. Last bot standing wins. Safety gear and pit crew required.",
    date: "2026-02-16",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Sports Complex Arena",
    contact: {
      name: "Karthik Iyer",
      phone: "+91 65432 10987",
      email: "robotics@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/robo-wars",
    image: "/assets/events/robo-wars.jpg",
    tags: ["Robotics", "Combat", "Engineering"],
    prizePool: "₹80,000"
  },
  {
    id: "startup-pitch",
    name: "Startup Ignite",
    category: "E-Cell",
    shortDescription: "Pitch your million-dollar idea",
    fullDescription: "Got the next big idea? Present your startup concept to a panel of VCs and industry leaders. 5 minutes to pitch, 5 minutes Q&A. Top ideas get incubation support, mentorship, and seed funding opportunities. Open to all domains - tech, social enterprise, consumer products, and more.",
    date: "2026-02-15",
    startTime: "14:00",
    endTime: "18:00",
    venue: "Entrepreneurship Hall",
    contact: {
      name: "Ananya Reddy",
      phone: "+91 54321 09876",
      email: "ecell@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/startup-ignite",
    image: "/assets/events/startup-pitch.jpg",
    tags: ["Startup", "Pitch", "Entrepreneurship"],
    prizePool: "₹2,00,000 + Incubation"
  },
  {
    id: "crypto-quest",
    name: "Crypto Quest",
    category: "FinTech",
    shortDescription: "Navigate the blockchain maze",
    fullDescription: "Test your knowledge of cryptocurrencies, DeFi, and blockchain technology. From trading simulations to smart contract puzzles, navigate through multiple rounds of challenges. Learn about the future of finance while competing for crypto prizes.",
    date: "2026-02-16",
    startTime: "11:00",
    endTime: "16:00",
    venue: "Finance Lab",
    contact: {
      name: "Vivek Gupta",
      phone: "+91 43210 98765",
      email: "fintech@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/crypto-quest",
    image: "/assets/events/crypto-quest.jpg",
    tags: ["Crypto", "Blockchain", "Trading"],
    prizePool: "0.1 ETH"
  },
  {
    id: "stand-up-showdown",
    name: "Stand-Up Showdown",
    category: "Informals",
    shortDescription: "Make the crowd roar with laughter",
    fullDescription: "Think you're funny? Prove it! Open mic stand-up comedy competition where the audience decides the winner. 7 minutes on stage, no holds barred (keep it campus-appropriate though). Previous performers have gone on to fame on YouTube and comedy circuits.",
    date: "2026-02-17",
    startTime: "20:00",
    endTime: "23:00",
    venue: "Auditorium",
    contact: {
      name: "Sneha Patil",
      phone: "+91 32109 87654",
      email: "informals@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/stand-up-showdown",
    image: "/assets/events/standup.jpg",
    tags: ["Comedy", "Stand-up", "Entertainment"],
    prizePool: "₹30,000"
  },
  {
    id: "esports-arena",
    name: "Esports Arena",
    category: "Varchasva",
    shortDescription: "Valorant & BGMI Championships",
    fullDescription: "The ultimate gaming battleground! Compete in Valorant 5v5 and BGMI squad tournaments. LAN setup, professional casting, and live audience. Show your skills on the biggest esports stage in the region. Separate brackets for both games.",
    date: "2026-02-15",
    startTime: "10:00",
    endTime: "22:00",
    venue: "Gaming Zone - Ground Floor",
    contact: {
      name: "Rohit Kumar",
      phone: "+91 21098 76543",
      email: "esports@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/esports-arena",
    image: "/assets/events/esports.jpg",
    tags: ["Gaming", "Valorant", "BGMI", "Esports"],
    prizePool: "₹1,50,000"
  },
  {
    id: "fashion-fusion",
    name: "Fashion Fusion",
    category: "Culturals",
    shortDescription: "Walk the neon runway",
    fullDescription: "The most glamorous event of Meraz! Teams of 8-15 showcases themed fashion walks under neon lights. From traditional Indian wear to avant-garde designs, express your creativity on the runway. Professional choreography, makeup, and a celebrity judge panel await.",
    date: "2026-02-17",
    startTime: "19:00",
    endTime: "22:00",
    venue: "Central Lawn Stage",
    contact: {
      name: "Divya Menon",
      phone: "+91 10987 65432",
      email: "fashion@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/fashion-fusion",
    image: "/assets/events/fashion.jpg",
    tags: ["Fashion", "Runway", "Team"],
    prizePool: "₹60,000"
  },
  {
    id: "quiz-masters",
    name: "Quiz Masters",
    category: "Informals",
    shortDescription: "The ultimate knowledge showdown",
    fullDescription: "Test your general knowledge, pop culture awareness, and quick thinking in this multi-round quiz competition. From written prelims to buzzer-based finals, only the sharpest minds survive. Categories include science, entertainment, sports, current affairs, and a special 'Meraz Specials' round.",
    date: "2026-02-16",
    startTime: "14:00",
    endTime: "17:00",
    venue: "Seminar Hall 1",
    contact: {
      name: "Aditya Joshi",
      phone: "+91 09876 54321",
      email: "quiz@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/quiz-masters",
    image: "/assets/events/quiz.jpg",
    tags: ["Quiz", "Knowledge", "Team"],
    prizePool: "₹25,000"
  },
  {
    id: "drone-racing",
    name: "Drone Racing League",
    category: "Sci-Tech",
    shortDescription: "High-speed aerial combat",
    fullDescription: "Navigate your drone through neon-lit obstacle courses at breakneck speeds. FPV racing at its finest with professional timing systems and live streaming. Bring your own drone or rent one from us. Categories for beginners and pros.",
    date: "2026-02-17",
    startTime: "09:00",
    endTime: "14:00",
    venue: "Football Ground",
    contact: {
      name: "Sanjay Mehta",
      phone: "+91 98765 12340",
      email: "drones@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/drone-racing",
    image: "/assets/events/drone.jpg",
    tags: ["Drone", "Racing", "FPV"],
    prizePool: "₹40,000"
  },
  {
    id: "stock-market-sim",
    name: "Bull & Bear",
    category: "FinTech",
    shortDescription: "Virtual stock trading championship",
    fullDescription: "Start with virtual capital and trade your way to the top! Real-time market simulation with live data feeds. Intraday and swing trading strategies welcome. Learn from market mentors and compete against the best traders from colleges across India.",
    date: "2026-02-15",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Finance Lab",
    contact: {
      name: "Meera Shah",
      phone: "+91 87654 23190",
      email: "trading@meraz.iitbhilai.ac.in"
    },
    registerUrl: "/register/bull-bear",
    image: "/assets/events/trading.jpg",
    tags: ["Trading", "Stocks", "Finance"],
    prizePool: "₹35,000"
  }
];

export const categories = [
  { id: "all", name: "All Events", color: "neon-magenta" },
  { id: "Culturals", name: "Culturals", color: "neon-teal" },
  { id: "Sci-Tech", name: "Sci-Tech", color: "amber-glow" },
  { id: "Informals", name: "Informals", color: "tribal-gold" },
  { id: "E-Cell", name: "E-Cell", color: "neon-magenta" },
  { id: "FinTech", name: "FinTech", color: "neon-teal" },
  { id: "Varchasva", name: "Varchasva", color: "amber-glow" },
];
