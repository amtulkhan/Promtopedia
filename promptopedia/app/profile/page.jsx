'use client'
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const ProfilePage = () => {
  const router = useRouter();
    const {data:session} = useSession();
    const [posts,setPosts] = useState([])
   
    useEffect(()=>{
        const fetchPosts = async ()=>{
          const response = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await response.json(); 
          setPosts(data);
         
        }
        if(session?.user.id) fetchPosts();
      },[session?.user.id])

    const handleEdit = (post) =>{
      
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) =>{
        const hasConfirmed = confirm('Do you really want to delete the prompt?');
        if(hasConfirmed){
          try{
              await fetch(`/api/prompt/${post._id}`,{
                method:"DELETE"
              });
              const filteredPosts = posts.filter((p)=>{
                p._id !== post._id
              })
              setPosts(filteredPosts);
          }
          catch(error){
            console.log(error);
          }
        }
    }
  return (
    <Profile
    name='My'
    desc='Welcome to your personalised profile page'
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default ProfilePage