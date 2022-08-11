Educational Project made with SolidJS <!-- omit in toc -->
=

- [PG stuff](#pg-stuff)
  - [Login to psql](#login-to-psql)
  - [Log files](#log-files)
  - [Config files](#config-files)
  - [User](#user)
    - [List all user](#list-all-user)
- [Credits](#credits)
  - [APIs:](#apis)

___
___



# PG stuff

## Login to psql
```bash
sudo -u postgres psql postgres
```

## Log files
`/var/log/postgresql` 

## Config files 
postgres=# SHOW config_file

`/etc/postgresql/12/main`

## User
[https://phoenixnap.com/kb/postgres-create-user](https://phoenixnap.com/kb/postgres-create-user)
```bash

sudo -u postgres createuser --interactive
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

### List all user 
\du+


```bash
sudo netstat -tulpen | grep -v 127.0.0.1 
```
# Credits
## APIs:
- https://excuser.herokuapp.com/v1/excuse/office
- https://api.chucknorris.io/jokes/random
- https://uselessfacts.jsph.pl/random.json?language=en
