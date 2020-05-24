import React from 'react'
import {Switch,Route} from "react-router-dom"
import Listing from '../Components/Listing/Listing'
import AddStock from "../Components/AddStock/AddStock.jsx"
import ReduceStock from '../Components/ReduceStock/ReduceStock'
import HistoryListing from '../Components/HistoryListing/HistoryListing'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Listing} />
            <Route path="/item/add/:id"  component={AddStock} />
            <Route path="/item/reduce/:id"  component={ReduceStock} />
            <Route path="/history" component={HistoryListing} />
        </Switch>
    )
}
