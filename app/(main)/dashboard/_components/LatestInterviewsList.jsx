"use client"
import { Button } from '@/components/ui/button';
import {  Video } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

function LatestInterviewsList() {
    const[interviewList , setInterviewList] = useState([]);

    return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>
      
      {interviewList?.length ==0&& 
      <div className='p-5  bg-white rounded-lg shadow-sm flex flex-col gap-3 items-center  mt-5' >
        <Video className='h-10 w-10 text-primary'/>
        <h2>You don't have any previously created interviews </h2>
        <Button>Create New Interviews</Button>
      </div>}
    </div>

  )
}

export default LatestInterviewsList
