const getRecipientEmail = (users, userLoggedIn) => {  
    return users?.find(userToFilter => userToFilter !== userLoggedIn?.email)
  }

export default getRecipientEmail;