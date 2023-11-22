'use client'

import {useState,useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick}) =>{
console.log(data[0],'abs');
  return(
    <div className='prompt_layout mt-16'>
      {data.map((post)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText,setSearchText] = useState('')
  const [posts,setPosts] = useState([])
  const handleSearchChange = (e) =>{

  }
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await fetch('api/prompt');
      const data = await response.json(); 
      setPosts(data);
    }
    fetchPosts();
  },[])
  return (
    <section className='feed'>
      <form className='w-full relative flex-center'>
        <input type="text" placeholder='Search for a tag or username' value={searchText} className='search_input peer' onChange={handleSearchChange} required />
      </form>
      <PromptCardList
        data ={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed