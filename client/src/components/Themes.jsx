import { AiOutlineFontSize } from 'react-icons/ai';
import { IoIosLock } from 'react-icons/io';
import { MdLogout, MdWbSunny } from 'react-icons/md';

import { useLogout } from '../features/authentication/useLogout';

import Button from './Button';
import Nav from './Nav';

// List of navigation items for different theme settings
const navItems = [
  { to: 'color-theme', icon: MdWbSunny, label: 'Color Theme' },
  { to: 'font-theme', icon: AiOutlineFontSize, label: 'Font Theme' },
  { to: 'change-password', icon: IoIosLock, label: 'Change Password' },
];

function Themes() {
  const { logout } = useLogout();  // Custom hook for logging out

  return (
    <>
      {/* Navigation links for theme-related settings */}
      <div className="m-auto flex w-full flex-col justify-center gap-2 rounded-md p-3 px-4">
        {navItems.map((item) => (
          <Nav key={item.to} to={item.to} icon={item.icon} className="w-full">
            <span>{item.label}</span>
          </Nav>
        ))}
      </div>

      {/* Divider line */}
      <div className="dark:border-darkBorder my-3 w-full border-t border-gray-300" />

      {/* Logout button */}
      <Button customClass="px-7 items-center gap-2 w-full" onclick={() => logout()}>
        <MdLogout />
        <span>Logout</span>
      </Button>
    </>
  );
}

export default Themes;
