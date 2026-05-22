import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, Play } from "lucide-react";

interface IntroVideoModalProps {
  videoSrc: string;
  poster?: string;
  title?: string;
  description?: string;
}

export function IntroVideoModal({ videoSrc, poster, title, description }: IntroVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play on mount after a delay
  useEffect(() => {
    if (!hasAutoPlayed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoPlayed(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [hasAutoPlayed]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Playback prevented, user interaction needed
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      {/* Trigger Button - Only show if not auto-played yet */}
      {!isOpen && !hasAutoPlayed && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-luxe-cyan/20 to-luxe-blue/20 backdrop-blur-sm border border-luxe-cyan/30 hover:border-luxe-cyan/60 transition-all duration-500 hover:shadow-lg hover:shadow-luxe-cyan/20"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-luxe-cyan/20 group-hover:border-luxe-cyan/40"
          />
          <Play className="w-6 h-6 text-luxe-cyan fill-luxe-cyan" />
        </motion.button>
      )}

      {/* Modal Backdrop & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-6"
            >
              <div className="relative w-full h-full max-w-5xl max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl">
                {/* Video Container */}
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={videoRef}
                    poster={poster}
                    controls
                    className="w-full h-full object-cover"
                    controlsList="nodownload"
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Gradient Overlay on bottom for text */}
                  {(title || description) && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                      {title && (
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="text-2xl md:text-3xl font-display text-white mb-2"
                        >
                          {title}
                        </motion.h3>
                      )}
                      {description && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl"
                        >
                          {description}
                        </motion.p>
                      )}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
                >
                  <X className="w-6 h-6 text-white group-hover:text-luxe-cyan transition-colors" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Manual Trigger Button (for accessibility) */}
      {hasAutoPlayed && !isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-luxe-cyan/30 hover:border-luxe-cyan/60 bg-luxe-cyan/5 hover:bg-luxe-cyan/10 transition-all duration-500"
        >
          <Play className="w-5 h-5 text-luxe-cyan fill-luxe-cyan" />
          <span className="text-luxe-cyan text-sm uppercase tracking-widest font-semibold">
            Watch Intro
          </span>
        </motion.button>
      )}
    </>
  );
}
