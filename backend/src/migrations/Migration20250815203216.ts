import { Migration } from '@mikro-orm/migrations';

export class Migration20250815203216 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`order_status\` (\`id\` integer not null primary key autoincrement, \`description\` text not null);`);

    this.addSql(`create table \`product_category\` (\`id\` integer not null primary key autoincrement, \`description\` text not null);`);

    this.addSql(`create table \`product\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`price\` real not null, \`category_id\` integer not null, \`deleted\` integer not null default false, constraint \`product_category_id_foreign\` foreign key(\`category_id\`) references \`product_category\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`product_category_id_index\` on \`product\` (\`category_id\`);`);

    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`email\` text not null, \`password\` text not null, \`created\` datetime not null);`);

    this.addSql(`create table \`order\` (\`id\` integer not null primary key autoincrement, \`user_id\` integer not null, \`price\` real not null, \`created\` datetime not null, \`status_id\` integer not null default 1, constraint \`order_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade, constraint \`order_status_id_foreign\` foreign key(\`status_id\`) references \`order_status\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`order_user_id_index\` on \`order\` (\`user_id\`);`);
    this.addSql(`create index \`order_status_id_index\` on \`order\` (\`status_id\`);`);

    this.addSql(`create table \`order_item\` (\`id\` integer not null primary key autoincrement, \`product_id\` integer not null, \`order_id\` integer not null, \`amount\` integer not null, constraint \`order_item_product_id_foreign\` foreign key(\`product_id\`) references \`product\`(\`id\`) on update cascade, constraint \`order_item_order_id_foreign\` foreign key(\`order_id\`) references \`order\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`order_item_product_id_index\` on \`order_item\` (\`product_id\`);`);
    this.addSql(`create index \`order_item_order_id_index\` on \`order_item\` (\`order_id\`);`);
  }

}
