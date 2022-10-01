# Functional requirements (FR)

### Auth
1. User should be able to sign in with email
2. User should be able to sign in with google account
3. User should be able to create an account
4. User should be able to request a reset password link

### Profile
1. User should be able to change their profile picture
2. User should be able to update their profile data
3. User should be able to change their password

### Feedback
1. User should be able to send a feedback message
2. Admin should be able to list all feedback messages
3. Admin should be able to see the feedback message details
   
### Notifications
1. User should be able to see all their notifications list
2. User should be able to see the notification details
3. User should be able to delete a notification
4. User should be able to see all notifications as read

### Brands
1. Admin should be able to list brands
2. Admin should be able to add an brand
3. Admin should be able to edit an brand
4. Admin should be able to delete an brand

### Essences
1. User should be able to list all essences brands
2. User should be able to list all essences of a brand
3. User should be able to see the essence details
4. User should be able to favorite an essence
5. User should be able to unfavorite an essence
6. User should be able to list all their favorites essences
7. Admin should be able to list all essences
8. Admin should be able to add an essence
9. Admin should be able to edit an essence
10. Admin should be able to delete an essence

### Essences reviews
1. User should be able to list essences reviews
2. User should be able to leave a review for the essence
3. User should be able to edit their own comment
4. User should be able to remove their own comment
5. Admin should be able to remove any review
6. Admin should be able to edit any review message

### Narguiles
1. User should be able to list all narguile item types
2. User should be able to list all items of a narguile item type
3. User should be able to see the narguile item details
4. Admin should be able to add a narguile item
5. Admin should be able to edit a narguile item
6. Admin should be able to delete a narguile item

### Narguile item types
1. Admin should be able to add a narguile item type
2. Admin should be able to edit a narguile item type
3. Admin should be able to delete a narguile item type


# Business rules

## User
### Auth
1. User should not be able to sign in with invalid credentials
2. Invalid credentials message on sign in should be generic
3. User should not be able to create an account without all required fields
4. User should not be able to create an account with an email that is already in use
5. User should not be able to create an account if confirmation password is not equals to password


### Profile
1. User should not be able to change password data if current password is incorrect
2. User should not be able to change password data if confirmation password is not equals to new password
3. User should not be able to update the profile with an email that is already in use
4. User should not be able to update the profile data without all required fields
5. User should not be able to send a file instead a picture
6. User should not be able to send a picture that exceeds the maximum size

### Feedback
1. User should not be able to send a feedback without a message

### Essences reviews
1. Review message should be optional
2. User should not be able to leave two reviews for the same essence
3. User should not be able to leave a review message with bad words