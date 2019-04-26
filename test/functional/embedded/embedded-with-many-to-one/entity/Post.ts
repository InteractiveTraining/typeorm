import {PrimaryGeneratedColumn} from "../../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Entity} from "../../../../../src/decorator/entity/Entity";
import {Column} from "../../../../../src/decorator/columns/Column";
import {LocaleString} from "./LocaleString";
import {LocaleFile} from "./LocaleFile";

@Entity()
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column(type => LocaleString)
    name: LocaleString;
    
    @Column(type => LocaleString)
    body: LocaleString;
    
    @Column(type => LocaleFile)
    attachment: LocaleFile;
}
