"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/20 to-neon-teal/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50 group-hover:opacity-100" />
          
          {/* Card */}
          <div className="relative glass-card px-6 py-4 md:px-8 md:py-6 min-w-[80px] md:min-w-[100px]">
            {/* Number */}
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-center neon-text-gradient"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.div>
            
            {/* Label */}
            <div className="text-xs md:text-sm text-text-secondary text-center mt-2 uppercase tracking-wider">
              {unit.label}
            </div>
            
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-magenta rounded-tr-lg opacity-50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-teal rounded-bl-lg opacity-50" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
