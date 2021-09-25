import { IsNotEmpty } from 'class-validator';
import moment from 'moment';
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Article } from './Article';
import { BaseModel } from './BaseModel';

@Entity('author')
export class Author extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'author_id' })
    public authorId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'job_title' })
    public jobTitle: string;

    @OneToMany(type => Article, article => article.author)
    public article: Article[];

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
