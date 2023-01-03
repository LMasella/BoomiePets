import { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const { handleSubmit, errors } = props;
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    return (
        <div className='border border-dark pt-5 px-5 container'>
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit(formData);}
            }>
                <div>
                    <h1 className='text-center'>BoomiePets!</h1>
                    <h3>Login:</h3>
                    <div className='row g-3 align-items-center mt-1'>
                        <div className='col-3'>
                            <label htmlFor='username'>Username:</label>
                        </div>
                        <div className='col-auto'>
                            <input onChange={e => setFormData({...formData, username: e.target.value})} className='form-control' type='text' id='username' name='username' value={formData.username} size='40' />
                        </div>
                    </div>
                    <div className='row g-3 align-items-center mt-1'>
                        <div className='col-3'>
                            <label htmlFor='password'>Password:</label>
                        </div>
                        <div className='col-auto'>
                            <input onChange={e => setFormData({...formData, password: e.target.value})} className='form-control' type='password' id='password' name='password' value={formData.password} size='40' />
                        </div>
                    </div>
                </div>

                {errors.map((err, i) => <p className='err text-center mt-2' key={i}>{err}</p>)}

                <div className='row g-3 align-items-center mt-3'>
                    <div className='d-flex justify-content-center'>
                        <input className='btn btn-success' style={{width: '22.5em'}} type='submit' />
                    </div>
                </div>  
            </form>
            <p className='text-center' style={{margin: '2em 0'}}>Not registered? <Link to='/register'>Register Here</Link></p>
        </div>
    )
}

export default Login;

//                {errors.map((err, i) => <p className='err text-center mt-2' key={i}>{err}</p>)}