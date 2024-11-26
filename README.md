

# News Aggregator Laravel & ReactJS

## - Project Running & Installation Guide (Docker)

**Please note that i have compiled the setup for this with a single command.**

First, kindly _clone/download_ the `repository` before proceeding further.

**Note**: Please ensure you have `docker` installed on your system.

1. Execute the following command in your terminal:
```bash
./project-setup
```

2. Open `http://localhost:3000` to browse through the *news-aggregator application*!

3. Execute the following command in you terminal to enable you access the laravel terminal
```bash
./docker/start backend-bash
```

4. If you want to pull the more articles, while in the laravel/backend terminal, run the following laravel artisan command
```bash
php artisan articles:fetch
```


## - The api documentation can be found in
`http://localhost/api/documentation`
