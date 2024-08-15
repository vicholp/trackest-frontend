FROM node:22.6-alpine AS build

WORKDIR /app

USER 1000:1000

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
