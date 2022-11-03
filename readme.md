<h1 align="center">LogSheaf</h1>

> Docker image for generation random amount of logs per interval. Amount of loggers and interval can be customized.

## Demo

`logsheaf` can generate stream of logs with random payload. It can be used for load testing of some logging systems.

<p align="center">
  <img width="700" align="center" src="https://user-images.githubusercontent.com/35937082/199632134-87d6c987-0a99-4732-8a76-98e56b5a4109.gif" alt="demo"/>
</p>

## Usage

`logsheaf` is only available via docker image.

```sh
docker pull ghcr.io/yoyrandao/logsheaf:main

docker run -p <YOUR_PORT>:8080 -d ghcr.io/yoyrandao/logsheaf:main
```

## Author

👤 **Ilya Gubanov**

- Github: [@yoyrandao](https://github.com/yoyrandao)

## License

Copyright © 2022 [Ilya Gubanov](https://github.com/yoyrandao).<br />
This project is [MIT](https://github.com/yoyrandao/logsheaf/blob/main/LICENSE) licensed.
