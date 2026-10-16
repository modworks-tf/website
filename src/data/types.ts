/** A tool hosted elsewhere, shown as a LinkCard on the TF2 and Discord pages. */
export interface ToolLink {
  name: string;
  description: string;
  href?: string;
  tag: string;
  /** Opens a modal instead of a link. */
  modal?: string;
  action: string;
}
