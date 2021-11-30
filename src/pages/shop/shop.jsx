import React from "react"
import { Route } from "react-router-dom"
import Collection from "../collection/collection"
import CollectionsOverview from "../../components/collection-overview/collection-overview"

const Shop = ({ match }) => {
  //console.log(match)
  return (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:category`} component={Collection} />
  </div>
)}


export default Shop