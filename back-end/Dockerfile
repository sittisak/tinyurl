FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# From current dir to workdir in container.
COPY . .
RUN npm run build

# Open port 3000 in container
EXPOSE 3000
# Run server
CMD [ "npm", "start" ]
