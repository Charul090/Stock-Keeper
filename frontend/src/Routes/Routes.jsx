import React from 'react'
import {Switch,Route} from "react-router-dom"
import Listing from '../Components/Listing/Listing'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Listing} />
        </Switch>
    )
}
