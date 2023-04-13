# Create Production Distribution
FROM node:18
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

# Create Server
FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 9000

# matthew is very cool!