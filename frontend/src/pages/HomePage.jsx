import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUI from '../components/RateLimitedUI'
import api from "../lib/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import NotesNotfound from "../components/NotesNotfound"
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const [isRateLimited, setIsRatelimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setloading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes?userId=${user._id}`)
        setNotes(res.data)
        setIsRatelimited(false)
        
      } catch (error) {
        console.log("error fetching notes!");
        console.log(error.response);
        console.log(res);

        if (error.response.status === 429) {
          setIsRatelimited(true)
        } else {
          toast.error("Failed to load")
        }
      } finally {
        setloading(false)
      }
    }
    if (!user) return
    fetchNotes();
  }, [user])

  return (
    <div className='min-h-screen'>
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div>
        {user ? <h1> Welcome {user.username} !</h1> : ""}
      </div>
      {!user ? 
      <div className='text-center py-8 '>Please login to see your notes     
        {notes.length === 0 && !isRateLimited && <NotesNotfound />}
      </div> :
        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <div className='text-center text-primary py-10'> LOADING NOTES... </div>}

          {notes.length === 0 && !isRateLimited && <NotesNotfound />}

          {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}

            </div>
          )}
        </div>}
    </div>

  )
}

export default HomePage