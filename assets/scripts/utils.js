export function mboxToAddress (mbox) {
  return mbox.startsWith('mailto:')
    ? mbox.slice('mailTo:'.length)
    : mbox
}

export function addressToMbox (address) {
  return address.startsWith('mailto:')
    ? address
    : `mailto:${address}`
}
