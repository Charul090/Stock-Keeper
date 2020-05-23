import React from 'react'
import {Switch,Route} from "react-router-dom"
import Listing from '../Components/Listing/Listing'
import AddStock from "../Components/AddStock/AddStock.jsx"

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Listing} />
            <Route path="/item/add/:id"  component={AddStock} />
        </Switch>
    )
}
