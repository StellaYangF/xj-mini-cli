const HOME = process.env[process.platform === 'win32' ? "USERPROFILE" : "HOME"];

export const RC = `${HOME}/.stellaclirc`;
export const DEFAULTS = {
    registry: 'xj-cli',
    type: 'orgs',
}
export const DOWNLOAD = `${HOME}/.template`;