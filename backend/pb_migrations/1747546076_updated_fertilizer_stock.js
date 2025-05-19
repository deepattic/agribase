/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2894842676")

  // remove field
  collection.fields.removeById("text3051925876")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number3051925876",
    "max": null,
    "min": null,
    "name": "capacity",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2894842676")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3051925876",
    "max": 0,
    "min": 0,
    "name": "capacity",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number3051925876")

  return app.save(collection)
})
