// TODO Review if we should have a displayName and a typeName. Ex. Display name could be used to give a cue to creator what it represents.
export default class BaseFunction {
    constructor (name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getValue() {
        throw new Error("Abstract method: not overridden!");
    }
}
