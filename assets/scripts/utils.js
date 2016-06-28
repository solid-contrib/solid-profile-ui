export function mboxToAddress (mbox) {
  if (!mbox || mbox.length === 0) {
    return ''
  }

  return mbox.startsWith('mailto:')
    ? mbox.slice('mailTo:'.length)
    : mbox
}

export function addressToMbox (address) {
  if (!address || address.length === 0) {
    return ''
  }

  return address.startsWith('mailto:')
    ? address
    : `mailto:${address}`
}
