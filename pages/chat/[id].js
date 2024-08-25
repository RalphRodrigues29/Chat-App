import ChatScreen from '@/components/ChatScreen';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { getFirestore, collection, doc, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, app, } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '@/utils/getRecipientEmail';

const Chat = ({chat, messages}) => {
    const[user] =useAuthState(auth);


return (
    <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Sidebar />
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages}/>
        </ChatContainer>
    </Container>
        )
}

export default Chat;

const db = getFirestore(app);

export async function getServerSideProps(context) {
    const chatRef = doc(collection(db, "chats"), context.query.id);

    // PREP the messages on the server
    const messagesQuery = query(collection(chatRef, "messages"), orderBy("timestamp", "asc"));
    const messagesRes = await getDocs(messagesQuery);

    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }));

    // PREP the chats
    const chatRes = await getDoc(chatRef);
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };

    //console.log(chat, messages);

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}

const Container = styled.div`
    display: flex;
    //background-color: #f5f5f5;
  //padding: 10px;
  //border-radius: 10px;
  width: 100%;
  height: 100vh;
  //box-sizing: border-box;
  `
  const ChatContainer= styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  `;