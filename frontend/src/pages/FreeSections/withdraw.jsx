import React, { useState } from 'react'
import axios from 'axios'

const Withdraw = () => {
     
    const[amount, setAmount] = useState('')
    const[loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    

   const handleWithdraw = async()=>{

    if(!amount || amount <= 0){
        setMessage('please enter a valid amount')
        return
    }
    setLoading(true)
    setMessage("")

    try{
        const token = localStorage.getItem("token")
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/wallet/withdraw`,{amount},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    if(res.data.success){
        setMessage(`Withdraw successful! Available balance: ${res.data.balance}`)
        setAmount("")
    }else{
        setMessage(`X ${res.data.message || "Withdraw Failed"}`)
    }

    }catch(err){
        console.error("Withdraw error :",err);
        
    }finally{
        setLoading(false)
    }

   }



  return (
    <div>
        <h2>Withdraw Funds</h2>
        <input type = "number"
        placeholder='Enter amount'
        value={amount}
        onChange={e=>setAmount(e.target.value)}
        className='p-8 w-[100%] mb-10'/>

        <button
            onClick={handleWithdraw}
            disabled={loading}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>
          {message && <p className="mt-10">{message}</p>}
    </div>
  )
}

export default Withdraw