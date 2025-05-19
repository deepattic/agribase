/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2294647506")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2063623452",
    "maxSelect": 3,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "approved",
      "pending",
      "rejected"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select820060103",
    "maxSelect": 3,
    "name": "subsidy_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "fertilizer",
      "seed",
      "equipment"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2294647506")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2063623452",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "approved",
      "pending",
      "rejected"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select820060103",
    "maxSelect": 1,
    "name": "subsidy_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "fertilizer",
      "seed",
      "equipment"
    ]
  }))

  return app.save(collection)
})
