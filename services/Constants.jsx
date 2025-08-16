import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2, User2Icon, WalletCards } from "lucide-react";
import { Icon } from "lucide-react";

export const SidebarOptions =[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interview',
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interviews',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    },
]

export const InterviewType = [
    {
        title: 'technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioural',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Managerial',
        icon: User2
    }

]

export const QUESTION_PROMPT = `Prompt:

Do not return the content as plain text . the content inside the api response should also be a valid JSON object
Structured SDE Intern Interview Question Generation (JSON Object Only)

Generate interview questions for the following job role.
Return ONLY a valid JSON object (no extra text, comments, or explanations).
The object MUST contain a single key "interviewQuestions" whose value is a JSON array of objects.

Each object in the "interviewQuestions" array must have exactly two keys:
- "question": string
- "type": one of ["Technical", "Behavioral", "Experience", "Problem Solving", "Leadership"]

Input Data:

Job Title: {{jobTitle}}

Job Description: {{jobDescription}}

Interview Duration (minutes): {{duration}}

Interview Type: {{interviewType}}

Instructions:

1. Analyze the job description for key skills, responsibilities, and experience.
2. Adjust the number and depth of questions to fit the interview duration:
   - ≤30 min: Focus on essential, concise questions.
   - 31 to 60 min: Include moderate depth and variety.
   - >60 min: Add deeper analytical and/or scenario-based questions.
3. Cover a mix of:
   - Technical
   - Behavioral
   - Experience
   - Problem Solving
   - Leadership (if relevant)
4. Use realistic, professional language suitable for a {{interviewType}} interview.
5. Output must be a **strictly valid JSON object** in this structure:

Sample Output (use this exact format, only replace questions and types with relevant ones):

{
  "interviewQuestions": [
    {
      "question": "Can you describe your experience with React.js and how you've used it to build web applications?",
      "type": "Experience"
    },
    {
      "question": "What are some key principles of building responsive web applications? Can you provide examples?",
      "type": "Technical"
    },
    {
      "question": "How do you optimize web applications for performance and SEO? Can you share techniques you’ve implemented?",
      "type": "Technical"
    },
    {
      "question": "Explain how you would integrate a frontend application with a REST/GraphQL API. What are the key considerations?",
      "type": "Technical"
    }
  ]
}
`