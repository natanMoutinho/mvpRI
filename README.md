# Esse projeto é uma prova de conceito ou um protótipo do trabalho que está sendo proposto como tema de trabalho de conclusão de curso.

## Introdução
No meio das pesquisas feitas foi levantado vários maneiras de se criar um repositório institucional. O objeitvo de tal trabalho é criar esse protótipo de plataforma mostrará de uma maneira bem simples como funcionará o produto final, detalhes como um serviço de autenticação ou uma forma mais elaborada de disponiblizar tais informações não serão necessários no momento o plano é qu esse sistema cumpra apenas o que serviço principal do projeto.

## Como reproduzir
 ### MINION, IMPORTANTE ISSO AKI HEIN
No caso espero que seja fácil, se ue não estiver esquecendo de nada vc consegue rodar o projeto
primeiramente baixe o docker e docker-compose, eu espero ...
Agr que vc baixou, teoricamente só rodar o comando      

~~~
docker-compose up
~~~

Acho que funfa, testa aí
## Como funcionará




### Formulário de upload

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





link bd: DATABASE_URL="postgresql://aluno:abc123@postgress_container:5432/mydb?schema=public"