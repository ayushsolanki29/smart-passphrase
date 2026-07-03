import React, { useState, useEffect } from 'react';
import { generatePassphrase } from 'smart-passphrase';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RefreshCw, Shield, Zap, Sparkles, Terminal, Check, Package } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-purple-500/30 transition-colors"
  >
    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const App = () => {
  const [passphrase, setPassphrase] = useState('');
  const [strength, setStrength] = useState('easy');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNew = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const result = generatePassphrase({ strength });
        setPassphrase(result);
      } catch (err) {
        console.error(err);
      }
      setIsGenerating(false);
    }, 400); // Artificial delay for animation
  };

  useEffect(() => {
    generateNew();
  }, [strength]);

  const handleCopy = () => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#050505] text-slate-300 font-sans selection:bg-purple-500/30 relative overflow-hidden pb-20">
      
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 relative">
        <div className="flex items-center gap-2">
          <Shield className="text-purple-400" size={28} />
          <span className="font-bold text-xl tracking-tight text-white">smart-passphrase</span>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="https://www.npmjs.com/package/smart-passphrase"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Package size={20} />
            <span className="hidden sm:inline">npm</span>
          </a>
          <a 
            href="https://github.com/ayushsolanki29/smart-passphrase"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <GithubIcon size={20} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 flex flex-col items-center text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-purple-500/20 text-sm text-purple-300 mb-8"
        >
          <Sparkles size={16} />
          <span>v2.0 is now available!</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl"
        >
          Generate <span className="text-gradient">Memorable</span> & Secure Passphrases.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
        >
          A lightweight, secure, and human-readable passphrase generator for Node.js and modern browsers. Built for React, Next.js, Vite, and plain Node projects.
        </motion.p>

        {/* Interactive Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl glass-card rounded-3xl p-6 md:p-8 mb-24"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              {['easy', 'medium', 'strong', 'ultra'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setStrength(tier)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    strength === tier
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                  }`}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isGenerating ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-10 flex items-center"
                      >
                        <div className="animate-pulse bg-white/10 h-6 w-3/4 rounded-md"></div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={passphrase}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-mono text-xl md:text-2xl font-bold text-white tracking-wide truncate w-full text-center md:text-left"
                      >
                        {passphrase}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={generateNew}
                    disabled={isGenerating}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors disabled:opacity-50"
                    title="Generate New"
                  >
                    <RefreshCw size={20} className={isGenerating ? "animate-spin" : ""} />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-slate-500 flex justify-between px-2">
              <span>Entropy approx: {
                strength === 'easy' ? '~35 bits' : 
                strength === 'medium' ? '~50 bits' : 
                strength === 'strong' ? '~70 bits' : '~80+ bits'
              }</span>
              <span>crypto.getRandomValues</span>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24">
          <FeatureCard 
            icon={Zap}
            title="Memorable & Fast"
            description="Human-readable passphrases that are easy to type and remember, without sacrificing entropy."
            delay={0.4}
          />
          <FeatureCard 
            icon={Shield}
            title="Cryptographically Secure"
            description="Built on crypto.getRandomValues for true randomness, ensuring your passphrases are unpredictable."
            delay={0.5}
          />
          <FeatureCard 
            icon={Terminal}
            title="Premium CLI Experience"
            description="Beautifully styled terminal output with gradients, animations, and instant clipboard support."
            delay={0.6}
          />
        </div>

        {/* Setup Section */}
        <div className="w-full max-w-3xl glass-card rounded-3xl p-8 md:p-12 text-left mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Terminal size={120} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
          <div className="space-y-6">
            <div>
              <p className="text-slate-400 mb-3 font-medium">1. Run instantly via CLI</p>
              <div className="bg-[#050505] border border-white/10 rounded-xl p-4 font-mono text-sm flex items-center justify-between group">
                <span className="text-slate-300"><span className="text-pink-400">npx</span> smart-passphrase --strength ultra</span>
                <Copy size={16} className="text-slate-500 cursor-pointer hover:text-white transition" onClick={() => navigator.clipboard.writeText('npx smart-passphrase --strength ultra')} />
              </div>
            </div>
            <div>
              <p className="text-slate-400 mb-3 font-medium">2. Or install in your project</p>
              <div className="bg-[#050505] border border-white/10 rounded-xl p-4 font-mono text-sm flex items-center justify-between">
                <span className="text-slate-300"><span className="text-purple-400">npm</span> install smart-passphrase</span>
                <Copy size={16} className="text-slate-500 cursor-pointer hover:text-white transition" onClick={() => navigator.clipboard.writeText('npm install smart-passphrase')} />
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="w-full text-center py-8 text-slate-500 text-sm z-10 border-t border-white/5">
        <p>Built with open-source love. MIT Licensed.</p>
      </footer>

    </div>
  );
}

export default App;