# Esse projeto é uma prova de conceito ou um protótipo do trabalho que está sendo proposto como tema de trabalho de conclusão de curso.

## Introdução
No meio das pesquisas feitas foi levantado vários maneiras de se criar um repositório institucional. O objeitvo de tal trabalho é criar esse protótipo de plataforma mostrará de uma maneira bem simples como funcionará o produto final, detalhes como um serviço de autenticação ou uma forma mais elaborada de disponiblizar tais informações não serão necessários no momento o plano é qu esse sistema cumpra apenas o que serviço principal do projeto.

## Como executar o projeto
 ### Ferramentas de containers
Primeiramente será necessário instalar a ferramenta de container e o orquestrador de container utilizado. No caso, para esse projeto foi utilizado a ferramente de container *docker* e o orquestrador de container *docker-compose*. Para instalar as duas ferramentas em distribuições baseadas em 'debian' é necessário utilizar o comando:
~~~
sudo apt install docker docker-compose
~~~
 ### *Variaveis de ambiente*
 Durante a construção desse mvp, foi para uma melhor configuração e facilidade no compartilhamento desse projeto foi criado uma arquivo *.env*. Onde guardará informações essenciais para a reprodução do projeto. Tais informações serão responsáveis pelas definições relacionadas a senha e nome do banco de dados, senha e login para o servidor ftp e por ultimo o link para do prisma para o banco de dados.
-
#### *Ftp Server*
~~~
    FTP_PORT= 21
    FTP_USER_NAME=
    FTP_USER_PASS=
    FTP_USER_HOME=
~~~
* FTP_PORT: Especifica a porta que o servidor FTP está usando. O padrão é a porta 21.

* FTP_USER_NAME: Especifica o nome do usuário usado para fazer login no servidor FTP.

* FTP_USER_PASS: Especifica a senha usada pelo usuário para fazer login no servidor FTP.

* FTP_USER_HOME: Especifica o diretório raiz (ou home directory) do usuário no servidor FTP. É onde o usuário será levado após se conectar ao servidor.

#### *DB server*
 ~~~
    POSTGRES_USER=
    POSTGRES_PW=
    POSTGRES_DB=
 ~~~
* POSTGRES_USER: Especifica o nome do usuário que será usado para se conectar ao banco de dados.

* POSTGRES_PW: Especifica a senha usada pelo usuário para se conectar ao banco de dados.

* POSTGRES_DB: Especifica o nome do banco de dados que será usado.


#### *Link de conexão Prisma-postgres*
~~~
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PW}@postgress_container:5432/{POSTGRES_DB}?schema=public"
~~~
* DATABASE_URL é uma variável de ambiente que armazena a URL de conexão com um banco de dados.







<!-- ### Formulário de upload

Tipos de dados que são necessáiros, no primeiro momento é um repositório apenas para trabalhos de conclusão de curso.

Tipo do documento: Monografias de TCC

Titulo
Integrantes
Data da defesa
Doc - PDF


# Anotações


Será necessário criar 3 serviços principais. Um servio web que será a apicação, o serviço de persistencia dos dados e um servidor de arquivos que ficará disponibel somente para a aplicação web, tal servidor armazenará os documentos PDFs e irá disponibilizar o caminho para a recuperação dos msms.

O esboço da rede será assim

rede ftp-server:
    Ficará encarregado de ser a ligação do servidor com a aplicação e irá mandar os documentos e tudo mais.

rede bd-server:
    Ficará encarregada da persistencia dos dados e irá salvar o caminho para download dos PDFs.

No final somente a aplicação web poderá visualizar e interagir com as outras redes e servidores.





link bd: DATABASE_URL="postgresql://aluno:abc123@postgress_container:5432/mydb?schema=public" -->