import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Comment } from '../models/Comment';
import { CommentRepository } from '../repositories/CommentRepository';

@Service()
export class CommentService {

    constructor(
        @OrmRepository() private commentRepository: CommentRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find comment
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find one comment');
        return this.commentRepository.findOne(findCondition);
    }

    // comment list
    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.commentRepository.count(condition);
        } else {
            return this.commentRepository.find(condition);
        }

    }

    // create comment
    public async create(comment: Comment): Promise<Comment> {
        this.log.info('Create a new comment => ', comment.toString());
        const newComment = await this.commentRepository.save(comment);
        return newComment;
    }

    // update comment
    public update(id: any, comment: Comment): Promise<Comment> {
        this.log.info('Update a comment');
        comment.commentId = id;
        return this.commentRepository.save(comment);
    }

    // delete comment
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a comment');
        const newComment = await this.commentRepository.delete(id);
        return newComment;
    }

    // find comment
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all comments');
        return this.commentRepository.find(findCondition);
    }
}
