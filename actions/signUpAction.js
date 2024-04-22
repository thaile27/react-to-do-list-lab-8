"use server";
import { redirect } from "next/navigation";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase/firebaseInit";
import { resolve } from "styled-jsx/css";

async function signUpAction(formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  // firebase sdk issue....
  try {
    const userObj = await createNewUser(email, password);
    redirect("/demo");
  } catch (error) {
    console.log(error);
  }

  return null;
}

export { signUpAction };

async function createNewUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}


/*
             REDIRECT NOT WORKING
			 PROMISE LIKE
createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// user credentials that it  created uid..., username, photo, phonenubmer, validated
			const user = userCredential.user
			console.log(user)
			// on success rediret to the /demo
			// next/navigation/redirect
			redirect('/demo')
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message

			console.log(errorCode, errorMessage)
		})
*/

/*
        NEXT.js Server Action (PHP NOT!)
        The page doesn't reload.......????
        fn() must be async client - server - client
                            form -  serverAction - redirect on success

        1. Call the firebase createuser(auth, email, password)

        2. Sign In   signInwith(auth, email, password)
           Google, GitHub sign up providers (video...)

        3. Demo Page
           Protected Route only authenticated users get access. (video)
*/
