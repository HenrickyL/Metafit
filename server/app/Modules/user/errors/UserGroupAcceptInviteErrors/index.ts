import { BadRequestException, NotFountException } from "@core/Exceptions"

export class InviteIdNotFoundInUserInvites extends NotFountException {
    constructor(inviteId: string, username: string) {
      super(`The Invite with id '${inviteId}' not found in user invites ${username}'.`)
      this.name = 'InviteIdNotFoundInUserInvites'
    }
}

export class UserCannotAcceptInviteAlreadyInsertedGroup extends NotFountException {
    constructor(groupId: string, username: string) {
      super(`The user '${username}' already Inserted in group with id '${groupId}'.`)
      this.name = 'UserCannotAcceptInviteAlreadyInsertedGroup'
    }
}

export class InvitationWasNotSentByGroup extends BadRequestException {
    constructor(inviteId: string) {
      super(`The invitation with id '${inviteId}' was not sent by a group.`)
      this.name = 'InvitationWasNotSentByGroup'
    }
}