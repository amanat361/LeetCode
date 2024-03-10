"use strict";
function intersection(nums1, nums2) {
    const seen = new Map();
    for (let i = 0; i < nums1.length; i++) {
        seen.set(nums1[i], false);
    }
    const bar = Array.from(new Set(nums2));
    for (let i = 0; i < bar.length; i++) {
        if (seen.has(bar[i])) {
            seen.set(bar[i], true);
        }
    }
    return [];
}
