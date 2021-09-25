import 'reflect-metadata';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class AddCommentRequest {
    @IsNotEmpty({
        message: 'articleId is required',
    })
    @IsInt()
    public articleId: number;

    @IsNotEmpty({
        message: 'body is required',
    })
    @IsString()
    public body: string;
}
