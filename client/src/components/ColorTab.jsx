import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

function ColorTab() {
  const [selectedTheme, setSelectedTheme] = useState(
    () => localStorage.getItem("colorTheme") || "light",
  );

  useEffect(() => {
    localStorage.setItem("colorTheme", selectedTheme);

    const html = document.documentElement;

    // HANDLE THEME COLOR
    if (selectedTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [selectedTheme]);

  const options = [
    {
      id: "light",
      title: "Light Mode",
      description: "Pick a clean and classic light theme",
      icon: <IoSunny className="text-2xl" />,
    },
    {
      id: "dark",
      title: "Dark Mode",
      description: "Select a sleek and modern dark theme",
      icon: <IoMoon className="text-2xl" />,
    },
  ];

  return (
    <div className="px-7 pt-9 text-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Color Theme</h3>
        <p>Choose your color theme</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col gap-7"
      >
        {options.map((option) => {
          const selected = option.id === selectedTheme;

          return (
            <motion.div
              key={option.id}
              layout
              onClick={() => setSelectedTheme(option.id)}
              className="relative flex w-2/4 cursor-pointer items-center gap-3 rounded-md border-[1px] border-gray-300 p-3"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated background */}
              {selected && (
                <motion.div
                  layoutId="color-highlight"
                  className="absolute inset-0 z-0 rounded-md bg-gray-200"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}

              {/* Icon */}
              <div className="z-10 rounded-md border-[1px] border-gray-300 p-3 text-2xl">
                {option.icon}
              </div>

              {/* Text */}
              <div className="z-10">
                <p className="font-bold">{option.title}</p>
                <p>{option.description}</p>
              </div>

              {/* Ring indicator */}
              <motion.div
                layout
                className={`absolute right-6 z-10 h-2 w-2 rounded-full ring-4 ${
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

export default ColorTab;
