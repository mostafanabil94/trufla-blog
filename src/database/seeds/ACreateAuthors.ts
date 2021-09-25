import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import { Author } from '../../api/models/Author';
export class ACreateAuthors implements Seed {
  public async seed(
    factory: Factory,
    connection: Connection
  ): Promise<Author> {
    const em = connection.createEntityManager();
      const groupData: any = [
        {
            authorId: 1,
            name: 'J K Rollings',
            jobTitle: 'British Author',
        },
        {
            authorId: 2,
            name: 'Charles Dickens',
            jobTitle: 'Writer',
        },
        {
            authorId: 3,
            name: 'Friedrich Nietzsche',
            jobTitle: 'Philosopher',
        },
      ];
    let i = 0;
    for ( i; i < groupData.length; i++ ) {
        const author = new Author();
        author.authorId = groupData[i].authorId;
        author.name = groupData[i].name;
        author.jobTitle = groupData[i].jobTitle;
        await em.save(author);
    }
    return groupData;
}
}
