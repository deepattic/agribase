/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1469214641")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "updateRule": null
  }, collection)

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number703710802",
    "max": null,
    "min": 0,
    "name": "current_utilization",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1469214641")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "updateRule": ""
  }, collection)

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number703710802",
    "max": null,
    "min": null,
    "name": "current_utilization",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
