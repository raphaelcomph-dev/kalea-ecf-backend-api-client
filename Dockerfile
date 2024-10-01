# Step 1: Use a Node.js base image
FROM node:20-alpine AS build

# Step 2: Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Step 3: Set the working directory
WORKDIR /app

# Step 4: Copy package.json and package-lock.json
COPY package*.json tsconfig*.json .env* ./

# Step 5: Install dependencies
RUN npm install

# Step 6: Copy the rest of the application code
COPY . .

# Step 7: Build the NestJS app
RUN nest build

# Step 8: Use a lightweight Node.js base image for production
FROM node:20-alpine AS production

# Step 9: Set the working directory
WORKDIR /app

# Step 10: Copy the build files and node_modules from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/.env* ./

# Step 11: Expose the port your NestJS app runs on (default 3000)
EXPOSE 8080

# Step 12: Start the application using the custom npm script
CMD ["npm", "run", "start:qa"]
