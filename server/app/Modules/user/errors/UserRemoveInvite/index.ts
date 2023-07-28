import { NotFountException } from "@core/Exceptions";

export class RemoveInviteNotFoundError extends NotFountException {
    constructor(inviteId: string, username: string, isReceived: boolean) {
      const inviteType = isReceived ? 'received' : 'sent';
      const errorMessage = `The ${inviteType} invite with ID '${inviteId}' was not found by user '${username}'.`;
      super(errorMessage);
      this.name = 'RemoveInviteNotFoundError';
    }
}