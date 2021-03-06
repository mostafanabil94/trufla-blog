define({ "api": [
  {
    "type": "get",
    "url": "/api/article/get-article/:id",
    "title": "Get Articles API",
    "group": "Article",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request param": [
          {
            "group": "Request param",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": 10,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"get articles successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/article/get-article/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Get Article error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ArticleController.ts",
    "groupTitle": "Article",
    "name": "GetApiArticleGetArticleId"
  },
  {
    "type": "get",
    "url": "/api/article/list-article",
    "title": "List Articles API",
    "group": "Article",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorzation",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"keyword\": \"Rowling\",\n  \"count\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"list articles successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/article/list-article"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Article error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ArticleController.ts",
    "groupTitle": "Article",
    "name": "GetApiArticleListArticle"
  },
  {
    "type": "get",
    "url": "/api/article/list-article-comments/:id",
    "title": "List Article Comments API",
    "group": "Article",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorzation",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"count\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"list articles successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/article/list-article-comments/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Article error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ArticleController.ts",
    "groupTitle": "Article",
    "name": "GetApiArticleListArticleCommentsId"
  },
  {
    "type": "post",
    "url": "/api/article/add-comment",
    "title": "Add Comment API",
    "group": "Article",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "articleId",
            "description": "<p>articleId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>body</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"articleId\" : \"\",\n     \"body\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your enquiry is sended successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/article/add-comment"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Enquiry error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ArticleController.ts",
    "groupTitle": "Article",
    "name": "PostApiArticleAddComment"
  },
  {
    "type": "put",
    "url": "/api/article/add-thumbs-up/:id",
    "title": "Add Thumbs Up API",
    "group": "Article",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "articleId",
            "description": "<p>articleId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"articleId\" : \"\",\n     \"body\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thumbs up added successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/article/add-thumbs-up/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Enquiry error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ArticleController.ts",
    "groupTitle": "Article",
    "name": "PutApiArticleAddThumbsUpId"
  },
  {
    "type": "get",
    "url": "/api/author/get-author",
    "title": "Get Authors API",
    "group": "Author",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request param": [
          {
            "group": "Request param",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": 10,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"get authors successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/author/get-author"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Get Author error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AuthorController.ts",
    "groupTitle": "Author",
    "name": "GetApiAuthorGetAuthor"
  },
  {
    "type": "get",
    "url": "/api/author/list-author",
    "title": "List Authors API",
    "group": "Author",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"limit\": 10,\n  \"offset\": 0,\n  \"keyword\": \"Rowling\",\n  \"count\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"list authors successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/author/list-author"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Author error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AuthorController.ts",
    "groupTitle": "Author",
    "name": "GetApiAuthorListAuthor"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/public/apidoc/main.js",
    "group": "E__Playground_Trufla_trufla_blog_src_public_apidoc_main_js",
    "groupTitle": "E__Playground_Trufla_trufla_blog_src_public_apidoc_main_js",
    "name": ""
  }
] });
