# 1. Använd en officiell Node.js-bild
FROM node:20

# 2. Ange arbetskatalog i containern
WORKDIR /app

# 3. Kopiera package.json och installera dependencies
COPY package*.json ./
RUN npm install

# 4. Kopiera resten av projektet
COPY . .

# 5. Öppna porten som appen använder
EXPOSE 3000

# 6. Kör servern
CMD ["npm", "start"]