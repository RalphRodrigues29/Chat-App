import { Avatar } from "@material-ui/core";
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";

/*function Chat({ id, users }) {
    return(<Container>
           <p>RecipientEmail</p>
        </Container>
    ); 
}*/

function Chat({ id, users }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const recipientQuery = query(
        collection(db, 'users'), 
        where('email', '==', getRecipientEmail(users, user))
    );

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }

    // Determine the recipient email
    //const recipientEmail = users.find((email) => email !== user.email);

    const [recipientSnapshot] = useCollection(recipientQuery);

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    return (
        <Container onClick={enterChat}>
            {recipient ?(
                <UserAvatar src={recipient?.photoURL} />

            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    );
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    word-break: break-word;
    border-bottom: 1px solid #f0f0f0;

    :hover {
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`  
  margin: 5px;  
  margin-right: 15px;  
`; 