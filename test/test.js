const assert = require('assert');
const semvernpmview = require("../index.js");
const chai = require('chai');

describe('semver-npmview', function() {
 
    describe('#getLatest()', function() {
        
        it('should return latest major version when no version given', function() {
            chai.expect(semvernpmview.getLatest("package")).to.equal('1.0.0');
        });
        
        describe("When given an argument of the format '0.x'", function(){

            it('should return the latest minor number for the 0 major version', function() {
                return semvernpmview.getLatest("crapexample", "1.0.0", "alpha")
                    .then((result) => {
                        chai.expect(result).to.not.be.undefined;
                    })
                    .catch((error) => {
                        chai.expect(error).to.be.undefined;
                    })
            });

        });

        describe("When given an argument of the format '1.2.x'", function(){

            it('should return the latest patch number for the 1.2 major.minor version', function() {
                chai.expect(semvernpmview.getLatest("package", "1.2.x")).to.equal('1.2.9');
            });

        });

        describe("When given arguments of version number and pre-release tag '1.2.3', 'alpha'", function(){

            it('should return the latest alpha version of the tag specified', function() {
                chai.expect(semvernpmview.getLatest("package", "1.2.3", "alpha")).to.equal('1.2.9-alpha.3');
            });

        });

        describe("When given arguments of version number and pre-release tag '1.2.3', 'beta'", function(){

            it('should return the latest alpha version of the tag specified', function() {
                chai.expect(semvernpmview.getLatest("package", "1.2.3", "beta")).to.equal('1.2.9-beta.2');
            });

        });

        describe("When given arguments of version number and pre-release tag '1.2.3', 'rc'", function(){

            it('should return the latest alpha version of the tag specified', function() {
                chai.expect(semvernpmview.getLatest("package", "1.2.3", "rc")).to.equal('1.2.9-rc.1');
            });

        });

        describe("When given an argument that doesn't match any known version", function(){
           
            it('should return an empty string', function(){
                chai.expect(semvernpmview.getLatest("package", "9.9.9")).to.equal("");
            });

            describe("When given a nonexistent prerelease tag", function(){
                it('should return an empty string', function(){
                    chai.expect(semvernpmview.getLatest("package", "9.9.9", "alpha")).to.equal("");
                    chai.expect(semvernpmview.getLatest("package", "9.9.9", "beta")).to.equal("");
                    chai.expect(semvernpmview.getLatest("package", "9.9.9", "rc")).to.equal("");
                    chai.expect(semvernpmview.getLatest("package", "9.9.9", "userDefinedTag")).to.equal("");
                });
            })
        })

  });

});