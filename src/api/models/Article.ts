import { IsNotEmpty } from 'class-validator';
import moment from 'moment';
import {BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Author } from './Author';
import { Comment } from './Comment';
import { BaseModel } from './BaseModel';

@Entity('article')
export class Article extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'article_id' })
    public articleId: number;

    @IsNotEmpty()
    @Column({ name: 'author_id' })
    public authorId: number;

    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;

    @IsNotEmpty()
    @Column({ name: 'body' })
    public body: string;

    @Column({ name: 'thumbs_up' })
    public thumbsUp: number;

    @ManyToOne(type => Author,  author => author.article)
    @JoinColumn({name: 'author_id'})
    public author: Author;

    @OneToMany(type => Comment, comment => comment.article)
    public comment: Comment[];

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
