'use client'
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Profile from '@components/Profile'

const ProfilePage = () => {
  const Router = useRouter();
    const {data:session} = useSession();
    const [posts,setPosts] = useState([])
    console.log(posts);
    useEffect(()=>{
        const fetchPosts = async ()=>{
          const response = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await response.json(); 
          setPosts(data);
          console.log(data,"fetch");
        }
        if(session?.user.id) fetchPosts();
      },[session?.user.id])

    const handleEdit = (post) =>{
        Router.push(`/update-prompt/id:${post._id}`);
    }
    const handleDelete = () =>{
        
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