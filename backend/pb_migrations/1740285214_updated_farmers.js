/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155943932")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @request.auth.id = @request.body.agent"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155943932")

  // update collection data
  unmarshal({
    "createRule": ""
  }, collection)

  return app.save(collection)
})
