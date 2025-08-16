import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'sonner';
import { NextResponse } from 'next/server';

function QuestionList({formData}) {





const [loading, setLoading] = useState(false);
const [questionList, setQuestionList] = useState([]);

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
      <div className='p-5 bg-white rounded-xl border border-gray-200'>
       {questionList.map((q, index) => (
        <div key={index} className="p-4 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{q.question}</h3>
        <p className='text-sm text-blue-500'>
        Type: {q.type} | Difficulty: {q.difficulty}
        </p>
       </div>
            ))}
        </div>}
     </div>
  )
}

export default QuestionList
