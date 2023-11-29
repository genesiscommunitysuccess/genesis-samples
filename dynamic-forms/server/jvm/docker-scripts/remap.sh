#!/bin/bash
source /home/dynamic-forms/.bashrc
systemctl start postgresql-14

postgres_status=$(systemctl status postgresql-14)
echo $postgres_status
postgres_error=$(echo "$postgres_status" | grep -E "failed|inactive")
if [[ ! -z "postgres_error" ]]
then
systemctl restart postgresql-14
fi

until PGPASSWORD="postgres" psql -h "$host" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

systemctl status postgresql-14

su -c "source /home/dynamic-forms/.bashrc ; yes | remap --commit" - "dynamic-forms"
su -c "JvmRun global.genesis.environment.scripts.SendTable -t USER -f /home/dynamic-forms/run/site-specific/data/user.csv" - "dynamic-forms"

echo "remap done"