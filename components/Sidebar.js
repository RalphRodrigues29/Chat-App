import { Avatar, Button, IconButton} from "@material-ui/core";
import styled from "styled-components"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
//import { auth } from "firebase"
import { auth, db } from "../firebase";
//import { getAuth } from "firebase/auth";
import { collection, query, where, addDoc } from 'firebase/firestore';
import Chat from "./Chat";

function Sidebar() {
    //const auth = getAuth(app);
    //const [user] = useAuthState(auth);
    //const userChatRef = db.collection('chats').where('user', 'array-contains', user.email);  
    //const chatsSnapshot = userChatRef;
    const [user] = useAuthState(auth);
    const userChatRef = query(
        collection(db, 'chats'),
        where('users', 'array-contains', user.email)
    );
    const [chatsSnapshot] = useCollection(userChatRef);

/*const createChat = async () => {
        const input = prompt('Please enter an email address for the user that you want to chat with'
        );

        if(!input) return null;

        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            await addDoc(collection(db, 'chats'), {
                users: [user.email, input],
            });
        }
    };*/

    const createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user that you want to chat with"
    );

    if (!input) return null;

    // Check if email is valid, chat does not already exist, and is not the user's own email
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      try {
        await addDoc(collection(db, "chats"), {
          users: [user.email, input],
        });
        alert(`Chat with ${input} created successfully!`);
      } catch (error) {
        console.error("Error creating chat:", error);
        alert("Failed to create chat. Please try again.");
      }
    } else {
      if (!EmailValidator.validate(input)) {
        alert("Please enter a valid email address.");
      } else if (chatAlreadyExists(input)) {
        alert("Chat with this user already exists.");
      } else if (input === user.email) {
        alert("You cannot create a chat with yourself.");
      }
    }
  };


    
    // / This checks if chat is already there
    /*const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) => 
            chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );*/
    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.some((chat) =>
          chat.data().users.includes(recipientEmail)
        );
    

    return(
        <Container>
            <Header>
               <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()}/>
   
                <IconsContainer>
                    <IconButton>
                        <ChatIcon color="primary" />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon color="primary"/>
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats"/>
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {/* List of Chats*/}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}
        </Container>
    )
}

export default Sidebar;

// Sidebar.js

const Container = styled.div`

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  //align-items: center;
  background-color: white; 
  //border-right: 1px solid #f0f0f0; 

  -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

`;


const Search = styled.div`
  display:flex;
  align-items:center;
  padding:20px;
  border-radius:2px
`;

const SidebarButton = styled(Button)`
  

  &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;}
`;

const SearchInput = styled.input`
  outline-width:0px;
  border:none;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: 'white';
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;

:hover{
    opacity: 0.8;
}

`;

const IconsContainer = styled.div``; 

