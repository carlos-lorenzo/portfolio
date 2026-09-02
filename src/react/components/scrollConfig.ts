/**
 * Scroll offsets.
 *
 * There is no top bar any more — navigation is scroll, and the rail is only an
 * indicator — so the desktop offset is just breathing room.
 *
 * Previously NAV_MOBILE_BP was 640 while Sections.module.css repositioned the
 * nav at 880, so between 641px and 880px the nav sat at the bottom of the
 * screen while the scroll offset still assumed it was at the top. One
 * breakpoint now, shared with the stylesheet.
 */

/** The single breakpoint at which the layout switches to its mobile form. */
export const NAV_BP = 880

/** Kept as an alias so existing imports keep resolving. */
export const NAV_MOBILE_BP = NAV_BP

export const NAV_OFFSET_PX = 24
export const NAV_OFFSET_MOBILE_PX = 16

/** Returns the correct scroll offset for the current viewport width. */
export function getNavOffset(): number {
    if (typeof window === 'undefined') return NAV_OFFSET_PX
    return window.innerWidth <= NAV_BP ? NAV_OFFSET_MOBILE_PX : NAV_OFFSET_PX
}
