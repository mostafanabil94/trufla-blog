import 'reflect-metadata';
import {
    JsonController, Res, Get, QueryParam, Param
} from 'routing-controllers';
import { Author } from '../models/Author';

import { AuthorService } from '../services/AuthorService';

@JsonController('/author')
export class AuthorController {

    constructor(private authorService: AuthorService) {
    }

    // List Authors API
    /**
     * @api {get} /api/author/list-author List Authors API
     * @apiGroup Author
     * @apiHeader {String} Authorization
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
     *      "message": "list authors successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/author/list-author
     * @apiErrorExample {json} List Author error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/list-author')
    //  @Authorized('author')
     public async listAuthors(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['authorId', 'name', 'jobTitle', 'createdDate', 'modifiedDate'];
        const whereConditions =  [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];
        const authorList: any = await this.authorService.list(limit, offset, select, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all author List',
            data: authorList,
        };
        return response.status(200).send(successResponse);
    }

    // Get Authors API
    /**
     * @api {get} /api/author/get-author Get Authors API
     * @apiGroup Author
     * @apiHeader {String} Authorization
     * @apiParam (Request param) {Number} id id
     * @apiParamExample {json} Input
     * {
     *   "id": 10,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "get authors successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/author/get-author
     * @apiErrorExample {json} Get Author error
     * HTTP/1.1 500 Internal Server Error
     */
     @Get('/get-author/:id')
    //  @Authorized('author')
     public async getAuthors(@Param('id') id: number, @Res() response: any): Promise<any> {
        const author: Author = await this.authorService.findOne(id);
        if (!author) {
            const errorResponse: any = {
                status: 0,
                message: 'Could not find author.',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got author',
            data: author,
        };
        return response.status(200).send(successResponse);
    }
}
