import { PlusIcon } from "lucide-react"
import { Link } from "react-router"
import {useAuth} from '../context/AuthContext'

const NavBar = () => {

    const {user, logout} = useAuth()
    // console.log(user);
    
    return (
        <header className='bg-base-300 border-b border-base-content-10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>ThinkBoard</h1>
                    <div className='flex items-center gap-4'>
                        {user ? <div className="flex gap-4">
                        <Link to={"/create"} className='btn btn-primary'>
                            <PlusIcon className='size-5' />
                            <span>New Note</span>
                        </Link>
                        <button onClick={logout} className='btn btn-primary px-6'>
                            <span>Logout</span>
                        </button> 
                        </div>
                        :
                         <Link to={"/login"} className='btn btn-primary px-6'>
                            <span>Login</span>
                        </Link>
                        }
                    </div>
                </div>

            </div>
        </header>
    )
}

export default NavBar