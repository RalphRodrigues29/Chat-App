import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../firebase";
import Login from "./login";
import { useEffect } from "react";
import Loading from "../components/Loading";

import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

const db = getFirestore(); // Initialize Firestore


function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);

    /*useEffect(() => {
        if (user) {
        db.collection("users").doc(user.uid).set(
            {
              email: user.email,
              lastSeen: FirebaseError.firestore.fieldValue.serverTimestamp(),
              photoURL: user.photoURL,
            },
            {merge:true}
        );
        }
    }
    )*/
    
    useEffect(() => {
        if (user) {
            const userRef = doc(collection(db, "users"), user.uid);
            setDoc(userRef, {
                email: user.email,
                lastSeen: serverTimestamp(), // Use serverTimestamp directly
                photoURL: user.photoURL,
            }, { merge: true });
        }
    }, [user]); // Add user to dependency array
    
    if(loading) return <Loading />
    if (!user) return <Login />

    return <Component {...pageProps} />;
}

export default MyApp;
