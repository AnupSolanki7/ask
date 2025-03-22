"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Coffee } from "lucide-react"

export default function CoffeeDateRequest() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [dateConfirmed, setDateConfirmed] = useState<string | null>(null)
  const [choosingPlace, setChoosingPlace] = useState(false)

  const sendMail = (place: string) => {
    fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ place }),
    })
  }

  const confirmPlace = (place: string) => {
    setDateConfirmed(place)
    setShowConfetti(true)
    sendMail(place)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl text-center border border-rose-200"
      >
        {dateConfirmed ? (
          <>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
              Yay! 🎉 Can&apos;t wait for our coffee date at {dateConfirmed}, Prathuuu! ☕💖
            </h1>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <Coffee className="inline-block w-24 h-24 text-rose-400" />
            </motion.div>
          </>
        ) : choosingPlace ? (
          <>
            <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
              Where shall we create our coffee memories? ☕✨
            </h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button
                onClick={() => confirmPlace("Kaffa Coffee Sindhu Bhavan")}
                className="bg-rose-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-rose-600 transition"
              >
                Kaffa Coffee Sindhu Bhavan
              </Button>
              <Button
                onClick={() => confirmPlace("Vince Coffee")}
                className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 transition"
              >
                Vince Coffee
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
              Prathuuu, I&apos;ve prepared a special surprise just for you! 🎁
            </h1>
            <p className="text-lg text-gray-600 mb-6">Ready to embark on a delightful coffee adventure?</p>
            <Button
              onClick={() => setChoosingPlace(true)}
              className="bg-blue-400 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:bg-blue-00 transition"
            >
              Yes, I&apos;m Excited! 💕
            </Button>
          </>
        )}
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
            className="absolute h-4 w-4 rounded-full bg-rose-400"
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

