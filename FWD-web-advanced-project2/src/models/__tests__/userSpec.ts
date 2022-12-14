import UserModel from '../users.model';
import db from '../../database'
import User from '../../types/users_type';


const userModel = new UserModel();
// let user:User ;

describe('User Model', ()=> {
    describe('Test methods exists', () =>{
        expect(userModel.getMany).toBeDefined();
    });
    it('should have a get one user method', ()=> {
        expect(userModel.getOne).toBeDefined();
    });
    it('should have a create user method', ()=> {
        expect(userModel.create).toBeDefined();
    });
    it('should have an update user method', ()=> {
        expect(userModel.updateOne).toBeDefined();
    });
    it('should have a delete user method', ()=> {
        expect(userModel.deleteOne).toBeDefined();
    });
    it('should have an Authenticate user method', ()=> {
        expect(userModel.updateOne).toBeDefined();
    });


describe('Test User Model Logic', ()=>{
    const user={
        email:'test1@test.com',
        user_name:'testUser',
        first_name:'test',
        last_name:'user',
        password:'test123',
    } as User;

    beforeAll(async()=>{
        const createUser =await userModel.create(user);
        user.id = createUser.id;
    });
    beforeAll(async()=>{
        const connection = await db.connect();
        const sql ='DELETE FROM Users;';
        await connection.query(sql);
        connection.release();
    });
    it('Create method should return anew user', async ()=>{
        const createUser =await userModel.create({
            email:'test2@test.com',
            user_name:'testUser',
            first_name:'test',
            last_name:'user',
            password:'test123',
        }as User);
        expect(createUser).toEqual({
            email:'test2@test.com',
            user_name:'testUser',
            first_name:'test',
            last_name:'user',
            password:'test123',
        }as User);
    });
    
    it('Get many method should return All available users in database', async () =>{
        const users = await userModel.getMany();
        expect(users.length).toBe(2);
    });
    
    it('Get One method should return test user when called with id', async() =>{
        const returnOneUser = await userModel.getOne(user.id as string);
        expect(returnOneUser.id).toBe(user.id);
        expect(returnOneUser.email).toBe(user.email);
        expect(returnOneUser.user_name).toBe(user.user_name);
        expect(returnOneUser.first_name).toBe(user.first_name);
        expect(returnOneUser.last_name).toBe(user.last_name);
    });
    
    it('method update one user by id', async() =>{
        const returnOneUser = await userModel.updateOne({
            ...user,
            user_name:'test update',
            first_name:'test',
            last_name:'update'
        });
        expect(returnOneUser.id).toBe(user.id);
        expect(returnOneUser.email).toBe(user.email);
        expect(returnOneUser.user_name).toBe('test update');
        expect(returnOneUser.first_name).toBe('test');
        expect(returnOneUser.last_name).toBe('update');
    });
    
    it('Delete one user', async () => {
        const deleteUser = await userModel.deleteOne(user.id as string);
        expect(deleteUser.id).toBe(user.id); 
    });
    

});

});