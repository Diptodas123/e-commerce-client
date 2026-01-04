import CommonForm from '@/components/common/Form';
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const initialFormData = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const AuthRegister = () => {

    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const disableSubmitButton = !formData.userName || !formData.email || !formData.password || !formData.confirmPassword;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        dispatch(registerUser(formData)).then((data) => {
            if (data.payload?.status === "success") {
                toast.success(data.payload?.message || "Registration successful, please login!", {
                    duration: 3000,
                    position: "top-right",
                });
                setFormData(initialFormData);
                navigate('/auth/login');
            } else {
                toast.error(data.payload?.message || "Registration failed", {
                    duration: 4000,
                    position: "top-right",
                });
            }
        });
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
                    Create new account
                </h1>
                <p className='mt-2'>
                    Already have an account?{' '}
                    <Link className='font-medium text-primary hover:underline'
                        to={'/auth/login'}
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={"Sign Up"}
                disableSubmitButton={disableSubmitButton}
            />
        </div>
    )
}

export default AuthRegister;