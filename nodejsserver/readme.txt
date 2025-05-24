npm init
npm install nodemon bcrypt jsonwebtoken express mongoose body-parser


soun@soun-eMachines:~/workspace/godey/nodejsserver$ sudo systemctl restart vsftpd
soun@soun-eMachines:~/workspace/godey/nodejsserver$ sudo adduser sounftp
info: Adding user `sounftp' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group `sounftp' (1001) ...
info: Adding new user `sounftp' (1001) with group `sounftp (1001)' ...
info: Creating home directory `/home/sounftp' ...
info: Copying files from `/etc/skel' ...
New password: 
BAD PASSWORD: The password is shorter than 8 characters
Retype new password: 
Sorry, passwords do not match.
New password: 
BAD PASSWORD: The password is shorter than 8 characters
Retype new password: 
passwd: password updated successfully
Changing the user information for sounftp
Enter the new value, or press ENTER for the default
        Full Name []: LK
        Room Number []: 
        Work Phone []: 
        Home Phone []: 
        Other []: 
Is the information correct? [Y/n] Y
info: Adding new user `sounftp' to supplemental / extra groups `users' ...
info: Adding user `sounftp' to group `users' ...
