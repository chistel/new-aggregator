

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

4. By default, this would always pull news every 15 minutes via schedule, but if you want to pull manually, while in the laravel/backend terminal, run the following laravel artisan command
```bash
php artisan articles:fetch
```

5. Mailpit is used in the docker environment for local mail. to access it, Open `http://localhost:8025/` in your browser


## - The api documentation can be found in
`http://localhost/api/documentation`
