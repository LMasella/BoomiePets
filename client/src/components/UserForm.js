import { useState } from "react";

const UserForm = (props) => {
    const { initialValues, handleSubmit, errors } = props;
    const [formData, setFormData] = useState(initialValues);

    return (
        <div className='border border-dark p-3'>
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit(formData);}
            }>
                <div>
                    <h3>User Details:</h3>
                    <div className='row g-3 align-items-center'>
                        <div className='col-3'>
                            <label htmlFor='username'>Username:</label>
                        </div>
                        <div className='col-auto'>
                            <input onChange={e => setFormData({...formData, username: e.target.value})} className='form-control' type='text' id='username' name='username' value={formData.username} size='40' />
                        </div>
                    </div>
                    <div className='row g-3 align-items-center mt-1'>
                        <div className='col-3'>
                            <label htmlFor='email'>Email:</label>
                        </div>
                        <div className='col-auto'>
                            <input onChange={e => setFormData({...formData, email: e.target.value})} className='form-control' type='text' id='email' name='email' value={formData.email} size='40' />
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
                    <div className='row g-3 align-items-center mt-1'>
                        <div className='col-3'>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                        </div>
                        <div className='col-auto'>
                            <input onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className='form-control' type='password' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} size='40' />
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
        </div>
    )
}

export default UserForm;