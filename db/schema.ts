import {sqliteTable,integer,text} from "drizzle-orm/sqlite-core";

export const taskTable=sqliteTable('tasks',{
    id:integer('id',{mode: "number"}).primaryKey({autoIncrement:true}).notNull(),
    title:text('title',{mode: 'text'}).unique().notNull(),
    description:text('description',{mode: 'text'}),
    completed:integer('completed',{mode:'boolean'}).default(false),
    created_at:integer('created_at',{mode:'timestamp'}).default(new Date()),
    due_date:integer('due_date',{mode:'timestamp'}),
    list_id:integer('list_id',{mode:'number'}).default(1).notNull()
})

export const ListTable=sqliteTable('lists',{
    id:integer('id',{mode:'number'}).primaryKey({autoIncrement:true}).notNull(),
    title:text('title',{mode:'text'}).unique().notNull()
})