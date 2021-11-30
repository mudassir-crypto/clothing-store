import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCollectionsPreview } from "../../redux/shop/shop.selector"
import CollectionPreview from "../collection-preview/collection-preview"
import './collection-overview.scss'

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {
      collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps}/>
      ))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsPreview
})

export default connect(mapStateToProps)(CollectionsOverview)
