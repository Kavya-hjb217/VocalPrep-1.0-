import { Phone, Video } from 'lucide-react';
import React from 'react'
import Link from 'next/link';

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'
    >
    <Link href={'/dashboard/create-interview'} className='bg-white p-5 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer'
    >
        <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
        <h2 className='font-bold '>Create New Interview</h2>
        <p className='text-gray-500'>Create AI Interviews and schedule them with candidates</p>
    </Link>
    <div className='bg-white p-5 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
       <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
        <h2 className='font-bold '>Create Phone Screening Call</h2>
        <p className='text-gray-500'> Schedule phone screening call  with candidates</p>
    </div>
{/* 
    Create Options Component */}
    </div>
  )
};

export default CreateOptions;
  