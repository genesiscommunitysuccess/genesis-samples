#!/bin/bash
systemctl start postgresql-14
systemctl enable sshd.service
systemctl start sshd.service
su -c "startServer" - "dynamic-forms"
echo "Logged as dynamic-forms, starting server"
tail -f /dev/null