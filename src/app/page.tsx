"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CoffeeDateRequest() {
  const [stage, setStage] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const questions = [
    "Hey Manali, would you like to grab a coffee with Anup?",
    "Are you sure? Anup makes great company!",
    "Come on, it's just a coffee. Give Anup a chance!",
    "Anup's puppy eyes are irresistible. One coffee?",
    "Final offer: Coffee with Anup and a slice of cake!",
  ]

  const handleNo = () => {
    if (stage < questions.length - 1) {
      setStage(stage + 1)
    }
  }

  const handleYes = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">{questions[stage]}</h1>
        <div className="flex justify-center space-x-4">
          <Button onClick={handleYes} className="bg-green-500 hover:bg-green-600 focus:ring-green-500">
            Yes!
          </Button>
          <Button onClick={handleNo} className="bg-red-500 hover:bg-red-600 focus:ring-red-500">
            {stage === questions.length - 1 ? "Okay, fine!" : "No"}
          </Button>
        </div>
        {showConfetti && <Confetti />}
      </motion.div>
    </div>
  )
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
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  )
}

