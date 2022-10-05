
# CF Workers & TailwindCSS Maintenance application

Simple application served by Cloudflare Workers which interupts requests to your server while maintenance in progress.

## Features

- TailwindCSS
- Cloudflare Workers
- Easy to use npm script which enables and disables page


## Deployment

To deploy this page run

```bash
npm install
npm run workers:deploy
```


## Page Customization

You can run `npm run watch` and start writing your TailwindCSS classes in `public/index.html`.
## How to enable maintenance mode?

* Deploy your page (`npm run workers:deploy`)
* Login your Cloudflare Dashboard
* Navigate to `maintenance-screen` worker -> `routes` section
* Enable wildcard routing for your zone (eg: `domain.dev/*` or `*.domain.dev/*`)

_Done, all your traffic will be routed to maintenance page._

## Enabling / Disabling screen using CLI
### Configuration
1. Add route to `wrangler.toml` (required for wrangler to rewrite routes after disable command)
``route = "domain.dev/maintanence"`` - define any unused url of your application
2. Edit `wrangler.enable.toml`. Adjust `routes` parameter, by default it handles all requests to root domain and all URI's
### Enabling
`npm run workers:enable` - deploys app && enables configured routes in `wrangler.enable.toml`

### Disabling
`npm run workers:disable` - deploys app && enables configured route in `wrangler.toml`

## Authors

- [@oleghalin](https://github.com/oleghalin)


## Screenshots

![Demo screenshot](./.github/assets/images/demo.png)
