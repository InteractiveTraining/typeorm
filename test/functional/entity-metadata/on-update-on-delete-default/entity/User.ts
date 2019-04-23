import {Column} from "../../../../../src/decorator/columns/Column";
import {PrimaryGeneratedColumn} from "../../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Entity} from "../../../../../src/decorator/entity/Entity";
import {OneToMany} from "../../../../../src";
import {Post} from "./Post";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

}
