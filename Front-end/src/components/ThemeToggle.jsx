/* eslint-disable no-unused-vars */
// components/ThemeToggle.jsx
import { useTheme } from '../contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className={`relative flex items-center w-36 h-12 rounded-full p-1 transition-colors duration-500 overflow-hidden ${
          isDarkMode ? 'bg-black' : 'bg-gray-300'
        }`}
      >
        <motion.div
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ x: isDarkMode ? -40 : 40, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: isDarkMode ? 40 : -40, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          {isDarkMode ? (
            <FaMoon className="text-black text-xl" />
          ) : (
            <FaSun className="text-yellow-500 text-xl" />
          )}
        </motion.div>

        <div className="flex justify-center items-center w-full text-sm font-semibold z-10">
          <AnimatePresence mode="wait">
            {isDarkMode ? (
              <motion.span
                key="dark"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="text-white ml-12"
              >
                Escuro
              </motion.span>
            ) : (
              <motion.span
                key="light"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="text-black ml-12"
              >
                Claro
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  )
}
