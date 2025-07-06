FROM node:20
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["./wait-for-it.sh", "business:5000", "--timeout=30", "--", "npm", "start"]