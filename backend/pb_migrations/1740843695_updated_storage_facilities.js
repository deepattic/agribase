/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1469214641")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "updateRule": null,
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1469214641")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "updateRule": "",
    "viewRule": null
  }, collection)

  return app.save(collection)
})
