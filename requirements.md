# Functional requirements (FR)

## User

### Auth
1. User should be able to sign in with email
2. User should be able to sign in with google account
3. User should be able to sign in with facebook account
4. User should be able to create an account
5. User should be able to request a reset password link

### Profile
1. User should be able to change their profile picture
2. User should be able to update their profile data
3. User should be able to change their password

### Feedback
1. User should be able to send a feedback message

### Help request
1. User should be able to send a help request

### Notifications
1. User should be able to see all their notifications list
2. User should be able to see the notification details
3. User should be able to delete a notification

### Essences
1. User should be able to list all essences brands
2. User should be able to list all essences of a brand
3. User should be able to see the essence details
4. User should be able to favorite an essence
5. User should be able to list all their favorites essences
6. User should be able to list all essences reviews
7. User should be able to leave a rating with comment for the essence

### Mixes
1. User should be able to list all mixes flavor categories
2. User should be able to list all mixes of a flavor category
3. User should be able to see the mix details
4. User should be able to favorite a mix
5. User should be able to list all their favorites mixes

### Narguiles
1. User should be able to list all narguile item types
2. User should be able to list all items of a narguile item type
3. User should be able to see the narguile item details

<br/><br/>

## Admin

### Brands
1. Admin should be able to add an essence
2. Admin should be able to edit an essence
3. Admin should be able to delete an essence

### Essences
1. Admin should be able to list all essences
2. Admin should be able to list all essences by brand
3. Admin should be able to add an essence
4. Admin should be able to edit an essence
5. Admin should be able to delete an essence
6. Admin should be able to remove an essence review
7. Admin should be able to edit an essence review message

### Mixes
1. Admin should be able to list all mixes
2. Admin should be able to list all mixes by flavor category
3. Admin should be able to add a mix
4. Admin should be able to edit a mix
5. Admin should be able to delete a mix
6. Admin should be able to list all mix indications
7. Admin should be able to see the mix indication details

### Narguiles
1. Admin should be able to list all narguile items
2. Admin should be able to list all narguile items by type
3. Admin should be able to add a narguile item
4. Admin should be able to edit a narguile item
5. Admin should be able to delete a narguile item

### Flavor categories
1. Admin should be able to add a flavor category
2. Admin should be able to edit a flavor category
3. Admin should be able to delete a flavor category

### Narguile item types
1. Admin should be able to add a narguile item type
2. Admin should be able to edit a narguile item type
3. Admin should be able to delete a narguile item type

### Feedback
1. Admin should be able to list all feedback messages
2. Admin should be able to see the feedback message details

### Help request
1. Admin should be able to list all help requests
2. Admin should be able to see the help request details
3. Admin should be able to close a help request
4. Admin should be able to set a help request as resolved/unresolved

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

### Help request
1. User should not be able to send a help request without a message
2. User should not be able to send a help request without sign in

### Notifications
1. User should be able to see all their notifications list
2. User should be able to see the notification details
3. User should be able to delete a notification

### Essences
1. User should be able to list all essences brands
2. User should be able to list all essences of a brand
3. User should be able to see the essence details
4. User should be able to favorite an essence
5. User should be able to list all their favorites essences
6. User should be able to list all essences reviews
7. User should be able to leave a rating with comment for the essence

### Mixes
1. User should be able to list all mixes flavor categories
2. User should be able to list all mixes of a flavor category
3. User should be able to see the mix details
4. User should be able to favorite a mix
5. User should be able to list all their favorites mixes

### Narguiles
1. User should be able to list all narguile item types
2. User should be able to list all items of a narguile item type
3. User should be able to see the narguile item details

<br/><br/>

## Admin

### Brands
1. Admin should be able to add an essence
2. Admin should be able to edit an essence
3. Admin should be able to delete an essence

### Essences
1. Admin should be able to list all essences
2. Admin should be able to list all essences by brand
3. Admin should be able to add an essence
4. Admin should be able to edit an essence
5. Admin should be able to delete an essence
6. Admin should be able to remove an essence review
7. Admin should be able to edit an essence review message

### Mixes
1. Admin should be able to list all mixes
2. Admin should be able to list all mixes by flavor category
3. Admin should be able to add a mix
4. Admin should be able to edit a mix
5. Admin should be able to delete a mix
6. Admin should be able to list all mix indications
7. Admin should be able to see the mix indication details

### Narguiles
1. Admin should be able to list all narguile items
2. Admin should be able to list all narguile items by type
3. Admin should be able to add a narguile item
4. Admin should be able to edit a narguile item
5. Admin should be able to delete a narguile item

### Flavor categories
1. Admin should be able to add a flavor category
2. Admin should be able to edit a flavor category
3. Admin should be able to delete a flavor category

### Narguile item types
1. Admin should be able to add a narguile item type
2. Admin should be able to edit a narguile item type
3. Admin should be able to delete a narguile item type

### Feedback
1. Admin should be able to list all feedback messages
2. Admin should be able to see the feedback message details

### Help request
1. Admin should be able to list all help requests
2. Admin should be able to see the help request details
3. Admin should be able to close a help request
4. Admin should be able to set a help request as resolved/unresolved
