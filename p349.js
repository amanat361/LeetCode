function intersection(nums1, nums2) {
    var seen = new Map();
    for (var i = 0; i < nums1.length; i++) {
        seen.set(nums1[i], false);
    }
    var bar = Array.from(new Set(nums2));
    for (var i = 0; i < bar.length; i++) {
        if (seen.has(bar[i])) {
            seen.set(bar[i], true);
        }
    }
    return [];
}
