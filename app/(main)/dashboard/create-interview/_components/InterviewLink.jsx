import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Copy, List, Plus } from 'lucide-react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function InterviewLink({ interview_id, formData }) {
        const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id;


    const GetInterviewUrl=()=>{
        return url;
    }

    const onCopyLink = async  () => {
    await navigator.clipboard.writeText(url);
    toast('Interview link copied to clipboard');
    }



 return (
    <div>
     
     <div className="flex flex-col justify-center items-center">
      <Image
        src="/check.png"
        alt="Checkmark"
        width={200}
        height={200}
        className="mx-auto w-[100px] h-[100px]"
      />
      <h2 className="font-bold text-lg mt-3">Your Interview is Ready!</h2>
      <p>Share this link with your candidates to start the interview</p>
      
      </div>

      <div className="flex flex-row  justify-center items-center  mt-4  ">
        <h2 className="font-semibold text-sm">Interview_Link:</h2>
        <Input defaultValue={GetInterviewUrl()} disabled={true} />
        <Button onClick={()=>onCopyLink()} className='mx-1'><Copy  /> Copy Link</Button>
      </div>
      <hr className="my-5" />

      <div className='flex flex-row'>
        <h2  className='text-sm text-gray-500 flex gap-1px  items-center mx-3'><Clock  className='h-4 w-4'/> {formData?.duration} 30min</h2>
        <h2  className='text-sm text-gray-500 flex gap-1px items-center'><List  className='h-4 w-4'/> {formData?.duration} 10 Questions</h2>
        {/* <h2  className='text-sm text-gray-500 flex gap-2 items-center'><Calendar  className='h-4 w-4'/> {formData?.duration} </h2> */}
      </div>

      <div className='mt-7 flex gap-4 bg-white p-5 rounded-lg shadow-md '>
      <h2 className='font-semibold text-sm flex items-center'> Share Via</h2>
      <div>
      <Button className='mx-10' variant={'outline'} ><Mail /> email</Button>
      <Button className='mx-10' variant={'outline'}><Mail /> WhatsApp Share</Button>
      <Button className='mx-10'variant={'outline'} ><Mail /> SMS </Button>
      </div>
      
      
      </div>
      <div className='mt-5 flex gap-4 w-full justify-between'>
       <Link href={'/dashboard'}>
        <Button variant={'outline'}> <ArrowLeft /> Back to Dashboard</Button>
       </Link>
       <Link href={'/dashboard/create-interview'}>
        <Button> <Plus /> Create New Interview</Button>
      </Link>
      </div>

    </div>
    
  );
}

export default InterviewLink;
