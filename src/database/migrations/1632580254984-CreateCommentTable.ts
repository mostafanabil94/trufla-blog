import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateCommentTable1632580254984 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_article_tbl_comment_foreignKey',
        columnNames: ['article_id'],
        referencedColumnNames: ['article_id'],
        referencedTableName: 'article',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'comment',
            columns: [
                {
                    name: 'comment_id',
                    type: 'int',
                    length: '5',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'body',
                    type: 'text',
                    length: '2000',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'article_id',
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
        const ifExsist = await queryRunner.hasTable('comment');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('article_id') !== -1
        );
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('comment');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('article_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
        await queryRunner.dropTable('comment', true);
    }
}
