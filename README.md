# Location based services application front-end.

## Project setup
Copy `.env.example` to `.env.local`
```bash
cp .env.example .env.local
```

Install dependencies
```bash
yarn install
```

### Clone back-end api
The back-end api is a private repository. There isn't a pubic endpoint yet. Please contact me if you would like a copy.

Add api url to `.env.example`

```
VUE_APP_API=https://spotit.api/
```

### Environment configuration

#### Add Google Apis
Create a new google api project. Then, add the oath client id and api key to `.env.local`
```
VUE_APP_MAPS_KEY=
VUE_APP_GOOGLE_OAUTH_CLIENT_ID=
```

#### Custom domain (optional)
Add hostname to `.env.local`
```
VUE_APP_HOST=spotit.local
```

Add hostname to `/etc/hosts`
```
127.0.0.1	   spotit.local
```


#### Create certification (recommended)
For local developement with ssl:

Create certification in `./cert`.
```bash
# todo
```

Add certification file name to `.env.local`

```
VUE_APP_CERT=spotit.local+3
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Run your tests

```bash
yarn run test
```

### Lints and fixes files

```bash
yarn run lint
```

### Run your end-to-end tests

```bash
yarn run test:e2e
```

### Run your unit tests

```bash
yarn run test:unit
```



