import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Image as ImageIcon, Mail, X, Lock, Unlock, LockKeyhole, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

const PASSCODE = '1013';
const START_DATE = new Date('2025-10-13T00:00:00');

const GALLERY_ITEMS = [
  { id: 1, caption: "Our first message 💌", icon: <Mail className="w-8 h-8 text-rose-300" /> },
  { id: 2, caption: "The first photo I showed you 📸", icon: <ImageIcon className="w-8 h-8 text-rose-300" /> },
  { id: 3, caption: "The first photo you showed me ✨", icon: <ImageIcon className="w-8 h-8 text-rose-300" /> },
  { id: 4, caption: "The moment you became mine 💍", icon: <Heart className="w-8 h-8 text-rose-300" /> },
];

const SPOTIFY_TRACKS = [
  { id: '6QgjcU0zLnzq5OrUoSZ3OK', title: "Love Is a Bitch" },
  { id: '0CAfXk7DXMnon4gLudAp7J', title: "Low" },
  { id: '3zxGgkVNNbDNEsNWKblmZ', title: "Buttons" },
  { id: '0xWqKbsOa1J2O0A6B29WUS', title: "No Pole" },
];

// You can edit the messages below directly in this array!
const FRIENDS_LETTERS = [
  {
    id: 'ella',
    name: 'Ella',
    message: "[Edit Ella's message here. She previously said: OH MAH GUHH HELLO IM IN AN ENVELOPE??!!...]"
  },
  {
    id: 'jack',
    name: 'Jack',
    message: "[Edit Jack's message here. He previously said: Nice 1 year anniversary guys...]"
  },
  {
    id: 'andreas',
    name: 'Andreas',
    message: "[Edit Andreas's message here. He previously said: No the f*** he is not the best man...]"
  },
  {
    id: 'mo',
    name: 'Mo',
    message: "[Edit Mo's message here. He previously said: As the married, bigger, and taller person...]"
  }
];

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: window.innerHeight + 100,
            x: Math.random() * window.innerWidth,
            scale: Math.random() * 0.5 + 0.3,
            opacity: 0
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
          className="absolute text-rose-300"
        >
          <Heart fill="currentColor" size={24} />
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedEnvelope = ({ onOpenComplete, label, delay = 0 }) => {
  const [phase, setPhase] = useState('closed');

  useEffect(() => {
    if (phase === 'opening') {
      const timer = setTimeout(() => onOpenComplete(), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onOpenComplete]);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setPhase('opening'), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={() => phase === 'closed' && setPhase('opening')}
      className={`relative w-80 h-56 mx-auto perspective-1000 ${phase === 'closed' ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
    >
      {phase === 'closed' && !delay && (
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-12 left-0 right-0 text-center font-serif text-rose-600 font-bold tracking-widest z-50 drop-shadow-sm"
        >
          {label}
        </motion.div>
      )}

      {/* Back of Envelope */}
      <div className="absolute inset-0 bg-rose-300 rounded-xl shadow-inner z-10" />

      {/* Letter Paper Sliding Up */}
      <motion.div
        initial={{ y: 10, scale: 0.95 }}
        animate={phase === 'opening' ? { y: -120, scale: 1 } : { y: 10, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="absolute inset-x-4 top-4 bottom-4 bg-white rounded-lg shadow-md z-20 flex flex-col items-center justify-start p-4 overflow-hidden border border-rose-50"
      >
        <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-2">
          <Heart size={20} className="text-rose-300" fill="currentColor" />
        </div>
        <div className="w-3/4 h-2 bg-rose-100 rounded-full mb-2" />
        <div className="w-full h-2 bg-rose-100 rounded-full mb-2" />
        <div className="w-5/6 h-2 bg-rose-100 rounded-full" />
      </motion.div>

      {/* Front Pocket of Envelope */}
      <div className="absolute inset-0 bg-rose-200 rounded-xl z-30 drop-shadow-sm" style={{ clipPath: 'polygon(0 35%, 50% 65%, 100% 35%, 100% 100%, 0 100%)' }} />
      <div className="absolute inset-0 bg-rose-100/50 rounded-xl z-30 pointer-events-none" style={{ clipPath: 'polygon(0 0, 50% 65%, 0 100%)' }} />
      <div className="absolute inset-0 bg-rose-100/50 rounded-xl z-30 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 50% 65%, 100% 100%)' }} />

      {/* Envelope Flap */}
      <motion.div
        initial={{ rotateX: 0, zIndex: 40 }}
        animate={phase === 'opening' ? { rotateX: 180, zIndex: 15 } : { rotateX: 0, zIndex: 40 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-[65%] bg-rose-400 rounded-t-xl origin-top drop-shadow-md"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      />

      {/* Heart Seal */}
      <motion.div 
        animate={phase === 'opening' ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <Heart className="w-12 h-12 text-rose-600 fill-current drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
};

const LockScreen = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handlePress = (num) => {
    if (passcode.length < 4 && !error) {
      const newPass = passcode + num;
      setPasscode(newPass);
      if (newPass.length === 4) {
        if (newPass === PASSCODE) {
          setTimeout(onUnlock, 400);
        } else {
          setError(true);
          setTimeout(() => { setPasscode(""); setError(false); }, 600);
        }
      }
    }
  };

  const handleBackspace = () => !error && setPasscode(prev => prev.slice(0, -1));

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <FloatingHearts />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={error ? { x: [-15, 15, -15, 15, 0], scale: 1, opacity: 1 } : { x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: error ? 0.4 : 0.5 }}
        className={`bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl shadow-rose-200/50 w-full max-w-sm flex flex-col items-center border relative z-10 transition-colors ${error ? 'border-red-300' : 'border-white/50'}`}
      >
        <motion.div animate={error ? { rotate: [0, -10, 10, -10, 10, 0] } : { y: [0, -5, 0] }} transition={error ? { duration: 0.4 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <Heart className={`w-12 h-12 mb-6 transition-colors ${error ? 'text-red-400' : 'text-rose-400'}`} fill="currentColor" />
        </motion.div>
        
        <h2 className={`text-2xl font-serif mb-2 transition-colors ${error ? 'text-red-600' : 'text-rose-900'}`}>
          {error ? 'Incorrect Passcode' : 'Enter Passcode'}
        </h2>
        <p className={`text-sm mb-8 transition-colors ${error ? 'text-red-400' : 'text-rose-500'}`}>When did it all change?</p>
        
        <div className="flex gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i} 
              animate={error ? { backgroundColor: '#fca5a5', borderColor: '#fca5a5' } : {}}
              className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${passcode.length > i ? 'bg-rose-400 border-rose-400' : 'border-rose-200 bg-transparent'}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button key={num} whileTap={{ scale: 0.9 }} onClick={() => handlePress(num.toString())} className="h-16 rounded-2xl bg-white/60 hover:bg-rose-100/60 text-rose-700 text-2xl font-medium shadow-sm transition-colors">{num}</motion.button>
          ))}
          <div />
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handlePress('0')} className="h-16 rounded-2xl bg-white/60 hover:bg-rose-100/60 text-rose-700 text-2xl font-medium shadow-sm transition-colors">0</motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleBackspace} className="h-16 rounded-2xl flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50/50 transition-colors">
            <X size={24} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const HomePage = ({ onNext }) => {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now - START_DATE;
      setTimeElapsed({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-24">
      <header className="pt-16 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4 tracking-wide">Our Story</h1>
        <div className="flex justify-center items-center gap-4 text-rose-400">
          <div className="h-[1px] w-12 bg-rose-300" />
          <Heart fill="currentColor" size={16} className="animate-pulse" />
          <div className="h-[1px] w-12 bg-rose-300" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 space-y-24">
        {/* Gallery */}
        <section>
          <h2 className="text-3xl font-serif text-rose-800 mb-10 text-center">Where It All Began 💬</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GALLERY_ITEMS.map((item) => (
              <motion.div key={item.id} whileHover={{ scale: 1.03, y: -8 }} className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-50 overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] bg-rose-50/50 rounded-2xl flex flex-col items-center justify-center mb-4 border border-dashed border-rose-200 transition-colors group-hover:bg-rose-100/60 group-hover:border-rose-300">
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>{item.icon}</motion.div>
                  <span className="text-sm text-rose-400 mt-3 font-medium tracking-wide">Upload Photo</span>
                </div>
                <p className="text-center font-medium text-rose-900/80 pb-2">{item.caption}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Love Letter */}
        <section className="flex flex-col items-center">
          <h2 className="text-3xl font-serif text-rose-800 mb-8 text-center">A Note For You 💌</h2>
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-rose-200/60 border border-rose-100 relative w-full">
            <div className="absolute top-0 right-0 p-8 text-rose-200"><Heart size={48} fill="currentColor" className="opacity-30" /></div>
            <div className="space-y-6 text-lg md:text-xl font-serif text-slate-700 leading-relaxed relative z-10">
              <p>Oh God it has been a year I still can’t believe how low the chances were that we even met because of a random app with a cat and a purp as its name. Out of all the people in the world, somehow we got brought together on 1st of August on it, and it’s the best thing that’s ever happened to me.</p>
              <p>There isn't really a single favorite moment I have because everyday with you is my favourite, but genuinely nothing compares to our late night calls where we end up laughing so much that we can't speak well. Between those calls saying 'blah blah blah' whenever you actually make a point (This is a hint for later), and opening my phone to your scary face mask photos, you make every day lovely and amazing.</p>
              <p>I don't say it enough, but I am so in love with everything about you. Your gorgeous face, that soft smile that instantly resets my whole day, your incredible attitude, and that gentle, loving, almost motherly nature that makes me feel so cared for. Honestly, just having you there to talk to makes my entire life better.</p>
              <p>We already know the real things about who's funnier and who loves who more (it's me obviously), but seriously I can't wait for our future. I look forward to everything ahead of us which looks like growing together, building our life together and having kids and starting a family of our own.</p>
              <p>Thank you for 365 days of love, laughs, comfort and pure love. Here’s to our first year down and a lifetime more to go.</p>
            </div>
            <div className="mt-12 text-right border-t border-rose-100 pt-8 relative z-10">
              <p className="font-serif italic text-rose-500 text-xl">I love you endlessly,</p>
              <p className="font-serif font-bold text-rose-900 mt-1 text-xl">Your Husband, Konstantin Sophia</p>
            </div>
          </div>
        </section>

        {/* Spotify Players */}
        <section>
          <h2 className="text-3xl font-serif text-rose-800 mb-8 text-center">Our Soundtrack 🎵</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPOTIFY_TRACKS.map((track) => (
              <div key={track.id} className="bg-white p-2 rounded-[20px] shadow-lg shadow-rose-100/50 hover:shadow-rose-200/60 transition-shadow">
                <iframe 
                  style={{ borderRadius: '12px' }} 
                  src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* Counter */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 p-8 md:p-12 rounded-3xl shadow-xl shadow-rose-200/40 relative overflow-hidden">
            <h2 className="text-sm md:text-base uppercase tracking-widest text-rose-500 font-bold mb-8 relative z-10">This is how long I've loved you</h2>
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap relative z-10">
              {[{ l: 'Days', v: timeElapsed.days }, { l: 'Hours', v: timeElapsed.hours }, { l: 'Minutes', v: timeElapsed.minutes }, { l: 'Seconds', v: timeElapsed.seconds }].map((u, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-md flex items-center justify-center mb-3 border border-rose-50">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-rose-600 tabular-nums">{u.v}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-rose-800/60 uppercase tracking-widest">{u.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-12">
          <button onClick={onNext} className="flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-lg font-medium">
            Next Page <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const QuizPage = ({ onNext }) => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  
  // Status: null, 'correct', 'error'
  const [status, setStatus] = useState({ q1: null, q2: null, q3: null, q4: null });

  const validateQ1 = () => {
    const valid = ['blah blah blah', 'ne ne ne', 'neh neh neh', 'bitch'];
    const isCorrect = valid.includes(q1.trim().toLowerCase());
    setStatus(s => ({ ...s, q1: isCorrect ? 'correct' : (q1 ? 'error' : null) }));
  };

  const validateQ2 = () => {
    const isCorrect = q2.trim().length > 0;
    setStatus(s => ({ ...s, q2: isCorrect ? 'correct' : (q2 ? 'error' : null) }));
  };

  const handleMCQ = (qKey, answer) => {
    if (answer === 'Jess') {
      setStatus(s => ({ ...s, [qKey]: 'error' }));
      setTimeout(() => setStatus(s => ({ ...s, [qKey]: null })), 600); // Clear error after shake
    } else {
      setStatus(s => ({ ...s, [qKey]: 'correct' }));
    }
  };

  const allCorrect = status.q1 === 'correct' && status.q2 === 'correct' && status.q3 === 'correct' && status.q4 === 'correct';

  const getInputClasses = (qStatus) => {
    let base = "w-full bg-white border-2 rounded-xl px-4 py-3 text-slate-800 focus:outline-none transition-all pr-12 ";
    if (qStatus === 'correct') return base + "border-green-400 focus:border-green-500 shadow-[0_0_15px_rgba(74,222,128,0.2)]";
    if (qStatus === 'error') return base + "border-red-400 focus:border-red-500 shadow-[0_0_15px_rgba(248,113,113,0.2)]";
    return base + "border-rose-100 focus:border-rose-300";
  };

  const StatusIcon = ({ qStatus }) => {
    if (qStatus === 'correct') return <CheckCircle2 className="absolute right-4 top-3.5 text-green-500" size={20} />;
    if (qStatus === 'error') return <XCircle className="absolute right-4 top-3.5 text-red-500" size={20} />;
    return null;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-rose-100">
          
          <div className="flex items-center justify-center gap-3 mb-10">
            <motion.div animate={allCorrect ? { rotateY: 180, scale: 1.2 } : {}}>
              {allCorrect ? <Unlock className="text-green-500" size={32} /> : <Lock className="text-rose-400" size={32} />}
            </motion.div>
            <h2 className="text-3xl font-serif text-rose-900">How well do you know us?</h2>
          </div>

          <div className="space-y-8">
            {/* Q1 */}
            <motion.div animate={status.q1 === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
              <label className="block text-slate-700 font-medium mb-2">1. What do we say when the other makes an actually good point?</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={q1} onChange={(e) => { setQ1(e.target.value); setStatus(s => ({...s, q1: null})); }}
                  onBlur={validateQ1}
                  className={getInputClasses(status.q1)} placeholder="Type and click away..."
                />
                <StatusIcon qStatus={status.q1} />
              </div>
            </motion.div>

            {/* Q2 */}
            <motion.div animate={status.q2 === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
              <label className="block text-slate-700 font-medium mb-2">2. Why do you send me scary face mask photos?</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={q2} onChange={(e) => { setQ2(e.target.value); setStatus(s => ({...s, q2: null})); }}
                  onBlur={validateQ2}
                  className={getInputClasses(status.q2)} placeholder="Type and click away..."
                />
                <StatusIcon qStatus={status.q2} />
              </div>
            </motion.div>

            {/* Q3 */}
            <motion.div animate={status.q3 === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
              <label className="block text-slate-700 font-medium mb-3 flex items-center justify-between">
                <span>3. Who is funnier?</span>
                {status.q3 === 'correct' && <CheckCircle2 className="text-green-500" size={20} />}
              </label>
              <div className="flex gap-4">
                <button onClick={() => handleMCQ('q3', 'Jess')} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${status.q3 === 'error' ? 'bg-red-50 border-red-400 text-red-600' : 'bg-white border-rose-100 hover:bg-rose-50 text-slate-600'}`}>Jess</button>
                <button onClick={() => handleMCQ('q3', 'Tan')} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${status.q3 === 'correct' ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200' : 'bg-white border-rose-100 hover:bg-rose-50 text-slate-600'}`}>Tan</button>
              </div>
            </motion.div>

            {/* Q4 */}
            <motion.div animate={status.q4 === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
              <label className="block text-slate-700 font-medium mb-3 flex items-center justify-between">
                <span>4. Who loves who more?</span>
                {status.q4 === 'correct' && <CheckCircle2 className="text-green-500" size={20} />}
              </label>
              <div className="flex gap-4">
                <button onClick={() => handleMCQ('q4', 'Jess')} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${status.q4 === 'error' ? 'bg-red-50 border-red-400 text-red-600' : 'bg-white border-rose-100 hover:bg-rose-50 text-slate-600'}`}>Jess</button>
                <button onClick={() => handleMCQ('q4', 'Tan')} className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${status.q4 === 'correct' ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200' : 'bg-white border-rose-100 hover:bg-rose-50 text-slate-600'}`}>Tan</button>
              </div>
            </motion.div>
          </div>

        </div>

        <AnimatePresence>
          {allCorrect && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-12">
              <button onClick={onNext} className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1 transition-all text-lg font-medium">
                Next: Letters From Friends <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FriendsPage = ({ onLock }) => {
  const [activeEnvelope, setActiveEnvelope] = useState(null);
  const [modalPhase, setModalPhase] = useState('closed');

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">Letters From the Gang 💌</h2>
          <p className="text-rose-600 font-medium">Pick an envelope to read their message.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
          {FRIENDS_LETTERS.map((friend) => (
            <motion.button
              key={friend.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveEnvelope(friend); setModalPhase('closed'); }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100 flex flex-col items-center justify-center gap-4 h-56 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10 group-hover:scale-[2.5] transition-transform duration-700 ease-out" />
              <motion.div className="text-rose-300 group-hover:text-rose-400 transition-colors" whileHover={{ rotate: [-10, 10, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                <Mail size={56} />
              </motion.div>
              <span className="font-serif text-2xl text-rose-900 font-semibold mt-2">From {friend.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center">
          <button onClick={onLock} className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur border border-rose-200 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full shadow-sm transition-all text-sm font-medium">
            <LockKeyhole size={16} /> Lock Application
          </button>
        </div>
      </div>

      {/* Envelope Modal Overlay */}
      <AnimatePresence>
        {activeEnvelope && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setActiveEnvelope(null)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg relative flex items-center justify-center min-h-[400px]">
              <button onClick={() => setActiveEnvelope(null)} className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-[110]">
                <X size={24} />
              </button>

              <AnimatePresence mode="wait">
                {modalPhase === 'closed' ? (
                  <motion.div key="env" exit={{ opacity: 0, scale: 0.8 }} className="w-full">
                    <AnimatedEnvelope 
                      label={`LETTER FROM ${activeEnvelope.name.toUpperCase()}`}
                      delay={500}
                      onOpenComplete={() => setModalPhase('reading')}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="read"
                    initial={{ opacity: 0, scale: 0.8, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.3 }}
                    className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full relative overflow-hidden border border-rose-50"
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 to-pink-300" />
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-rose-50 border-2 border-dashed border-rose-200 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                        <ImageIcon size={32} className="text-rose-300" />
                      </div>
                      <h3 className="font-serif text-2xl text-rose-900 mb-6 font-bold text-center">Note from {activeEnvelope.name}</h3>
                      <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 w-full relative">
                        <div className="absolute -top-3 -left-2 text-4xl text-rose-200 font-serif">"</div>
                        <p className="text-slate-700 italic leading-relaxed text-center font-serif relative z-10">
                          {activeEnvelope.message}
                        </p>
                        <div className="absolute -bottom-6 -right-2 text-4xl text-rose-200 font-serif">"</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('lock'); // 'lock', 'home', 'quiz', 'friends'

  const handleUnlock = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const goToQuiz = () => {
    setCurrentPage('quiz');
    window.scrollTo(0, 0);
  };

  const goToFriends = () => {
    setCurrentPage('friends');
    window.scrollTo(0, 0);
  };

  const lockApp = () => {
    setCurrentPage('lock');
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="min-h-screen bg-fixed font-sans text-slate-800 selection:bg-rose-200"
      style={{
        backgroundColor: '#fff1f2',
        backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255, 235, 240, 0.8) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255, 240, 235, 0.8) 0%, transparent 20%)`
      }}
    >
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {currentPage === 'lock' && <LockScreen key="lock" onUnlock={handleUnlock} />}
        {currentPage === 'home' && <HomePage key="home" onNext={goToQuiz} />}
        {currentPage === 'quiz' && <QuizPage key="quiz" onNext={goToFriends} />}
        {currentPage === 'friends' && <FriendsPage key="friends" onLock={lockApp} />}
      </AnimatePresence>
    </div>
  );
}