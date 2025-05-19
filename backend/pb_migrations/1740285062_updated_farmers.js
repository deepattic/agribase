/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155943932")

  // update collection data
  unmarshal({
    "createRule": "",
    "listRule": "",
    "viewRule": ""
  }, collection)

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation646683805",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "agent",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155943932")

  // update collection data
  unmarshal({
    "createRule": null,
    "listRule": null,
    "viewRule": null
  }, collection)

  // remove field
  collection.fields.removeById("relation646683805")

  return app.save(collection)
})
