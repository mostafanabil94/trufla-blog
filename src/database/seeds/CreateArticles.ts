import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import { Article } from '../../api/models/Article';
export class CreateArticles implements Seed {
  public async seed(
    factory: Factory,
    connection: Connection
  ): Promise<Article> {
    const em = connection.createEntityManager();
      const groupData: any = [
        {
            articleId: 1,
            authorId: 1,
            title: 'Harry Potter',
            body: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.',
            thumbsUp: 12,
        },
        {
            articleId: 2,
            authorId: 2,
            title: 'Oliver Twist',
            body: 'Oliver Twist; or, the Parish Boys Progress is Charles Dickenss second novel was published as a serial from 1837 to 1839, and as a three-volume book in 1838.Born in a workhouse, the orphan Oliver Twist is sold into apprenticeship with an undertaker. After escaping, Oliver travels to London, where he meets the "Artful Dodger", a member of a gang of juvenile pickpockets led by the elderly criminal Fagin.',
            thumbsUp: 5,
        },
        {
            articleId: 3,
            authorId: 3,
            title: 'Ouote',
            body: 'There are no beautiful surfaces without a terrible depth',
            thumbsUp: 2,
        },
      ];
    let i = 0;
    for ( i; i < groupData.length; i++ ) {
        const article = new Article();
        article.articleId = groupData[i].articleId;
        article.authorId = groupData[i].authorId;
        article.title = groupData[i].title;
        article.body = groupData[i].body;
        article.thumbsUp = groupData[i].thumbsUp;
        await em.save(article);
    }
    return groupData;
}
}
