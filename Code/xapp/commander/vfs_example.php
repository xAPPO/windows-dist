<?php
{
	"class": "cmx.types.Resources",
	"includes": [
	],
	"items": [
		{
			"class": "cmx.types.Resource",
			"type": "FILE_PROXY",
			"name": "root",
			"path": "%root%",
			"url": "NOT SET",
			"enabled": true,
			"label": "Root",
			"readOnly": true
		},
		{
			"class": "cmx.types.Resource",
			"type": "REMOTE_FILE_PROXY",
			"name": "ftp",
			"path": "ftp:\/\/",
			"url": "NOT SET",
			"adapter": "Ftp",
			"label": "ftp",
			"config": {
			"host": "pearls-media.com",
				"username": "mc007",
				"password": "pass",
				"port": 21,
				"root": "\/httpdocs\/CMAC\/89ab6993-031e-4818-bcbc-94bb8a2ba876\/",
				"passive": true,
				"ssl": false,
				"timeout": 5
			},
			"enabled": true,
			"readOnly": true
		},
		{
			"class": "cmx.types.Resource",
			"type": "REMOTE_FILE_PROXY",
			"name": "dropbox",
			"label": "Dropbox",
			"path": "dropbox:\/\/",
			"url": "NOT SET",
			"adapter": "Dropbox",
			"config": {
			"token": "token",
			"appname": "xapp_local"
			},
			"enabled": true,
			"readOnly": true
		},
		{
			"class": "cmx.types.Resource",
			"type": "REMOTE_FILE_PROXY",
			"name": "svn",
			"path": "svn:\/\/",
			"url": "NOT SET",
			"adapter": "WebDav",
			"config": {
			"host": "pearls-media.com",
				"baseUri": "https:\/\/pearls-media.com\/",
				"pathPrefix": "\/svn\/development\/",
				"userName": "mc007",
				"password": "pass"
			},
			"enabled": true,
			"readOnly": true
		}
	]
}