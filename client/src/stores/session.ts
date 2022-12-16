import { reactive } from "vue";
// import * as users from '../data/users'
import router from "../router/index"
import myFetch from "../services/myFetch";

const session = reactive({
    user: null as User | null,
    isAdmin: null as boolean | null,
});

export async function login(email: string, password: string) {
    const user = await myFetch<User>('users/auth', {email, password})
    if (!user) {
        router.push("/signup")
        throw { message: "User not found" }
    } else {
        session.user = user;
        if (user.isAdmin) {
            session.isAdmin = true;
            router.push('/manage');
        } else {
            router.push('/home');
        }

    }
}

export async function register(firstName: string, lastName: string, age: any, email: string, password: string){
    await  myFetch("users/register", { firstName, lastName, age, password, email});
}

export async function fetchUserExcercises(userId : string){
    return await  myFetch("excercises/"+userId);
}

export async function fetchUsers() {
    return await myFetch("users/register");
}

export async function addNewExcersise(userId: string, excercise: string, description: string){
    await myFetch("excercises", {userId, excercise, description });
}

export async function deleteUserById(userId: string){
    await myFetch("users/"+userId, {}, "DELETE");
}
export async function getUserComments(userId: string) {
    return await myFetch("comments/" + userId);
}
export async function addNewComment(commentTo: string, title: string,createdBy: string) {
    await myFetch("comments", { commentTo, title, createdBy });
}

export function logout() {
    session.user = null;
    session.isAdmin = null;
    router.push('/signin')
}

export class User {
    public email?: string;
    public password?: string;
    public _id?: string;
    public username: string;
    public isAdmin: boolean;
}


export default session;