import {Column} from "../../../../../src/decorator/columns/Column";


export class LocaleString {
    
    @Column("varchar")
    en: string;
    
    @Column("varchar")
    fr: string;
    
}
