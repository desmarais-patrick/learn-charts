import expect from "./Expect.js";
import HtmlLogger from "./HtmlLogger.js";

export default class Main {
    constructor(document, rootNodeId) {
        this.logger = new HtmlLogger({
            document,
            rootNodeId
        });
    }

    run() {
        console.log("Hello from Learn Charts!");

        const startTime = new Date();
        this.logger.log("Tests have started");
        this.logger.log("---");

        const testScriptOptions = {
            expect,
            
        }
    }
}

// Start 
console.log("Hello from Learn Charts!");

var startTime = new Date();
testHtmlLogger.log("Tests have started");
testHtmlLogger.log("---");

// Run each test
var testScriptOptions = {
    expect: expect,
    testSuiteBuilder: testSuiteBuilder,

    // Test helpers.
    createSortableFakeObject: createSortableFakeObject,
    xmlHttpRequestMock: xmlHttpRequestMock,
    xmlHttpRequestMock2: xmlHttpRequestMock2
};
var testSuites = [];
Notes.test.testScripts.forEach(function (testScript) {
    var testSuite = testScript(testScriptOptions);
    testSuites.push(testSuite);
});

// Wait to finish
setTimeout(function () {
    var stopTime = new Date();
    var duration = stopTime.getTime() - startTime.getTime();
    var formattedDuration = duration > 1000 ?
        (duration / 1000) + "s" : 
        duration + "ms";
    testHtmlLogger.log("---");
    testHtmlLogger.log("Tests completed in " + formattedDuration);
}, testTimeoutInMillis);