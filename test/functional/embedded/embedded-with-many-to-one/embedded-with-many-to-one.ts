import "reflect-metadata";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../utils/test-utils";
import {Connection} from "../../../../src/connection/Connection";
import {Post} from "./entity/Post";
import {expect} from "chai";
import {File} from "./entity/File";

describe("embedded > embedded-with-many-to-one", () => {
    
    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"]
    }));
    before(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));
    
    it("should have correct databaseName", () => Promise.all(connections.map(async function (connection) {
        const correctName = await connection.getMetadata(Post).columns.find(el => el.databaseName === "attachmentFrId");
        const inCorrectName = await connection.getMetadata(Post).columns.find(el => el.databaseName === "frId");
        expect(correctName).not.to.be.undefined;
        expect(inCorrectName).to.be.undefined;
    })));
    
    it("should be able to insert", () => Promise.all(connections.map(async function (connection) {
        const fileRepo = connection.getRepository(File);
        const postRepo = connection.getRepository(Post);
        
        const firstFile = await fileRepo.save({
            name: "Test File 1"
        });
        
        const secondFile = await fileRepo.save({
            name: "Test File 2"
        });
        
        const firstPost = await postRepo.insert({
            name: {
                en: "Test post 1",
                fr: "Test post 1 in fr"
            },
            body: {
                en: "Test post 1",
                fr: "Test post 1 in fr"
            },
            attachment: {
                en: firstFile,
                fr: secondFile
            }
        });
        
        expect(firstPost.raw.insertId).not.to.be.undefined;
    })));
    
    
    it("should be able to select", () => Promise.all(connections.map(async function (connection) {
        const postRepo = connection.getRepository(Post);
        const results = await postRepo.createQueryBuilder("post")
            .leftJoinAndSelect("post.attachment.en", "attachment")
            .getOne();
        
        expect(results!.attachment).not.to.be.undefined;
    })));
    
});
