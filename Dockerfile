FROM node:11


# Create app directory
WORKDIR /app

# Copy local source to /app
COPY . .

# Get node modules
RUN npm install

EXPOSE 4242
CMD DEBUG="http,goeasy-tracker:*" PORT=4242 npm start
