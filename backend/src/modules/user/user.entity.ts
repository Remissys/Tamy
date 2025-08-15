import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core'

@Entity()
export class User {
    @PrimaryKey()
    id!: number

    @Property()
    name!: string

    @Property()
    email!: string

    @Property()
    password!: string

    @Property()
    created: Date = new Date() 
}