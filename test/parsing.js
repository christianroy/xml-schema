
describe('Parsing', function() {
    describe('Attributes', function() {
        it('should correctly extract from root', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                attributes: {
                    key: {}
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>')
            .should.eql({ key: "test" });
        });

        it('should correctly use specified name', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                attributes: {
                    key: { name:"key2" }
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key2="test"/>')
            .should.eql({ key: "test" });
        });

    });


    describe('Fields', function() {
        it('should correctly parse children', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                fields: {
                    key: {}
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>')
            .should.eql({ key: "test" });
        });

        it('should correctly parse array children', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                fields: {
                    key: {

                    }
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test 1</key><key>test 2</key></basic>')
            .should.eql({ key: ["test 1", "test 2"] });
        });

        it('should correctly parse CDATA', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                fields: {
                    key: {
                      cdata: true
                    }
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key><![CDATA[test]]></key></basic>')
            .should.eql({ key: "test" });
        });

        it('should not truncate text even if cdata option is used on non-cdata content', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                fields: {
                    key: {
                      cdata: true
                    }
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>')
            .should.eql({ key: "test" });
        });

        it('should correctly parse CDATA without skipping sibblings', function() {
            var xmlSchema = new XMLSchema({
                tag: "basic",
                fields: {
                    key: {
                      cdata: true
                    },
                    otherkey: {}
                }
            });

            xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key><![CDATA[test]]></key><otherkey>here!</otherkey></basic>')
            .should.eql({ key: "test", otherkey: "here!" });
        });
    });
});
