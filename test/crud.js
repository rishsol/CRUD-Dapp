const { assert } = require("console");

const Crud = artifacts.require('Crud');

contract('Crud', () => {
    let crud = null;

    before (async () => {
        crud = await Crud.deployed();
    });
    
    it('adds a user to the users array', async () => {
        await crud.create('A');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'A');
    });

    it('updates existing users', async () => {
        await crud.update(1, 'Aa');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Aa');
    });

    it('throws an error when a user is not found', async () => {
        try {
            await crud.update(2, 'Aa');
        } catch (e)  {
            assert(e.message.includes('User does not exist'));
            return;
        }
        assert(false);
    });

    it('deletes an existing user', async () => {
        await crud.del(1);
        try {
            const user = await crud.read(1);
          } catch(e) {
            assert(e.message.includes('User does not exist!'));
            return;
          }
          assert(false);
    })

    it('does not delete non existing users', async () => {
        try {
            await crud.del(2);
          } catch(e) {
            assert(e.message.includes('User does not exist!'));
            return;
          }
          assert(false);
    });
});