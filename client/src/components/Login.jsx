import React from 'react'
import { useFormik } from "formik"
import Axios from "axios"
const Login = (props) => {
    const formik = useFormik({
        initialValues: {

            email: "",
            password: ""
        },
        onSubmit: (data) => {
            console.log(data)
            Axios.post("http://localhost:5000/api/login", data).then(res => {
                localStorage.setItem("auth", JSON.stringify(res.data))
                props.history.push("/home")
                console.log(res)
            }).catch(err => console.log(err))
        }
    })
    return (
        <div className="container mt-4">
            <div className="jumbotron">
                  <h4>Login</h4> <br />
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                
                {/* <div className="form-group">
                    <label >Name</label>
                    <input type="text" name="name" onChange={formik.handleChange}
                        value={formik.values.name}
                        className="form-control" required />
                </div> */}
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
                        window.location.href = "register"
                    }}>Registor</a>

                </div>
            </form>
                
          </div>
        </div>
    )
}

export default Login
