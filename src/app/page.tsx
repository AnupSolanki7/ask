"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CoffeeDateRequest() {
  const [stage, setStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [choosingPlace, setChoosingPlace] = useState(false);
  
  const questions = [
    "Hey Manali, I made something special just for you! 🎁", 
    "Before I show you, quick question: Are you ready for the best coffee date ever? ☕😍"
  ];

  const handleNo = () => {
    if (stage < questions.length - 1) {
      setStage(stage + 1);
    }
  };

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setChoosingPlace(true);
  };

  const confirmPlace = (place: any) => {
    setDateConfirmed(place);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center"
      >
        {dateConfirmed ? (
          <h1 className="text-2xl font-bold text-gray-800">
            Yay! 🎉 Can’t wait for our coffee date at {dateConfirmed}, Manali! ☕💖
          </h1>
        ) : choosingPlace ? (
          <>
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Where should we go? ☕✨</h1>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => confirmPlace("Kaffa Coffee Sindhu Bhava")} className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500">
                Kaffa Coffee Sindhu Bhavan
              </Button>
              <Button onClick={() => confirmPlace("Vince Coffee")} className="bg-purple-500 hover:bg-purple-600 focus:ring-purple-500">
                Vince Coffee
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-6 text-2xl font-bold text-gray-800">{questions[stage]}</h1>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleYes} className="bg-green-500 hover:bg-green-600 focus:ring-green-500">
                I’m Excited! 💕
              </Button>
              {/* <Button onClick={handleNo} className="bg-red-500 hover:bg-red-600 focus:ring-red-500">
                Let’s See My Options! 😆
              </Button> */}
            </div>
          </>
        )}

        {showConfetti && <Confetti />}
      </motion.div>
    </div>
  );
}

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="h-full w-full">
        {[...Array(50)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-4 w-4 rounded-full bg-yellow-400"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
