'use client'
import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react'

interface FormPost {
  email?: string
  name?: string
  comment?: string
}

//https://flowbite.com/docs/components/forms/
  export default function Support() {

    const success_msg = 'Thanks for the input! We will reach out to you ASAP!';
    const failure_msg = 'There is something wrong. Please send email to nathandyao@gmail.com directly. Sorry for the inconvenience.'

    const encode = (data: any) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    };
  
    const [state, setState] = useState<FormPost>();
    const [submitted, setSubmitted] = useState(false);
    const [afterSubmittedMsg, setAfterSubmittedMsg] = useState(success_msg);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      console.log('onSubmit...')
      event.preventDefault();
      try{
        let b = { "form-name": "question", ...state };
        console.log(`BODY: ${JSON.stringify(b, null, " ")}`)
        
        const res = await fetch("/api/form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(b)
        });
        // if preventDefault() is put after the await, it will not prevent form been submitted to default url
        // which is /support
        //event.preventDefault();

        if (res?.status == 200){
          console.log(`Success!`)
          setAfterSubmittedMsg(success_msg);
        }
        else{
          setAfterSubmittedMsg(failure_msg);
          console.log(`Submission failed! ${JSON.stringify(res, null, " ")}`)
        }
        
        
      }
      catch(e){
        setAfterSubmittedMsg(failure_msg);
        console.log(e)
      }
      finally{
        setSubmitted(true);
      }
    }
  
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [e.currentTarget.id]: e.currentTarget.value,
      });
    };
  

    return (
      <>
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <br/>
                <header className="mb-4 lg:mb-6 not-format">
                    <address className="flex items-center mb-6 not-italic">
                        <div className="inline-flex items-center mr-3 text-3xl text-gray-900 dark:text-white">
                            
                            <div>
                            <h1>We want hear from you!</h1>
                            </div>
                        </div>
                    </address>
              
                </header>
                {(!submitted) &&
                  <form name="question" method="POST" data-netlify="true" onSubmit={onSubmit}>
                    <div className="mb-6">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                              onChange={handleChange} 
                              type="email" id="email" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              placeholder="name@email.com" 
                              required/>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input onChange={handleChange} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your question or comment</label>
                      
                      <textarea onChange={handleChange} id="comment" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment or question..."></textarea>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                  }
                { submitted && 
                  <h5>{afterSubmittedMsg}</h5>
                }
              </article>
        </div>

      </>
    );
  }
  