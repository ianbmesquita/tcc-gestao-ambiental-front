# Use a imagem oficial do Node.js como imagem base
FROM node:18

# Defina um diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Execute o comando npm install (ou yarn install) para instalar as dependências
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta em que a aplicação Next.js será executada (geralmente 3000)
EXPOSE 3000

# Execute o comando npm start (ou yarn start) para iniciar o servidor da aplicação
CMD ["npm", "run", "dev"]
