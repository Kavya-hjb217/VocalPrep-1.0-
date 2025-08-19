import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'sonner';
import { NextResponse } from 'next/server';
import { Button } from '@/components/ui/button';

// import { v4 as uuidv4 } from "uuid";
// import { Firestore } from 'firebase/firestore';

// import QuestionListContainer from './QuestionListContainer';
import { db } from "@/services/firebase";
import { saveInterviewToFirestore } from "@/services/firestore";
import { useUser } from '@/app/context/useUser';


import { addDoc, collection, serverTimestamp } from "firebase/firestore";



function QuestionList({formData, onCreateLink}) {





const [loading, setLoading] = useState(false);
const [questionList, setQuestionList] = useState([]);
const [saveLoading, setSaveLoading] = useState(false);


useEffect(() => {
if(formData) {
    GenerateQuestionList();
}
}, [formData]);


const GenerateQuestionList =async () => {
    setLoading(true);
    console.log("Sending to API:", formData);
   try {
    const result = await axios.post('/api/ai-model', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("Full API response:", result.data);
    const Content = result.data; // API already returns JSON array
   setQuestionList(Content);    // update state
   setLoading(false);
   console.log("Parsed questions:", Content);

    
}

 
   
   catch (error) {
    toast.error('Error generating question list');
    setLoading(false);
    console.error("Error in API call:", error);
}
}

const onFinish = async (formData, questionList) => {
  setSaveLoading(true);
  if (!formData || questionList.length === 0) {
    toast.error("No data to save");
    return;
  }
  try {
    await saveInterviewToFirestore(formData, questionList);
    toast.success("Interview saved successfully!");
    console.log("✅ Interview saved to Firestore");
  } catch (error) {
    console.error("❌ Error adding document: ", error);
    toast.error("Failed to save interview.");
  }
  setSaveLoading(false);

  onCreateLink({
    interview_id: formData.interview_id,
    userEmail: formData.userEmail
  })
};


return (
    <div>
      {loading&&
      <div className='p-5 bg-blue-50 rounded-xl border border-gray-200 flex gap-5 items-center'>
        <Loader2Icon className='animate-spin'/>
      <div>
        <h2 className='font-semibold'>Generating Interview Questions...</h2>
        <p className='text-primary'>VocalPrep is crafting your personalized interview questions based on your job description and requirements.</p>
      </div>
     </div>
      
      }

      {questionList?.length > 0 && 
      <div>
        <h2 className='font-semibold text-lg'>Generated Interview Questions:</h2>
        <div className='p-5 bg-white rounded-xl border border-gray-200'>
        {questionList.map((q, index) => (
        <div key={index} className="p-4 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{q.question}</h3>
        <p className='text-sm text-blue-500'>
          Type: {q.type} | Difficulty: {q.difficulty}
         </p> 
        </div>
            ))}
        </div>
        
        </div>}


        <div className=' flex justify-end mt-5'>
         <Button onClick={() => onFinish(formData, questionList)} disabled={saveLoading}>Generate Interview Link & Finish</Button>

         {saveLoading && <Loader2Icon className='animate-spin ml-2' />}         
        </div>
       

     </div>
  )
}

export default QuestionList
