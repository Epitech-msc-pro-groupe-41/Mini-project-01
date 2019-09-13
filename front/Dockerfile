# Use an official node runtime as a parent image
FROM node:lts-alpine

# Set the working directory
WORKDIR /front

#Copy the current directory contents into the container
COPY . .

# Install dependencies
RUN npm install

# The container listens on the specified network ports at runtime
EXPOSE 8080

# Run app when the container launches
CMD [ "npm", "start" ]