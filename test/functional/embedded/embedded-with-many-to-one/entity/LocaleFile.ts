import {File} from "./File";
import {ManyToOne} from "../../../../../src/decorator/relations/ManyToOne";


export class LocaleFile {
    
    @ManyToOne(type => File, {nullable: true, onDelete: "RESTRICT", onUpdate: "RESTRICT"})
    en: File;
    
    @ManyToOne(type => File, {nullable: true, onDelete: "RESTRICT", onUpdate: "RESTRICT"})
    fr: File;
    
}
