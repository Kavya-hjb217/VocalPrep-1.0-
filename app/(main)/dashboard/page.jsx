// page.jsx
import React from 'react'
import { UserDetailProvider } from '@/app/context/UserDetailContext'
import WelcomeContainer from './_components/WelcomeContainer';
import CreateOptions from './_components/CreateOptions';
import LatestInterviewsList from './_components/LatestInterviewsList';

function Dashboard({ children }) {
  return (
    <UserDetailProvider>
      <div>
        <WelcomeContainer/>
        {children}
        <h2 className='my-3   font-bold text-2xl'>Dashboard</h2>
        <CreateOptions />

        <LatestInterviewsList />

      </div>
    </UserDetailProvider>

  
    
  );
}

export default Dashboard;
