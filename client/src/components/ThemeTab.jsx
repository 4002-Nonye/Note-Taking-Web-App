import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

import Button from './Button';
import MoveBack from './MoveBack';

function ThemeTab({ options, head, subHead, themeName, onChange, handleSave, isPending }) {
  return (
    <>
      <MoveBack
        text="Settings"
        navigateTo="/account/settings"
        className="group flex items-center gap-2 px-3 pt-3 text-sm text-gray-500 lg:hidden"
      />

      <div className="px-7 pt-4 text-sm xl:pt-9">
        <div className="mb-6">
          <h3 className="text-lg font-bold">{head}</h3>
          <p>{subHead}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex flex-col gap-7"
        >
          {options.map((option) => {
            const selected = option.id === themeName;

            return (
              <motion.div
                key={option.id}
                layout
                onClick={() => onChange(option.id)}
                className="dark:border-darkBorder relative flex cursor-pointer items-center justify-between gap-3 rounded-md border-[1px] border-gray-300 p-4 xl:w-2/4"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Left side content */}
                <div className="flex items-center gap-3">
                  {/* Background Animation */}
                  {selected && (
                    <motion.div
                      layoutId="highlight"
                      className="dark:bg-bgCard absolute inset-0 z-0 rounded-md bg-gray-200"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div className="dark:border-darkBorder dark:bg-darkbg z-10 rounded-md border-[1px] border-gray-300 bg-white p-2 text-xl">
                    {option.icon}
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
                  className={`z-10 h-2 w-2 rounded-full bg-white ring-4 ${
                    selected ? 'ring-primaryBlue' : 'ring-gray-400'
                  }`}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
            );
          })}
          <div className="relative mt-5 flex justify-end md:w-full xl:w-2/4">
            <Button
              customClass={`bg-primaryBlue text-white rounded-md justify-center 
              w-2/4 md:w-[20%] xl:w-[30%] ${isPending ? 'pointer-events-none' : ''}`}
              onclick={handleSave}
            >
              {isPending ? <ClipLoader color="white" size={22} /> : 'Save changes'}
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default ThemeTab;

ThemeTab.propTypes = {
  options: PropTypes.array,
  head: PropTypes.string,
  subHead: PropTypes.string,
  themeName: PropTypes.string,
  onChange: PropTypes.func,
  handleSave: PropTypes.func,
  isPending: PropTypes.bool,
};
