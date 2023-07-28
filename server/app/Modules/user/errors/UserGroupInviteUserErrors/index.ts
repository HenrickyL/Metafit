import { BadRequestException } from "@core/Exceptions"

export class UserGroupInviteAlreadyExistToUserError extends BadRequestException {
    constructor(senderUsername: string, receiveUsername: string, groupId: string) {
      super(`Already an invitation to group with id '${groupId}' created by user '${senderUsername}' for user '${receiveUsername}'.`)
      this.name = 'UserGroupInviteAlreadyExistToUserError'
    }
  }