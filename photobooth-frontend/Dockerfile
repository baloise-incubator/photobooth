# Use an official Node.js base image
FROM node:18 as build
# Set the working directory in the container
WORKDIR /workdir
# Copy package.json and package-lock.json to the container

COPY ./package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the application source code to the container
COPY . .
# Build the Angular application
RUN npm run build
# Use a lightweight NGINX base image for serving the built Angular application
FROM nginx:1.21.3-alpine
# Copy the built Angular application from the build stage to the NGINX container
COPY --from=build /workdir/dist /usr/share/nginx/html
# Expose the default NGINX port (80)
EXPOSE 80
# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
RUN mkdir -p /var/cache/nginx && chown nginx:nginx /var/cache/nginx
