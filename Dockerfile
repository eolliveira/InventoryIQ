FROM nginx:latest

# Remove o arquivo de configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Defina o diretório de trabalho 
WORKDIR /usr/share/nginx/html

# Copie os arquivos da pasta "dist" para o diretório de trabalho do Nginx
COPY ./dist .

# Cria o arquivo de configuração do Nginx
RUN echo 'server { \
    listen 3000; \
    listen [::]:3000; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Comando para iniciar o Nginx quando o container for executado
CMD ["nginx", "-g", "daemon off;"]