import 'reflect-metadata';
import {
    JsonController, Res, Get, QueryParam, Param, Post, Body, Put
} from 'routing-controllers';
import { Article } from '../models/Article';
import { Comment } from '../models/Comment';

import { ArticleService } from '../services/ArticleService';
import { AuthorService } from '../services/AuthorService';
import { CommentService } from '../services/CommentService';
import { AddCommentRequest } from './requests/AddCommentRequest';

@JsonController('/article')
export class ArticleController {

    constructor(private articleService: ArticleService,
                private authorService: AuthorService,
                private commentService: CommentService) {
    }

    // Add Comment API
    /**
     * @api {post} /api/article/add-comment Add Comment API
     * @apiGroup Article
     * @apiParam (Request body) {Number} articleId articleId
     * @apiParam (Request body) {String} body body
     * @apiParamExample {json} Input
     * {
     *      "articleId" : "",
     *      "body" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your enquiry is sended successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/article/add-comment
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
     @Post('/add-comment')
     public async addComment(@Body({validate: true}) commentParam: AddCommentRequest, @Res() response: any): Promise<any> {
        const comment = new Comment();
        comment.articleId = commentParam.articleId;
        comment.body = commentParam.body;
        const commentSave = await this.commentService.create(comment);
        if (commentSave) {
            const successResponse: any = {
                status: 1,
                message: 'Comment Added successfully',
                data: commentSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Could not add comment',
                data: commentSave,
            };
            return response.status(400).send(errorResponse);
        }
     }

    // List Article Comments API
    /**
     * @api {get} /api/article/list-article-comments/:id List Article Comments API
     * @apiGroup Article
     * @apiHeader {String} Authorzation
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParamExample {json} Input
     * {
     *   "limit": 10,
     *   "offset": 0,
     *   "count": 0,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "list articles successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/article/list-article-comments/:id
     * @apiErrorExample {json} List Article error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/list-article-comments/:id')
    //  @Articleized('article')
     public async listArticleComments(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['body', 'createdDate', 'modifiedDate'];
        const whereConditions = [
            {
                name: 'articleId',
                op: 'where',
                value: id,
            },
        ];
        const articleList: any = await this.commentService.list(limit, offset, select, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all article List',
            data: articleList,
        };
        return response.status(200).send(successResponse);
    }

    // Add Thumbs Up API
    /**
     * @api {put} /api/article/add-thumbs-up/:id Add Thumbs Up API
     * @apiGroup Article
     * @apiParam (Request body) {Number} articleId articleId
     * @apiParamExample {json} Input
     * {
     *      "articleId" : "",
     *      "body" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thumbs up added successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/article/add-thumbs-up/:id
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
     @Put('/add-thumbs-up/:id')
     public async addThumbsUp(@Param('id') id: number, @Res() response: any): Promise<any> {
        const article = await this.articleService.findOne({ where: {articleId: id}});
        if (!article) {
            const errorResponse: any = {
                status: 0,
                message: 'Could not find article',
            };
            return response.status(400).send(errorResponse);
        }

        article.thumbsUp += 1;
        const articleSave = await this.articleService.create(article);

        if (articleSave) {
            const successResponse: any = {
                status: 1,
                message: 'Thumbs up added successfully',
                data: articleSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Could not add thumbs up',
            };
            return response.status(400).send(errorResponse);
        }
     }

    // List Articles API
    /**
     * @api {get} /api/article/list-article List Articles API
     * @apiGroup Article
     * @apiHeader {String} Authorzation
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count
     * @apiParamExample {json} Input
     * {
     *   "limit": 10,
     *   "offset": 0,
     *   "keyword": "Rowling",
     *   "count": 0,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "list articles successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/article/list-article
     * @apiErrorExample {json} List Article error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/list-article')
    //  @Articleized('article')
     public async listArticles(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('thumbsSort') thumbsSort: number | boolean, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['articleId', 'authorId', 'title', 'body', 'thumbsUp', 'createdDate', 'modifiedDate'];
        const whereConditions =  [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            },
            {
                name: 'body',
                op: 'like',
                value: keyword,
            },
        ];
        const articleList: any = await this.articleService.list(limit, offset, select, whereConditions, thumbsSort, count).then(async (val: any) => {
            const temp = val;
            const author = await this.authorService.findOne({ select: ['name'], where: {authorId: val.authorId}});
            temp.authorName = author;
            return temp;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all article List',
            data: articleList,
        };
        return response.status(200).send(successResponse);
    }

    // Get Articles API
    /**
     * @api {get} /api/article/get-article/:id Get Articles API
     * @apiGroup Article
     * @apiHeader {String} Authorization
     * @apiParam (Request param) {Number} id id
     * @apiParamExample {json} Input
     * {
     *   "id": 10,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "get articles successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/article/get-article/:id
     * @apiErrorExample {json} Get Article error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/get-article/:id')
    //  @Articleized('article')
     public async getArticles(@Param('id') id: number, @Res() response: any): Promise<any> {
        const article: Article = await this.articleService.findOne(id);
        if (!article) {
            const errorResponse: any = {
                status: 0,
                message: 'Could not find article.',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got article',
            data: article,
        };
        return response.status(200).send(successResponse);
    }
}
