import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import { Comment } from '../../api/models/Comment';
export class CreateComments implements Seed {
  public async seed(
    factory: Factory,
    connection: Connection
  ): Promise<Comment> {
    const em = connection.createEntityManager();
      const groupData: any = [
        {
            commentId: 1,
            body: 'J K Rollings',
            articleId: 1,
        },
        {
            commentId: 2,
            body: 'Charles Dickens',
            articleId: 2,
        },
        {
            commentId: 3,
            body: 'Friedrich Nietzsche',
            articleId: 3,
        },
        {
            commentId: 4,
            body: 'While we may come from different places and speak in different tongues, our hearts beat as one.',
            articleId: 1,
        },
        {
            commentId: 5,
            body: 'Oliver Twist has been the subject of numerous adaptations, including a highly successful musical, Oliver!, the multiple Academy Award-winning 1968 motion picture, and Disneys animated film Oliver & Company in 1988',
            articleId: 2,
        },
        {
            commentId: 6,
            body: 'Lets be honest. What doesnt kill you leaves you crippled',
            articleId: 3,
        },
      ];
    let i = 0;
    for ( i; i < groupData.length; i++ ) {
        const comment = new Comment();
        comment.commentId = groupData[i].commentId;
        comment.body = groupData[i].body;
        comment.articleId = groupData[i].articleId;
        await em.save(comment);
    }
    return groupData;
}
}
