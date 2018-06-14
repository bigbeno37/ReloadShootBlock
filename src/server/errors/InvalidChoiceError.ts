export default class InvalidChoiceError extends Error {
    constructor(message: string) {
        super(message);

        this.name = 'InvalidChoiceError';
    }
}