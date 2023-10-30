import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
    const [formData, setFormData] = useState({})
    const [loading,setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    useEffect(()=>{

        if(errorMsg){
            toast.error(errorMsg);
            setErrorMsg("");
        }
    },[errorMsg])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

   async function handleSubmit(e){
    try{
        setLoading(true)
        e.preventDefault()
        const res = await fetch("http://localhost:4000/signup",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData)
        })

        if (res.status === 400) {
            const errorData = await res.json();
           setErrorMsg(errorData.error)
        }

        const data = await res.json()
        console.log(data)
        setLoading(false)

    }catch(err){
        console.log("Client Register Error",err)
    }
    finally{
        setLoading(false)
    }
        
    }
    return (
        <>

<ToastContainer />
            <div className="w-full flex  max-w-[1100px] m-auto  rounded-2xl p-2">
                <img src="https://animelosangeles.org/wp-content/uploads/2022/07/industryregistration.png " className="w-[40%] object-contain "></img>
                <form className="  w-full h-full p-10 ml-10" onSubmit={handleSubmit} >
                    <div className="w-full max-w-md">
                        <h1 className="mb-8 text-2xl font-bold">Register Your Account</h1>

                        <div>
                            <span className="text-xs">Full Name</span>
                            <input
                                class="border-2 border-gray-300 focus:border-[#434773] px-4 py-2 outline-none w-full rounded-md mb-5"
                                type="text"
                                placeholder="Enter your name"
                                id="name"
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <span className="text-xs">Email</span>
                            <input
                                class="border-2 border-gray-300 focus:border-[#434773] px-4 py-2 outline-none w-full rounded-md mb-5"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <span className="text-xs">Password</span>
                            <input
                                class="border-2 border-gray-300 focus:border-[#434773] px-4 py-2 outline-none w-full rounded-md mb-5"
                                type="password"
                                placeholder="Enter your password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>

                        <p>By continuing you agree to <span className="text-[#434773] font-bold">Terms and Conditions</span > and <span className="text-[#434773] font-bold"> Privacy and Policy</span></p>

                        <button disabled = {loading} className="p-3 rounded-md w-full bg-[#434773] mt-5 text-white hover:bg-[#4b5296] transition-all">{loading?"loading":"Create Account"}</button>
                        <p className="mt-3 text-center">Already have an Account? Login now</p>

                        {errorMsg}
                    </div>
                </form>
            </div>
        </>
    )

}