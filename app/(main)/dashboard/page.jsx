// page.jsx
import React from 'react'
import { UserDetailProvider } from '@/app/context/UserDetailContext'
import WelcomeContainer from './_components/WelcomeContainer';

function Dashboard({ children }) {
  return (
    <UserDetailProvider>
      <div>
        <WelcomeContainer/>
        {children}
      </div>
    </UserDetailProvider>
  );
}

export default Dashboard;
