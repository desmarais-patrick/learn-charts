export default class HtmlLogger {
    constructor(document, rootNodeId) {
        this.document = document;
        this.rootNodeId = rootNodeId;
    }

    log(message) {
        const preTag = this.document.createElement("pre");
        preTag.innerText = message;
        this.document.getElementById(this.rootNodeId).appendChild(preTag);
    }
}
