import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
// import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../decorators/Logger';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
        // @OrmRepository() private adminRepository: AdminRepository
    ) { }

    public async parseBasicAuthFromRequest(req: express.Request): Promise<number> {
        console.log('hi');
        const authorization = req.header('authorization');

        console.log(authorization);
        console.log(authorization.split(' ')[0]);

        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            console.log('Credentials provided by the client');
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            }
            console.log(authorization.split(' ')[1]);

            const AdminId = await this.decryptToken(authorization.split(' ')[1]);

            return AdminId;
            console.log('I m here');
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async decryptToken(encryptString: string): Promise<number> {
        return new Promise<number>((subresolve, subreject) => {
            jwt.verify(encryptString, '123##$$)(***&', {ignoreExpiration: true }, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return subresolve(undefined);
                }
                console.log(decoded);
                return subresolve(decoded.id);
            });
        });
    }

    // public async validateAdmin(adminId: number): Promise<Admin> {
    //     console.log('adminId' + adminId);
    //     const admin = await this.adminRepository.findOne({
    //         where: {
    //             adminId,
    //         },
    //     });
    //     console.log(admin);

    //     if (admin) {
    //         return admin;
    //     }

    //     return undefined;
    // }

    // public async validateAuthor(authorId: number): Promise<Admin> {
    //     console.log('authorId' + authorId);
    //     const author = await this.authorRepository.findOne({
    //         where: {
    //             authorId,
    //         },
    //     });
    //     console.log(author);

    //     if (author) {
    //         return author;
    //     }

    //     return undefined;
    // }
}
