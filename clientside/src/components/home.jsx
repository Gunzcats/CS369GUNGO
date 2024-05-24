import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // ปรับ path ตามโครงสร้าง project ของคุณ

function Home() {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // หรือหน้าอื่นๆ ที่ต้องการ redirect หลัง logout
  };

  return (
    <div>
      {/* เนื้อหาอื่นๆ ของหน้า Home */}

      {/* Conditional rendering ของปุ่ม Login/Logout */}
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
