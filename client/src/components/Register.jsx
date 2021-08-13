import React from 'react'
import { useFormik } from "formik"
import Axios from "axios"
import { toast } from 'react-toastify'
import * as yup from "yup"
const Register = (props) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup.string().strict().trim().required("this field is required"),
            email: yup.string().email().required("this field is required"),
                          password: yup.string().strict().trim().required("this field is required"),


        }),
        onSubmit: (data) => {
            console.log(data)
            Axios.post("http://localhost:5000/api/register", data).then(res => {
                
                props.history.push("login")
                window.alert("Registered Successfully!!")
            }).catch(err => {
                toast.error(err.response.data)
            })
        }
    })
    return (
        <div className="container mt-4">
            <div className="jumbotron">
                  <h4>Register</h4> <br />
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" name="name" onChange={formik.handleChange}
                        value={formik.values.name}
                        className="form-control" required />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" name="email" onChange={formik.handleChange}
                        value={formik.values.email}
                        className="form-control" required />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="text" name="password" onChange={formik.handleChange}
                        value={formik.values.password}
                        className="form-control" required />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <a href="#" onClick={() => {
                        window.location.href = "login"
                    }}>Login</a>

                </div>
            </form>
                
          </div>
        </div>
    )
}

export default Register
