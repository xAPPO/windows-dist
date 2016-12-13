<?php
{
	"Users": {
		"admin": {
			"guestRole": "guest",
			"authenticatedRole": "authenticated",
			"onLoggedIn": null,
			"onLoggedOut": null,
			"id": "",
			"Fields": [
				{
					"dataRef": null,
					"description": "User name",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "c5e4b683-5e70-5720-c565-4485e7603a5e",
					"name": "Name",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "admin",
					"visible": true
				},
				{
					"dataRef": null,
					"description": "User Password",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "603df567-0ca9-316b-976d-ba17cd484b48",
					"name": "Password",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "admin",
					"visible": true
				},
				{
					"dataRef": null,
					"description": "User Role\/s",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "59f592a8-193f-69f4-b7d4-8e07008ebb8f",
					"name": "Role",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "ARRAY",
					"uid": -1,
					"value": [
						"admin"
					],
					"visible": true
				},
				{
					"dataRef": null,
					"description": "User additional permissions",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "b00a9d47-8324-0ffa-3598-bf56a2127835",
					"name": "Permissions",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "ARRAY",
					"uid": -1,
					"value": [
						"Read_Devices",
						"Write_script"
					],
					"visible": true
				},
				{
					"dataRef": null,
					"description": "Custom field added to User",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "657ef544-5c77-044f-21ba-5f029114a338",
					"name": "MyCustomField",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "",
					"visible": true
				}

			]
		}
	},
	"Roles": {
		"Device_Admin": {
			"id": "",
			"Fields": [
				{
					"dataRef": null,
					"description": "Role name",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "b95b43e7-1b48-ccd5-5b7e-838b46cb42a5",
					"name": "Name",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "Device_Admin",
					"visible": true
				},
				{
					"dataRef": null,
					"description": "Role permissions",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "98f9c60e-0db5-db54-61cb-3c5160e687d2",
					"name": "Permissions",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "ARRAY",
					"uid": -1,
					"value": [
						"Read_Devices",
						"Write_Devices"
					],
					"visible": true
				}
			]
		}
	},
	"Permissions": {
		"Read_Devices": {
			"id": "",
			"Fields": [
				{
					"dataRef": null,
					"description": "Permission name",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "70e70fc6-8735-b6ad-8ded-a95d2ebba670",
					"name": "Name",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "Read_Devices",
					"visible": true
				}
			]
		},
		"Write_Devices": {
			"id": "",
			"Fields": [
				{
					"dataRef": null,
					"description": "Permission name",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "355b67c3-5088-aa02-7910-39092dbdc173",
					"name": "Name",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "Write_Devices",
					"visible": true
				}
			]
		},
		"Write_script": {
			"id": "",
			"Fields": [
				{
					"dataRef": null,
					"description": "Permission name",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "482c2e2e-8639-0cc5-b390-27138b1d5ae5",
					"name": "Name",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "Write_script",
					"visible": true
				}
			]
		}
	},
	"Resources": {
		"articles": {
			"id": "",
			"Fields": [
				{
					"dataRef": null,
					"description": "Resource Name",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "9f41c407-d662-01b2-eb23-244667cc9092",
					"name": "Name",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "articles",
					"visible": true
				},
				{
					"dataRef": null,
					"description": "Resource Parent",
					"enabled": true,
					"flags": -1,
					"group": -1,
					"id": "fe4c3440-bb2c-ceeb-a1fc-633cbf840270",
					"name": "Parent",
					"order": -1,
					"params": null,
					"parentId": -1,
					"platform": null,
					"storeDestination": null,
					"title": "",
					"type": "STRING",
					"uid": -1,
					"value": "",
					"visible": true
				}
			]
		}
	}
}