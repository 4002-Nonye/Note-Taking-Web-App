import { motion } from "framer-motion";
import { FaFont } from "react-icons/fa";
import { useFont } from "../contexts/FontContext";

function FontTab() {
  const { font, handleFontChange } = useFont();

  const options = [
    {
      id: "sans-serif",
      title: "Sans-serif",
      description: "Clean and modern, easy to read",
    },
    {
      id: "serif",
      title: "Serif",
      description: "Classic and elegant for a timeless feel",
    },
    {
      id: "mono",
      title: "Monospace",
      description: "Code-like, great for technical vibe",
    },
  ];

  return (
    <div className="px-7 pt-9 text-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Font Theme</h3>
        <p>Choose your font theme</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col gap-7"
      >
        {options.map((option) => {
          const selected = option.id === font;

          return (
            <motion.div
              key={option.id}
              layout
              onClick={() => handleFontChange(option.id)}
              className="relative flex xl:w-2/4 cursor-pointer items-center justify-between gap-3 rounded-md border-[1px] border-gray-300 p-3"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Left side content */}
              <div className="flex items-center gap-3">
                {/* Background Animation */}
                {selected && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 z-0 rounded-md bg-gray-200"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}

                {/* Icon */}
                <div className="z-10 rounded-md border-[1px] border-gray-300 p-3 text-2xl">
                  <FaFont />
                </div>

                {/* Text */}
                <div className="z-10">
                  <p className="font-bold">{option.title}</p>
                  <p>{option.description}</p>
                </div>
              </div>

              {/* Ring Indicator - now part of the flex flow */}
              <motion.div
                layout
                className={`z-10 h-2 w-2 rounded-full ring-4 ${
                  selected ? "ring-primaryBlue" : "ring-gray-400"
                }`}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default FontTab;