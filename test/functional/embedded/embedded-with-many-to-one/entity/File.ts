import {PrimaryGeneratedColumn} from "../../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Entity} from "../../../../../src/decorator/entity/Entity";
import {Column} from "../../../../../src/decorator/columns/Column";


@Entity()
export class File {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "varchar", nullable: true})
    name: string;
    
}
