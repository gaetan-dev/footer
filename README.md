# footer
Footer API (NodeJs + Sails)

## Models
### User
```json
{
	firstName,
	lastName,
	email,
	password
}
```

### Availability
```json
{
	date,
	hours,
	mode,
	user
}
```

## Elasticsearch update request
###User
@POST http://localhost:9200/footer/user/user:2/_update
```json
{"doc": {"role": "Admin"}}
```json
