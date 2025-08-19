"use client"
import React from 'react'
import { UserDetailProvider } from '@/app/context/UserDetailContext'
import WelcomeContainer from '../_components/WelcomeContainer'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import FormContainer from './_components/FormContainer'
import { useEffect } from 'react'
import QuestionList from './_components/QuestionList'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'


function CreateInterview({children}) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const[interviewId,setInterviewId]= useState();
    
    const onHandleInputChange=(field,value)=>{
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
        // console.log("formData", formData);
    }

    useEffect(() => {
        console.log("formData", formData);
    }, [formData]);

   const onGoToNext = () => {
  if (
    !formData.jobPosition ||
    !formData.jobDescription ||
    !formData.duration ||
    !formData.interviewType ||
    formData.interviewType.length === 0
  ) {
    toast("Please fill all the fields");
    return;
  }
  setStep(step + 1);
};


const onCreateLink =  (interview_id) => {
  setInterviewId(interview_id);
  setStep(step+1);
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
             {step===1 ? <FormContainer onHandleInputChange={onHandleInputChange}
             GoToNext={() => onGoToNext()}
             /> 
             : step===2 ? <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> :
              step===3 ? <div className='p-5 bg-white rounded-xl border border-gray-200'>
                <InterviewLink interview_id={interviewId}
                formData={formData}/></div> : null}


        </div>
       
        
        
        

      </div>
    </UserDetailProvider>
  )
}

export default CreateInterview
