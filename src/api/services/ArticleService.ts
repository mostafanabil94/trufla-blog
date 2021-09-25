import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Article } from '../models/Article';
import { ArticleRepository } from '../repositories/ArticleRepository';

@Service()
export class ArticleService {

    constructor(
        @OrmRepository() private articleRepository: ArticleRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find article
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find one article');
        return this.articleRepository.findOne(findCondition);
    }

    // article list
    public list(limit: number = 0, offset: number = 0, select: any = [], whereConditions: any = [], thumbsSort: number | boolean, count: number | boolean): Promise<any> {
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

        if (thumbsSort !== undefined) {
            if (thumbsSort === 1 || thumbsSort === true) {
                condition.order = {
                    thumbsUp: 'ASC',
                    createdDate: 'DESC',
                };
            } else {
                condition.order = {
                    thumbsUp: 'DESC',
                    createdDate: 'DESC',
                };
            }
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.articleRepository.count(condition);
        } else {
            return this.articleRepository.find(condition);
        }

    }

    // create article
    public async create(article: Article): Promise<Article> {
        this.log.info('Create a new article => ', article.toString());
        const newArticle = await this.articleRepository.save(article);
        return newArticle;
    }

    // update article
    public update(id: any, article: Article): Promise<Article> {
        this.log.info('Update a article');
        article.articleId = id;
        return this.articleRepository.save(article);
    }

    // delete article
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a article');
        const newArticle = await this.articleRepository.delete(id);
        return newArticle;
    }

    // find article
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all articles');
        return this.articleRepository.find(findCondition);
    }
}
