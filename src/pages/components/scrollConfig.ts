/** Desktop nav offset (nav is at top) */
export const NAV_OFFSET_PX = 80

/** Mobile nav offset (nav moves to bottom, only small breathing room needed) */
export const NAV_OFFSET_MOBILE_PX = 20

/** Breakpoint at which the nav switches from top to bottom */
export const NAV_MOBILE_BP = 640

/** Returns the correct offset for the current viewport width */
export function getNavOffset(): number {
    return window.innerWidth <= NAV_MOBILE_BP ? NAV_OFFSET_MOBILE_PX : NAV_OFFSET_PX
}