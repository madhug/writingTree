"use strict";
    
    /*beforeAll(function(done) {
        Meteor.loginWithPassword('normal@tutorials.com','normal3210', done);
    }*/

    describe("Project", function () {
        it("should be created with provided title and name", function () {
            spyOn(Projects, "insert").and.callFake(function(doc, callback) {
                // simulate async return of id = "1";
                /*callback(null, "1");
                console.log('Here in spy');*/
                return "1";
            });

            spyOn(Nodes, "insert").and.callFake(function(doc, callback) {
                // simulate async return of id = "1";
                callback(null, "1");
            });
            var project = new Project({_title: "test title", _summary: "test summary"});

            expect(project.title).toBe("test title");
            expect(project.summary).toBe("test summary");

            //expect(console.log).toHaveBeenCalledWith(project);
            //expect(project.id).toEqual("1");
            
                
        })
    })
