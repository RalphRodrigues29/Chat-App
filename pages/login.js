/*import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components"
import { auth, provider } from "../firebase"
//import { auth, provider } from "firebase/auth";

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return(
        <Container>
           <Head>
              <title>Login</title>
           </Head>

           <LoginContainer>
             <Logo 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png?20200503174721"
             />
             <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
           </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;
*/

import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase";

// Initialize the Auth and Provider outside of the component
//const auth = getAuth();
//const provider = new GoogleAuthProvider();

function Login() {
    // Sign in function using the updated Firebase SDK syntax
    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed in:", result.user);
        } catch (error) {
            console.error("Error during sign-in:", error);
            alert(error.message);
        }
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png?20200503174721"
                />
                <Button onClick={signIn} variant="outlined">
                    Sign in with Google
                </Button>
            </LoginContainer>
        </Container>
    );
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;