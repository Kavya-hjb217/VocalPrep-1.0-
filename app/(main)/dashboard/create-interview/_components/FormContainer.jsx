import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

function FormContainer({ onHandleInputChange }) {
   const [interviewType, setInterviewType] = useState([]);

   useEffect(() => {
    if(interviewType)
    { onHandleInputChange('interviewType', interviewType);}
   }, [interviewType]);

   // useEffect(() => {
   //  console.log("Updated formData", formData);
   // }, [formData]);


   const AddInterviewType=(type)=>{
     const data=interviewType.includes(type);

     if(!data)
     {
       setInterviewType((prev) => [...prev, type]);
     }
     else{
        const result = interviewType.filter(item => item != type);
        setInterviewType(result);
     }

   }
// const AddInterviewType = (type) => {
//   let updated;
//   if (!interviewType.includes(type)) {
//     updated = [...interviewType, type];
//   } else {
//     updated = interviewType.filter(item => item !== type);
//   }
//   setInterviewType(updated);
//   onHandleInputChange('interviewType', updated); // Pass the new value directly
// }



  return (
    <div className='p-5 bg-white rounded-xl'>
     <div>
        <h2 className='text-sm font-medium'>Job Position</h2>
        <Input placeholder='eg: Full Stack Developer ' className='mt-2'
        onChange={(event) => onHandleInputChange('jobPosition', event.target.value)} />
     </div>
     <div className='mt-5'>
        <h2 className='text-sm font-medium'>Job Description</h2>
         <Textarea placeholder='Enter the detailed Job Description' className='mt-2 h-[200px]' 
         onChange={(event) => onHandleInputChange('jobDescription', event.target.value)} />
     </div>
     <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
         <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
         </SelectTrigger>
         <SelectContent>
           <SelectItem value="5 min">5 min</SelectItem>
           <SelectItem value="15 min">15 min</SelectItem>
           <SelectItem value="30 min">30 min</SelectItem>
           <SelectItem value="1 hour">1 hour</SelectItem>
         </SelectContent>
       </Select>

  
        
     </div>

     <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Type</h2>
       <div className='flex gap-2 mt-2 flex-wrap'>
       { InterviewType.map((type,index)=>(
           <div key={index} className={`flex items-center cursor-pointer 
           gap-2 p-1 px-2 bg-white  border border-gray-300 rounded-2xl
           hover:bg-secondary  ${interviewType.includes(type.title) && 'bg-blue-100 text-blue-500'}`}
            onClick={() =>AddInterviewType(type.title)}>
               <type.icon className='h-4 w-4'

              />
               <span className='text-sm'>{type.title}</span>
           </div>
       ))}

       </div>
       </div>
      <div className='mt-10 flex justify-end'>
         <Button>Generate Interview <ArrowRight /></Button>
      </div>
     </div>
    )
}

export default FormContainer
