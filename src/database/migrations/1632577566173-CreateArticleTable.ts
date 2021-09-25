import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateArticleTable1632577566173 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_author_tbl_article_foreignKey',
        columnNames: ['author_id'],
        referencedColumnNames: ['author_id'],
        referencedTableName: 'author',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'article',
            columns: [
                {
                    name: 'article_id',
                    type: 'int',
                    length: '5',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'title',
                    type: 'varchar',
                    length: '100',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'body',
                    type: 'text',
                    length: '2000',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'thumbs_up',
                    type: 'int',
                    length: '10',
                    default: 0,
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'author_id',
                    type: 'int',
                    length: '5',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('article');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('author_id') !== -1
        );
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('article');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('author_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
        await queryRunner.dropTable('article', true);
    }
}
