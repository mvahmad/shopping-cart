"use server"
//server actions

import { signIn , signOut} from "@/auth";

export const loginGithub = async() => {
   await signIn("github" ,{redirectTo:"/"})
}

export const logoutGithub = async() => {
   await signOut({redirectTo:"/"})
}