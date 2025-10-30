# Use the official Nginx image as base
FROM nginx:alpine

# Metadata label for context
LABEL maintainer="Gemini Assistant"

# Remove the default Nginx content and configuration in a single command
# This creates fewer layers and improves build efficiency.
RUN rm -rf /usr/share/nginx/html/* && \
    rm /etc/nginx/conf.d/default.conf

# Copy your static assets to the Nginx web root
# Ensure index.html, styles.css, and script.js exist in the build context.
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Copy the custom Nginx configuration, which MUST listen on port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Informational port exposure
EXPOSE 8080

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
