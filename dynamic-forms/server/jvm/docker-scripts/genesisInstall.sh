#!/bin/bash
source /home/dynamic-forms/.bashrc
systemctl start postgresql-14
su -c "source /home/dynamic-forms/.bashrc ; genesisInstall" - "dynamic-forms"
echo "genesisInstall done"