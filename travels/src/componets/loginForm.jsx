import react, {useState} from'react'
import axios from 'axios'


const LoginForm=({onLogin}) =>{
    const[form,setForm]=useState({
        username:'',
        
        password:''


    })
    const [message,setmessage]=useState('')
    const handlechange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})

    }
    const handleSubmit=async(e) =>{
        e.preventDefault()
        try{
          const response= await axios.post('http://127.0.0.1:8000/api/login/',form);

            console.log("LOGIN RESPONSE:",response.data);


            setmessage('Login sucessful!');
            if(onLogin){
              onLogin(response.data.token,response.data.user_id)
            }
        
        }catch(error){
          console.log("LOGIN ERROR:",error);
          console.log("ERROR RESPONSE:",error .response?.data);
          
           setmessage(
            "login Failed");
            
        }



    }
    
    
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label> username</label>
            <input type="text" name="username"value={form.username} onChange={handlechange}/><br/>
            <label> password</label>
            <input type="paasword" name="password"value={form.password}onChange={handlechange}/><br/>
            <button type='submit'>Login</button>
            {message &&  <p>{message}</p>}
        </div>
      </form>


    </div>
  ) 

}
export default LoginForm