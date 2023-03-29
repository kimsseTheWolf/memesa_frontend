FROM node:18

# Copy the source code
ADD ./dist ./App

# Set Working directory
WORKDIR /App

# Initial Programs
RUN npm install 

# Run the program
CMD npm run serve