import { createSelector } from "reselect"



const selectShop = state => state.shop

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

// export const selectCollection = collectionUrlParam => 
//   createSelector(
//     [selectShopCollections],
//     collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
//   )

export const selectCollectionsPreview = createSelector(
  [selectShopCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
    //collections => Object.keys(collections).map(key => collection[key])
  )