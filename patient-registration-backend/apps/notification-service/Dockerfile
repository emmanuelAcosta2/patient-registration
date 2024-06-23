# Usa la imagen oficial de Node.js como base
FROM node:21-alpine


# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia los archivos del package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]
