import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Clock, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import MagicCard from '../components/ui/MagicCard';
import LazyImage from '../components/ui/LazyImage';

// Import images
import blindPoster from '../assets/images/blind.png';
import paperPoster from '../assets/images/paper.png';
import traditionalPoster from '../assets/images/Traditional.png';
import promptPoster from '../assets/images/prompt.png';
// Import spot event images
import spotEvent1 from '../assets/images/1.png';
import spotEvent2 from '../assets/images/2.png';
import spotEvent3 from '../assets/images/3.png';
import spotEvent4 from '../assets/images/4.png';
import spotEvent5 from '../assets/images/5.png';
import spotEvent6 from '../assets/images/6.png';
import spotEvent7 from '../assets/images/7.png';
import spotEvent8 from '../assets/images/8.png';

// Event data mapping
const eventData: Record<string, any> = {
  'codeverse': {
    title: "CodeVerse",
    tagline: "Where Every Code is a Universe, and Every Coder an Saver",
    date: "16 September, Tuesday",
    time: "9:00 AM",
    venue: "Computer Lab Block A",
    eventType: "Main Event",
    teamSize: "Individual (1)",
    about: "Step into the Inter-Universe Coding Quest, where programming skills decide survival and success. This individual competition presents five algorithmic challenges designed to test logic, problem-solving, and efficiency. Participants will compete in C, Java, or Python, with 90 minutes to think critically, code smartly, and optimize their solutions. With 100 marks at stake, the quest promises an intense and thrilling test of skill, speed, and strategy.",
    rules: [
      "Only registered participants will be allowed to compete",
      "Individual participation only",
      "Must have a HackerEarth account to participate",
      "No mobile phones or external devices allowed",
      "Complete HackerEarth login & setup in the 20-minute window before the shift",
      "Any rule violation will result in immediate disqualification"
    ],
    poster: traditionalPoster,
    category: "technical",
    participants: "Individual (1)",
    description: "Inter-Universe Coding Quest with algorithmic challenges",
    gradient: "from-blue-400 to-blue-600",
  },
  'blind-sync': {
    title: "Blind Sync",
    tagline: "Two Minds One Vision",
    date: "16 September, Tuesday",
    time: "10:00 AM",
    venue: "Main Auditorium",
    eventType: "Main Event",
    teamSize: "Teams of 2",
    about: "Blind Coding is a unique team-based event where one member codes while the other guides, testing memory, communication, and coordination. Across three challenging rounds, teams must rely on trust, precision, and quick thinking under pressure. More than just coding, it's a true test of teamwork, focus, and problem-solving, where collaboration meets creativity.",
    rules: [

      "Use only the allotted system",
      "Any form of cheating will result in immediate disqualification without warning",
      "No tab switching or unauthorized apps",
      "No cross-team communication; follow coordinator instructions",
      "Organizers' decision is final in all matters"
    ],
    poster: blindPoster,
    category: "technical",
    participants: "Teams of 2",
    description: "Team-based coding with one member coding and other guiding",
    gradient: "from-pink-400 to-pink-600",
  },
  'tech-thesis': {
    title: "Tech Thesis",
    tagline: "Where Every Slide Transforms into Insights",
    date: "17 September, Wednesday",
    time: "9:00 AM",
    venue: "Seminar Hall",
    eventType: "Main Event",
    teamSize: "Teams of 2-3",
    about: "The Paper Presentation at Spardha 2025, VVITU is a platform where innovation meets imagination. Each team, through 8 slides and 6 minutes, unveils a new dimension of ideas and solutions. Teams must select one domain from the provided list and present their technological solutions and research findings. Covering domains from AI to Blockchain, every presentation is a portal to discovery. It's not just a contest, but a journey through the multiverse of possibilities.",
    domains: [
      "AI (ML, DL, LLM)",
      "IoT",
      "Cybersecurity",
      "AR (Augmented Reality) and VR (Virtual Reality)",
      "Blockchain",
      "Entrepreneurship",
      "Human Resource Management",
      "Startup Development and Innovation"
    ],
    rules: [
      "Each team gets 5–6 minutes to present",
      "Teams must select one domain from the provided list",
      "Presentation must be relevant to the selected domain",
      "Only registered team members may present",
      "No changes in team or topic after registration",
      "Plagiarism will result in disqualification",
      "Teams must report to the venue for verification before their slot"
    ],
    poster: paperPoster,
    category: "technical",
    participants: "Teams of 2-3",
    description: "Platform where innovation meets imagination through presentations",
     gradient: "from-orange-400 to-orange-600",
   },
   'prompt-realm': {
    title: "Prompt Realm",
    tagline: "Craft the Way through Magic and Logic",
    date: "17 September, Wednesday",
    time: "9:30 AM",
    venue: "AI Lab",
    eventType: "Main Event",
    teamSize: "Individual (1)",
    about: "The magical academy's protective painting has mysteriously vanished, leaving the school vulnerable to danger. As the chosen student, your mission is to solve four enchanted puzzles and collect hidden clue fragments. With wit and determination, you must piece them together to craft a powerful prompt. Time is short — you have just 45 minutes to restore the painting and save the academy.",
    rules: [
      "Changing browser tabs will lead to immediate disqualification",
      "Phones must be switched off throughout the event",
      "Accessing any external resources, browsers, or extensions is not permitted",
      "Participants must use the lab computers provided by the organizers",
      "All solutions must be submitted within the 90-minute time frame"
    ],
    poster: promptPoster,
    category: "technical",
    participants: "Individual (1)",
    description: "Solve enchanted puzzles to craft powerful prompts",
    gradient: "from-purple-400 to-purple-600",
  },
  // Spot Events
  'spot-event-1': {
    title: "Term Twist",
    date: "16 September, Tuesday",
    time: "01:00 PM",
    venue: "Activity Room 1",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Participants will be given jumbled letters related to technology. They need to rearrange the letters to form the correct technical term. It tests speed, vocabulary, and technical knowledge in a fun way. The fastest and most accurate solver wins.",
    rules: [
      "Each participant gets 2 minutes to unscramble each word",
      "A total of 2 words will be chosen by participant",
      "Words are related to Computer Science & Engineering",
      "No use of mobile phones or external help",
      "The participant with the highest score wins. In case of a tie, fastest time wins"
    ],
    poster: spotEvent1,
    category: "fun",
    participants: "Solo",
    description: "Unscramble technical terms in this fast-paced word game",
    gradient: "from-yellow-400 to-yellow-600",
  },
  'spot-event-2': {
    title: "Think Tac Toe",
    date: "16 September, Tuesday",
    time: "03:00 PM",
    venue: "Activity Room 2",
    eventType: "Spot Event",
    teamSize: "2",
    about: "This is not the usual tic-tac-toe—it comes with a twist. Before placing an X or O, participants must answer a logic-based strategy question. Correct answers allow them to play their move; wrong answers give opponents an edge. It blends reasoning with tactical gameplay for added challenge.",
    rules: [
      "Two participants of both teams face off on a Tic-Tac-Toe board",
      "Before placing a mark, answer a logic/strategy-based question",
      "Correct answer gives you the chance to mark your X/O",
      "Wrong answer skips your turn",
      "First to complete 5 in a row wins"
    ],
    poster: spotEvent2,
    category: "fun",
    participants: "Teams of 2",
    description: "Strategic tic-tac-toe with logic questions",
    gradient: "from-indigo-400 to-indigo-600",
  },
  'spot-event-3': {
    title: "Queen Quest",
    date: "17 September, Wednesday",
    time: "10:00 AM",
    venue: "Computer Lab Block B",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Players solve the classic chessboard puzzle by placing 8 queens strategically. The challenge ensures no two queens can attack each other diagonally, vertically, or horizontally. It encourages logical reasoning and problem-solving techniques. Participants with efficient placements in fewer tries score higher.",
    rules: [
      "Participants are given a blank 8x8 chessboard",
      "Place 8 queens such that no two queens attack each other",
      "Time limit: 5 minutes",
      "Full 8 correct = Winner, else highest number of correctly placed queens",
      "Use logical reasoning; no external aids allowed",
      "In case of multiple correct solutions, fastest wins"
    ],
    poster: spotEvent3,
    category: "technical",
    participants: "Solo",
    description: "Solve the classic 8-queens chess puzzle",
    gradient: "from-red-400 to-red-600",
  },
  'spot-event-4': {
    title: "Flash Focus",
    date: "17 September, Wednesday",
    time: "02:00 PM",
    venue: "Design Studio",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Participants are shown a sequence of technical images for a short time. They must recall and reproduce the correct sequence when asked. It sharpens concentration, memory power, and quick recall skills. Those with the highest accuracy advance further.",
    rules: [
      "Participants are shown 10 technical images in a sequence for 10 seconds",
      "Then asked to write the correct sequence from memory",
      "1 point per correctly placed image in sequence",
      "Highest score wins",
      "No second viewing allowed"
    ],
    poster: spotEvent4,
    category: "memory",
    participants: "Solo",
    description: "Test your memory with technical image sequences",
    gradient: "from-teal-400 to-teal-600",
  },
  'spot-event-5': {
    title: "Skill Shot",
    date: "17 September, Wednesday",
    time: "10:30 AM",
    venue: "Activity Room 3",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Participants are given a set of tech-related terms or objects. Their task is to 'toss' (categorize) them correctly into relevant categories. It improves quick thinking and subject understanding under time pressure. Fastest accurate categorizer secures the win.",
    rules: [
      "The participant receives 3 technical terms, one at a time",
      "Categories are placed as buckets",
      "Toss the term in the correct category within 10 seconds per term",
      "1 point for each correct categorization",
      "No second chances or help allowed",
      "Most correct categorizations in least time wins"
    ],
    poster: spotEvent5,
    category: "technical",
    participants: "Solo",
    description: "Categorize tech terms quickly and accurately",
    gradient: "from-orange-400 to-orange-600",
  },
  'spot-event-6': {
    title: "Core Hunt",
    date: "17 September, Wednesday",
    time: "12:30 PM",
    venue: "Activity Room 4",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Participants will identify and name various CPU parts from real or model setups. It enhances understanding of computer architecture and hardware basics. Observation skills and quick recognition play a key role here. Perfect for hands-on learners to connect theory with practice.",
    rules: [
      "Participants are given a component of a CPU",
      "You must correctly identify 2-3 components and give correct explanation of functionality",
      "Time limit: 1 minute for each",
      "1 point for each correct identification",
      "No reference materials or devices allowed"
    ],
    poster: spotEvent6,
    category: "hardware",
    participants: "Solo",
    description: "Identify CPU components and their functions",
    gradient: "from-pink-400 to-pink-600",
  },
  'spot-event-7': {
    title: "Tower of Hanoi",
    date: "17 September, Wednesday",
    time: "02:30 PM",
    venue: "Activity Room 5",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Contestants move stacked disks from one peg to another following game rules. The aim is to complete the puzzle in minimal moves possible. It tests logical thinking, patience, and sequencing ability. Every move counts, so strategy matters more than speed.",
    rules: [
      "Setup with 3 rods and 3–5 disks",
      "Follow traditional rules: Only one disk can be moved at a time",
      "A larger disk cannot be placed on a smaller one",
      "Max time: 3 minutes",
      "Points based on minimum moves + time",
      "Violation of rules leads to disqualification"
    ],
    poster: spotEvent7,
    category: "logic",
    participants: "Solo",
    description: "Solve the classic Tower of Hanoi puzzle",
    gradient: "from-cyan-400 to-cyan-600",
  },
  'spot-event-8': {
    title: "Roll Storm",
    date: "17 September, Wednesday",
    time: "04:30 PM",
    venue: "Activity Room 6",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Players roll dice within limited attempts to achieve the highest possible sum. Luck and a bit of strategy decide the winner. Excitement builds with every roll as totals climb. A simple yet highly engaging crowd game.",
    rules: [
      "Two participants compete at a time",
      "Each participant rolls a standard 6-sided die 10 times",
      "Total of the 10 rolls is calculated",
      "If tie: one extra roll",
      "The participant with the highest total score wins",
      "Fair rolling only – dice must land on the table"
    ],
    poster: spotEvent8,
    category: "game",
    participants: "Solo",
    description: "Roll dice to achieve the highest score",
    gradient: "from-violet-400 to-violet-600",
  },
};

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  
  const event = eventData[eventId || ''];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [eventId]);
  
  // Handle back navigation with proper state management
  const handleBackNavigation = () => {
    // Navigate to events page to prevent app reload
    navigate('/events', { replace: true });
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <button
            onClick={handleBackNavigation}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Go Back to Events
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-secondary to-background">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Back Button */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={handleBackNavigation}
          className="crystal-glass p-3 rounded-lg hover:bg-primary/10 shadow-glow transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Event Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-block dashboard-glass px-6 py-3 rounded-2xl shadow-glow mb-6">
              <span className={`text-sm font-orbitron px-3 py-1 rounded-full bg-gradient-to-r ${event.gradient} text-white`}>
                {event.eventType}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient font-audiowide mb-6">
              {event.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-inter">{event.date}</span>
              </div>
              {event.eventType !== 'Spot Event' && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-inter">{event.time}</span>
                </div>
              )}
              {event.eventType !== 'Spot Event' && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-inter">Team Size: {event.teamSize}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Event Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Event Details */}
            <motion.div variants={itemVariants} className="space-y-8">
              <MagicCard
                className="dashboard-glass p-8 rounded-3xl relative"
                glowColor="0, 200, 255"
                enableTilt={false}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={15}
              >
                <div className="absolute inset-0">
                  <div className="bg-orb-purple opacity-20" />
                  <div className="crystal-facet-center" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-gradient font-audiowide mb-6">
                    About This Event
                  </h2>
                  <p className="text-lg text-muted-foreground font-inter leading-relaxed mb-8">
                    {event.about}
                  </p>
                  
                  <div className="space-y-6">
                    {/* Domains Section - Only for Tech Thesis */}
                    {event.domains && (
                      <div className="crystal-glass p-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                        <h3 className="text-xl font-bold text-gradient font-audiowide mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          Available Domains
                        </h3>
                        <p className="text-sm text-muted-foreground font-inter mb-4">
                          Teams must select one domain from the following options:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {event.domains.map((domain: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                              <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full flex-shrink-0"></span>
                              <span className="text-foreground font-inter font-medium text-sm">{domain}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Event Rules */}
                    <div className="crystal-glass p-6 rounded-2xl border border-primary/20">
                      <h3 className="text-xl font-bold text-gradient font-audiowide mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Event Rules
                      </h3>
                      <ul className="space-y-2 text-muted-foreground font-inter">
                        {event.eventType !== 'Spot Event' && (
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            Team size: {event.teamSize}
                          </li>
                        )}
                        {event.rules && event.rules.slice(0, 3).map((rule: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="scan-line-top" />
                <div className="scan-line-bottom" />
              </MagicCard>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex justify-center">
                {event.eventType === 'Spot Event' ? (
                  <div className="text-center space-y-4">
                    <div className="crystal-glass px-6 py-4 rounded-2xl border border-accent/30 bg-accent/5">
                      <p className="text-accent font-orbitron font-medium mb-2">
                        No Pre-Registration Required
                      </p>
                      <p className="text-sm text-muted-foreground font-inter">
                        This is a spot event - just show up and participate!
                      </p>
                    </div>
                    <button 
                      onClick={() => window.open('https://acm.vvitguntur.com/contact-us/register', '_blank')}
                      className="crystal-glass px-6 py-3 rounded-xl text-primary font-orbitron font-medium hover:bg-primary/10 shadow-glow flex items-center justify-center gap-2 btn-enhanced hover-glow transition-smooth"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Register for Main Events
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => window.open('https://acm.vvitguntur.com/contact-us/register', '_blank')}
                    className="crystal-glass px-8 py-4 rounded-2xl text-primary font-orbitron font-bold hover:bg-primary/10 shadow-glow flex items-center justify-center gap-3 btn-enhanced hover-glow transition-smooth"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Register Now
                  </button>
                )}
              </motion.div>
            </motion.div>

            {/* Event Poster */}
            <motion.div variants={itemVariants} className="relative">
              <MagicCard
                className="dashboard-glass p-6 rounded-3xl relative overflow-hidden"
                glowColor="0, 200, 255"
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={20}
              >
                <div className="absolute inset-0">
                  <div className="bg-orb-cyan opacity-20" />
                  <div className="crystal-facet-corner" />
                </div>

                <div className="relative z-10">
                  <LazyImage
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>

                <div className="scan-line-top" />
                <div className="scan-line-bottom" />
              </MagicCard>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Cyan-themed Floating Particles */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`event-detail-particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default EventDetailPage;
