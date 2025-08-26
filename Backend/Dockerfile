FROM node:20-alpine

WORKDIR /backend

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

RUN npm install
# RUN npm install -g nodemon

# Copy the rest of the app
COPY . .

# EXPOSE 5000 Optional

CMD ["npm", "run", "start"]
