import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Clock, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import MagicCard from '../components/ui/MagicCard';
import LazyImage from '../components/ui/LazyImage';

// Import images
import blindPoster from '../assets/images/blind.jpg';
import paperPoster from '../assets/images/paper.jpg';
import traditionalPoster from '../assets/images/Traditional.jpg';
import promptPoster from '../assets/images/prompt.jpg';
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
      "No tab switching (monitored through HackerEarth)",
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
      "Each team consists of 2 members",
      "Use only the allotted system",
      "No mobiles, smart devices, or external resources",
      "No tab switching or unauthorized apps",
      "No cross-team communication; follow coordinator instructions",
      "Cheating or misconduct leads to disqualification; organizers' decision is final"
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
    teamSize: "Teams of 3",
    about: "The Paper Presentation at Spardha 2025, VVIT is a platform where innovation meets imagination. Each team, through 8 slides and 6 minutes, unveils a new dimension of ideas and solutions. Teams must select one domain from the provided list and present their technological solutions and research findings. Covering domains from AI to Blockchain, every presentation is a portal to discovery. It's not just a contest, but a journey through the multiverse of possibilities.",
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
    participants: "Teams of 3",
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
    title: "Image Word Guessing",
    date: "16 September, Tuesday",
    time: "01:00 PM",
    venue: "Activity Room 1",
    eventType: "Spot Event",
    teamSize: "1",
    about: "This is a fun and engaging word-guessing game where participants must deduce the word based on a series of images. These images could be blurry, or even a combination of both. The participant who guesses the most words correctly wins the game.",
    poster: spotEvent1,
    category: "fun",
    participants: "Solo",
    description: "Fun word-guessing game with images",
    gradient: "from-yellow-400 to-yellow-600",
  },
  'spot-event-2': {
    title: "Tech Trivia",
    date: "16 September, Tuesday",
    time: "03:00 PM",
    venue: "Activity Room 2",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Test your knowledge of technology, programming, and current tech trends. Answer questions about programming languages, frameworks, emerging technologies, and tech history. Fastest and most accurate participants win exciting prizes.",
    poster: spotEvent2,
    category: "fun",
    participants: "Solo",
    description: "Test your tech knowledge",
    gradient: "from-indigo-400 to-indigo-600",
  },
  'spot-event-3': {
    title: "Code Debugging",
    date: "17 September, Wednesday",
    time: "10:00 AM",
    venue: "Computer Lab Block B",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Find and fix bugs in provided code snippets. Participants will be given code with intentional errors and must identify and correct them within a time limit. This event tests your debugging skills and code analysis abilities.",
    poster: spotEvent3,
    category: "technical",
    participants: "Solo",
    description: "Find and fix bugs in code",
    gradient: "from-red-400 to-red-600",
  },
  'spot-event-4': {
    title: "UI/UX Design",
    date: "17 September, Wednesday",
    time: "02:00 PM",
    venue: "Design Studio",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Create beautiful and functional user interfaces. Design a mobile app or website interface based on given requirements. This event celebrates creativity and design thinking in technology.",
    poster: spotEvent4,
    category: "design",
    participants: "Solo",
    description: "Create beautiful UI/UX designs",
    gradient: "from-teal-400 to-teal-600",
  },
  'spot-event-5': {
    title: "Algorithm Challenge",
    date: "17 September, Wednesday",
    time: "10:30 AM",
    venue: "Activity Room 3",
    eventType: "Spot Event",
    teamSize: "1",
    about: "An exciting surprise challenge awaits participants in this spot event. Test your quick thinking and algorithmic skills in this impromptu competition designed to challenge your adaptability and problem-solving abilities.",
    poster: spotEvent5,
    category: "technical",
    participants: "Solo",
    description: "Test your algorithmic skills",
    gradient: "from-orange-400 to-orange-600",
  },
  'spot-event-6': {
    title: "Creative Coding",
    date: "17 September, Wednesday",
    time: "12:30 PM",
    venue: "Activity Room 4",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Another thrilling spot event with unique challenges that will test your problem-solving abilities and creativity. Combine art and code to create stunning visual representations and interactive experiences.",
    poster: spotEvent6,
    category: "creative",
    participants: "Solo",
    description: "Combine art and code creatively",
    gradient: "from-pink-400 to-pink-600",
  },
  'spot-event-7': {
    title: "Tech Quiz Marathon",
    date: "17 September, Wednesday",
    time: "02:30 PM",
    venue: "Activity Room 5",
    eventType: "Spot Event",
    teamSize: "1",
    about: "Challenge your skills in this dynamic spot event. Participants will face unexpected questions that require quick thinking and deep technical expertise across multiple technology domains.",
    poster: spotEvent7,
    category: "technical",
    participants: "Solo",
    description: "Dynamic tech quiz challenge",
    gradient: "from-cyan-400 to-cyan-600",
  },
  'spot-event-8': {
    title: "Innovation Pitch",
    date: "17 September, Wednesday",
    time: "04:30 PM",
    venue: "Activity Room 6",
    eventType: "Spot Event",
    teamSize: "1",
    about: "The final spot event of the day! This concluding challenge will test everything you've learned and push your abilities to the limit. Present your innovative tech ideas in a fast-paced pitch competition.",
    poster: spotEvent8,
    category: "presentation",
    participants: "Solo",
    description: "Present innovative tech ideas",
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
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-inter">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-inter">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-inter">Team Size: {event.teamSize}</span>
              </div>
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
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          Team size: {event.teamSize}
                        </li>
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
                <button className="crystal-glass px-8 py-4 rounded-2xl text-primary font-orbitron font-bold hover:bg-primary/10 shadow-glow flex items-center justify-center gap-3 btn-enhanced hover-glow transition-smooth">
                  <ExternalLink className="w-5 h-5" />
                  Register Now
                </button>
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
