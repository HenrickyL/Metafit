# MetaFit

## *Use Cases*
1. **Criação e gerenciamento de grupos:** 
    * Permitir que os usuários criem e gerenciem grupos com amigos para estabelecer metas e objetivos de exercícios e hábitos saudáveis.
2. **Definição e acompanhamento de metas:**
    * Permitir que os usuários estabeleçam metas pessoais ou em grupo para exercícios e hábitos saudáveis, bem como acompanhe seu progresso em relação a essas metas.
3. **Ranqueamento de usuários:** 
    * Permitir que os usuários sejam ranqueados em relação ao seu progresso individual e em grupo em relação às metas estabelecidas.
4. **Sistema de recompensas:**
    * Oferecer recompensas em forma de pontos, selos ou outros incentivos para motivar os usuários a atingirem suas metas de exercícios e hábitos saudáveis.
5. **Autenticação de usuário:** 
    * Oferecer segurança de autenticidade para os usuários, assim garantindo mais confiança ao uso do aplicativo.


## *Application Screens*

1. **Tela de Login/Cadastro**

   * Permitir que o usuário crie uma conta ou faça login usando suas credenciais existentes.

2. **Tela Inicial:**
    * Exibir uma lista de grupos aos quais o usuário pertence e suas respectivas metas.
    * Permitir que o usuário crie um novo grupo ou junte-se a um grupo existente.
    * Exibir as metas atuais do usuário e seu progresso em relação a elas.
3. **Tela de Grupo:**

    * Exibir uma lista de metas do grupo e permitir que o usuário selecione as metas a serem concluídas.
    * Permitir que o usuário veja o progresso do grupo como um todo e o progresso individual de cada membro do grupo.
    * Exibir um gráfico de progresso que mostra o desempenho do usuário e do grupo ao longo do tempo.
4. **Tela de Desafios:**
    * Exibir uma lista de desafios em que o usuário pode participar e ganhar selos.
    * Permitir que o usuário selecione um desafio e veja os critérios para ganhar o selo.
    * Exibir uma lista de selos que o usuário já ganhou.
5. **Tela de Perfil:**
    * Permitir que o usuário edite suas informações de perfil.
    * Exibir ma lista de metas e desafios concluídos pelo usuário e seus amigos.
    * Permitir que o usuário visualize seu ranking e o ranking do grupo em relação aos outros grupos.
    * Tela de Configurações:
    * Permitir que o usuário personalize suas configurações, como notificações e preferências de idioma.
    * Permitir que o usuário baixe dados offline para uso quando estiver desconectado da internet.u

## *Entities*
1. **Usuário:**
    * ID: identificador único do usuário
    * Nome: nome completo do usuário
    * E-mail: endereço de e-mail do usuário
    * Senha: senha de acesso do usuário
    * Data de Nascimento: data de nascimento do usuário
    * Gênero: gênero do usuário (masculino, feminino, não binário, etc.)
    * Altura: altura do usuário
    * Peso: peso do usuário
    * Objetivo: objetivo do usuário (perder peso, ganhar massa muscular, manter peso, etc.)
    * Imagem: foto ou imagem do perfil do usuário

2. **Grupo:**
    * ID: identificador único do grupo
    * Nome: nome do grupo
    * Descrição: breve descrição do grupo
    * Imagem: foto ou imagem do grupo
    * Código de Acesso: código de acesso para ingressar no grupo
    * Data de Criação: data de criação do grupo
    * Número de Membros: quantidade de membros do grupo
    * Objetivo: objetivo do grupo (por exemplo, "perder peso juntos")

3. **Meta:**
    * ID: identificador único da meta
    * Título: título da meta
    * Descrição: descrição detalhada da meta
    * Data de Início: data de início da meta
    * Data de Término: data de término da meta
    * Tipo: tipo da meta (por exemplo, "perder peso", "fazer exercícios regularmente", "beber mais água")
    * Unidade de Medida: unidade de medida para a meta (por exemplo, "kg", "minutos", "litros")
    * Valor Alvo: valor alvo para alcançar a meta (por exemplo, "perder 5 kg", "fazer 30 minutos de exercício por dia")
    * Recompensa: recompensa oferecida pela conquista da meta

4. **Progresso:**
    * ID: identificador único do progresso
    * Data: data do registro de progresso
    * Valor: valor registrado para o progresso (por exemplo, "peso atual", "tempo de exercício realizado")
    * Meta: meta relacionada ao progresso registrado
    * Usuário: usuário que registrou o progresso


--------------------
[Base Project](https://github.com/HenrickyL/NG-transaction-system) by [Henricky Lima](https://github.com/HenrickyL)
