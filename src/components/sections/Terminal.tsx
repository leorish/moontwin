import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { MagneticButton } from "@/components/MagneticButton";
import { Terminal as TerminalIcon, Sparkles, Send, Trash2, Heart } from "lucide-react";

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "A line of poetry that made me think of you...",
  "A quiet wish for midnight...",
  "A book we should read together under the stars...",
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);

  // Load persisted notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("prachi_sanctuary_notes");
      if (stored) {
        setSavedNotes(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveNotes = (updated: Note[]) => {
    setSavedNotes(updated);
    try {
      localStorage.setItem("prachi_sanctuary_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const submit = () => {
    if (!note.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: note.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newNote, ...savedNotes.slice(0, 7)];
    saveNotes(updated);

    setSent(true);
    setNote("");
    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  const deleteNote = (id: string) => {
    const filtered = savedNotes.filter((n) => n.id !== id);
    saveNotes(filtered);
  };

  return (
    <section id="terminal" ref={ref} className="relative py-28 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-gold/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-gold/80">
              VII. The Epilogue
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl italic text-gold-shimmer tracking-tight">
            Leave A Note
          </h2>
          <p className="mt-4 font-serif text-base italic text-muted-foreground/80 max-w-md mx-auto">
            Whisper your thoughts into the digital midnight ether.
          </p>
        </motion.div>

        {/* Terminal Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="glass-panel overflow-hidden rounded-2xl border border-gold/30 shadow-2xl backdrop-blur-2xl"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-gold/20 px-6 py-3.5 bg-black/40">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold/80 flex items-center gap-1.5">
                <TerminalIcon className="w-3 h-3" />
                sanctuary_terminal://prachi
              </span>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              v2.0 · secure
            </span>
          </div>

          <div className="p-6 md:p-10">
            {/* Quick Inspiration Pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/60 self-center mr-1">
                Prompts:
              </span>
              {PRESET_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setNote(prompt)}
                  className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1 font-serif italic text-xs text-muted-foreground hover:border-gold/40 hover:text-gold cursor-pointer transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Terminal Input Area */}
            <div className="rounded-xl border border-gold/15 bg-black/50 p-4">
              <p className="mb-2 font-mono text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-gold">guest@sanctuary</span>
                <span className="text-foreground/50">:~$</span>
                <span className="text-gold-soft">send_whisper --recipient=prachi</span>
              </p>

              <div className="relative mt-3">
                <span className="absolute left-0 top-2 font-mono text-sm text-gold select-none">&gt;</span>
                <textarea
                  className="w-full resize-none bg-transparent py-1 pl-6 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/40 focus:ring-0 leading-relaxed"
                  rows={4}
                  placeholder="Type a midnight message for Prachi..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      submit();
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gold/10 text-[10px] font-mono text-muted-foreground">
                <span>Press ⌘+Enter to send</span>
                <span>{note.length} characters</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex items-center justify-between">
              <AnimatePresence>
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 font-mono text-xs text-gold"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>✦ Sent into the midnight ether ✦</span>
                  </motion.div>
                ) : (
                  <div className="text-[11px] font-serif italic text-muted-foreground">
                    Kept secretly in this sanctuary.
                  </div>
                )}
              </AnimatePresence>

              <MagneticButton onClick={submit} className="cursor-pointer">
                <span className="flex items-center gap-2 font-mono">
                  Send Note <Send className="w-3 h-3" />
                </span>
              </MagneticButton>
            </div>

            {/* Saved Keepsake Notes Reel */}
            {savedNotes.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gold/15">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/80 flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-gold" />
                    Midnight Keepsakes ({savedNotes.length})
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Local Archive
                  </span>
                </div>

                <div className="space-y-3">
                  {savedNotes.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex items-start justify-between gap-4 rounded-xl border border-gold/10 bg-black/30 p-3.5 text-left transition-colors hover:border-gold/30"
                    >
                      <div>
                        <p className="font-serif italic text-sm text-foreground/90 leading-relaxed">
                          &ldquo;{item.text}&rdquo;
                        </p>
                        <span className="mt-1 inline-block font-mono text-[9px] text-gold/60">
                          {item.timestamp}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteNote(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 p-1 transition-opacity cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Closing Sanctuary Colophon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-gold/30" />
            <Sparkles className="w-4 h-4 text-gold/70" />
            <span className="h-px w-12 bg-gold/30" />
          </div>
          <p className="font-serif text-base italic text-foreground/90">
            Crafted with moonlight & eternal devotion.
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60">
            For Prachi · My Moon Twin · Always.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
