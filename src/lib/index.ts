import { writable } from 'svelte/store';
import type { ProfileData } from './bskyProfile';

/**
 * Max percent of the screen the stars will be generated on. Default is 60%
 *
 * For example, if the value is 30%, the stars will only be generated in the top
 * 30% of the screen.
 */
export const maxStarGenScreenPercent = writable(60);
export const specialProfile = writable(null as ProfileData | null);
