/**
 * Single source of truth for the brand string. Reference SITE_NAME everywhere
 * rather than hard-coding "IBvy", so any later tweak stays a one-line change.
 */
export const SITE_NAME = "IBvy";

export const SITE_TAGLINE = "IB credentials with an Ivy League weight";

export const SITE_DESCRIPTION =
  "IBvy sources, trains, certifies, and places IB teachers for India's international schools.";

/**
 * Default placement fee (in INR) snapshotted onto a placement when a hire is
 * confirmed. A flat configurable amount is sufficient for the MVP.
 */
export const DEFAULT_PLACEMENT_FEE = 150000;

/** The three marketing doors. */
export const MARKETING_DOORS = [
  {
    href: "/become-ib",
    title: "Become IB",
    audience: "For teachers",
    blurb: "Train at low or no upfront cost, certify, and get placed.",
  },
  {
    href: "/hiring",
    title: "Fill the room",
    audience: "For established IB schools",
    blurb: "Hire pre-vetted, board-certified teachers. Pay only on a successful placement.",
  },
  {
    href: "/transform",
    title: "Transform to IB",
    audience: "For transforming schools",
    blurb: "Upskill the staff you already have towards IB-readiness.",
  },
] as const;
