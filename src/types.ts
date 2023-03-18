
export type User = {
  token: string
  id: string
  address: string
  password: string
}

export type Message = {
  "@id": string
  "@type": string
  id: string
  accountId: string
  msgid: string
  from: From
  to: To[]
  subject: string
  intro: string
  seen: boolean
  isDeleted: boolean
  hasAttachments: boolean
  size: number
  downloadUrl: string
  createdAt: string
  updatedAt: string
}

export type FullMessage = {
  "@context": string
  "@id": string
  "@type": string
  id: string
  accountId: string
  msgid: string
  from: From
  to: To[]
  cc: string[]
  bcc: string[]
  subject: string
  seen: boolean
  flagged: boolean
  isDeleted: boolean
  verifications: string[]
  retention: boolean
  retentionDate: string
  text: string
  html: string[]
  hasAttachments: boolean
  attachments: Attachment[]
  size: number
  downloadUrl: string
  createdAt: string
  updatedAt: string
}

export interface From {
  name: string
  address: string
}

export interface To {
  name: string
  address: string
}

export interface Attachment {
  id: string
  filename: string
  contentType: string
  disposition: string
  transferEncoding: string
  related: boolean
  size: number
  downloadUrl: string
}
