import { IsNotEmpty } from 'class-validator';
import moment from 'moment';
import {BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Article } from './Article';
import { BaseModel } from './BaseModel';

@Entity('comment')
export class Comment extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'comment_id' })
    public commentId: number;

    @IsNotEmpty()
    @Column({ name: 'article_id' })
    public articleId: number;

    @IsNotEmpty()
    @Column({ name: 'body' })
    public body: string;

    @ManyToOne(type => Article,  article => article.comment)
    @JoinColumn({name: 'article_id'})
    public article: Article;

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
