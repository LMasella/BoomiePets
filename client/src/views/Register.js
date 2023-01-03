import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";

const Register = (props) => {
    const { handleSubmit } = props;
    const [errors, setErrors] = useState([]);

    const createUser = (user) => {
        axios.post('http://localhost:8000/api/users/new', user, {withCredentials: true})
            .then(res => {
                console.log(res);
                handleSubmit(user);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log(err);
            });
        }

    return (
        <div className='container'>
            <main className='p-4 border border-dark'>
                <UserForm initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }} handleSubmit={createUser} errors={errors} />
                <p style={{margin: '2em 0'}}>Back to <Link to='/'>Login</Link></p>
            </main>
        </div>
    )
}

export default Register;