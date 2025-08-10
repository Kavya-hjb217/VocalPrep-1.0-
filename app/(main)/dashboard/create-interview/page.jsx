"use client"
import React from 'react'
import { UserDetailProvider } from '@/app/context/UserDetailContext'
import WelcomeContainer from '../_components/WelcomeContainer'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import FormContainer from './_components/FormContainer'

function CreateInterview({children}) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    
    const onHandleInputChange=(field,value)=>{
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
        console.log("formData", formData);
    }

  return (
    <UserDetailProvider>
      <div>
        <WelcomeContainer/>
        {children}
        
        <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
            <div className='flex gap-5 items-center '>
            <ArrowLeft onClick={() => router.back()} className='cursor-pointer'/>
            <h2 className='font-bold text-2xl'>Create New Interview</h2>
        </div>
            <Progress value={step*33.33}  className='my-5'/>
             <FormContainer onHandleInputChange={onHandleInputChange}/>


        </div>
       
        
        
        

      </div>
    </UserDetailProvider>
  )
}

export default CreateInterview
