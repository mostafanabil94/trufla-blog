import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Author } from '../models/Author';
import { AuthorRepository } from '../repositories/AuthorRepository';

@Service()
export class AuthorService {

    constructor(
        @OrmRepository() private authorRepository: AuthorRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find author
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find one author');
        return this.authorRepository.findOne(findCondition);
    }

    // author list
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
            return this.authorRepository.count(condition);
        } else {
            return this.authorRepository.find(condition);
        }

    }

    // create author
    public async create(author: Author): Promise<Author> {
        this.log.info('Create a new author => ', author.toString());
        const newAuthor = await this.authorRepository.save(author);
        return newAuthor;
    }

    // update author
    public update(id: any, author: Author): Promise<Author> {
        this.log.info('Update a author');
        author.authorId = id;
        return this.authorRepository.save(author);
    }

    // delete author
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a author');
        const newAuthor = await this.authorRepository.delete(id);
        return newAuthor;
    }

    // find author
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all authors');
        return this.authorRepository.find(findCondition);
    }
}
