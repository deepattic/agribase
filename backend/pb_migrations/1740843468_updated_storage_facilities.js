/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1469214641")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "listRule": null,
    "updateRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1469214641")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "listRule": "",
    "updateRule": null
  }, collection)

  return app.save(collection)
})
