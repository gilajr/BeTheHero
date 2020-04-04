const generateUniqueID = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should genmerate an unique ID', () => {
        const id = generateUniqueID();

        //Validações
        expect(id).toHaveLength(8);
    })
});