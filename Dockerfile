FROM node:8.9.1-slim

COPY ./src /var/www/html/
WORKDIR /var/www/html

#RUN rm -rf node_modules && rm /root/.npmroc && npm set progress=false && npm i
RUN rm -rf node_modules && ls /root/ && npm config set -g proxy http://suzukikenj:MEronpan!1127@10.100.200.20:8080/ && npm config set -g http_proxy http://suzukikenj:MEronpan!1127@10.100.200.20:8080/ && npm config set -g https_proxy https://suzukikenj:MEronpan!1127@10.100.200.20:8080/ && npm config set -g HTTP_PROXY http://suzukikenj:MEronpan!1127@10.100.200.20:8080/ && npm config set -g HTTPS_PROXY https://suzukikenj:MEronpan!1127@10.100.200.20:8080/ && npm config set -g registry http://registry.npmjs.org/ && npm set progress=false && npm i

EXPOSE 10001

CMD ["npm", "run", "start"]
#ENTRYPOINT [ "make","start" ]


