import { Outlet } from 'react-router';
import './index.css'
function App() {
  return (
    <div className='flex justify-center items-center '>
      <Outlet />
    </div>
  );
}

export default App;
