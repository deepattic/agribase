/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_4155943932",
        "hidden": false,
        "id": "relation323493163",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "farmer_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "number2392944706",
        "max": null,
        "min": null,
        "name": "amount",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
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
      },
      {
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
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text18589324",
        "max": 0,
        "min": 0,
        "name": "notes",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation3725765462",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "created_by",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "date1716685803",
        "max": "",
        "min": "",
        "name": "approved_date",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_2294647506",
    "indexes": [],
    "listRule": null,
    "name": "subsidies",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2294647506");

  return app.delete(collection);
})
