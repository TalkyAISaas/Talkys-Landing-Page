export const CONTACT_PREFILL_EVENT = 'talkys:prefill-contact';

/** Ask the demo form to pre-fill its message (only if the visitor hasn't typed one). */
export function prefillContact(message: string) {
  window.dispatchEvent(new CustomEvent<string>(CONTACT_PREFILL_EVENT, { detail: message }));
}
