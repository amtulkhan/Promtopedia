'use client'
import {useState,useEffect} from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
    
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')
  const [submitting,setSubmitting] = useState(false)
  const [post,setPost] = useState({
    prompt:'',
    tag:''
  })
  console.log(promptId);
  useEffect(()=>{
    const promptDetails = async() =>{
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json();
        console.log(data,"on edit");
        setPost({
            prompt:data.prompt,
            tag:data.tag
        })
    }
    if(promptId) promptDetails();
  },[promptId])
  const createPrompt = async (e)=>{
    e.preventDefault();
    setSubmitting(true);
    try{
      const response = await fetch("api/prompt/new",{
        method:'POST',
        body:JSON.stringify({
          prompt:post.prompt,
          userId:session?.user.id,
          tag:post.tag
        })
      })
      console.log(response);
      if(response.ok){
        router.push('/');
      }
    }
    catch(error){
      console.log(error);
    }
    finally{
      setSubmitting(false);
    }
  }
  return (
    <Form
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default EditPrompt