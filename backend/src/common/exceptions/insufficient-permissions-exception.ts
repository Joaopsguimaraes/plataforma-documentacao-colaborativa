export class InsufficientPermissionsException extends Error {
  constructor() {
    super('You do not have sufficient permissions');
    this.name = 'InsufficientPermissions';
  }
}
