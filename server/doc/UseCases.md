# Use Cases:

## **Caso de uso:** Join Group através de Invites

Descrição: Esse caso de uso descreve como um usuário pode ingressar em um grupo através do convite enviado pelo grupo ou por outro usuário.

### **Usuário convida para o grupo:** O usuário que deseja convidar outro usuário para um grupo realiza a seguinte ação:

* **Tabela relacionada:** Invite
* **Método relacionado:** inviteUserToGroup
* **Descrição:** O usuário cria um convite do tipo "group_invitation" na tabela Invite, definindo o remetente (senderId) como o usuário que está convidando e o destinatário (receiverId) como o usuário que está sendo convidado. O convite também é associado ao grupo específico (senderGroupId).
### **Grupo convida para o grupo:** O grupo deseja convidar um usuário para ingressar em seu grupo:

* **Tabela relacionada:** Invite
* **Método relacionado:** inviteToGroup
* **Descrição:** O grupo cria um convite do tipo "group_request" na tabela Invite, definindo o remetente (senderGroupId) como o grupo que está convidando e o destinatário (receiverId) como o usuário que está sendo convidado. O convite também é associado ao grupo específico (receiverGroupId).
* 
## **Caso de uso:** Join Invite (Aceitar convite)

Descrição: Esse caso de uso descreve como um usuário pode aceitar um convite de grupo ou convite de usuário e ingressar no grupo correspondente.

### Usuário aceita convite de grupo:

* **Tabela relacionada:** Invite
* **Método relacionado:** acceptGroupInvite
* **Descrição:** O usuário visualiza o convite de grupo pendente na tabela Invite e decide aceitá-lo. Ao aceitar, o sistema realiza as seguintes ações:
    * O usuário é adicionado como membro do grupo na tabela GroupMember.
    * O convite correspondente é marcado como "inativo" ou excluído da tabela Invite.

### Grupo aceita convite de usuário:

* **Tabela relacionada:** Invite
* **Método relacionado:** acceptUserInvite
* **Descrição:** O grupo visualiza o convite de usuário pendente na tabela Invite e decide aceitá-lo. Ao aceitar, o sistema realiza as seguintes ações:
    * O usuário é adicionado como membro do grupo na tabela GroupMember.
    * O convite correspondente é marcado como "inativo" ou excluído da tabela Invite.
