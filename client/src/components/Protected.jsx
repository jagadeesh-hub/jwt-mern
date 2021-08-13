import React from 'react'
import { Route, Redirect } from "react-router-dom"
const Protected = ({ component, ...rest }) => {
    const RenderComponent = component

    let hasToken = JSON.parse(localStorage.getItem("auth"))
    return (
        <Route
            {...rest}
            render={props => {
                return hasToken!==null &&hasToken!==undefined ? (<RenderComponent {...props} />) : (
                    <Redirect to={{ pathname: "/login" }} />

                )
            }}
        />
    )
}

export default Protected
