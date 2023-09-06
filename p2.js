// https://leetcode.com/problems/add-two-numbers/

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

const lists = [
    [2,4,3],
    [5,6,4],
    [0],
    [0],
    [9,9,9,9,9,9,9],
    [9,9,9,9]
]

function createList(arr) {
    let list = new ListNode(arr[0])
    let head = list
    for (let i = 1; i < arr.length; i++) {
        list.next = new ListNode(arr[i])
        list = list.next
    }
    return head
}

function displayList(list) {
    while (list !== null) {
        console.log(list.val)
        list = list.next
    }
}

var addTwoNumbers = function(l1, l2) {
    if (l1 === null && l2 == null) return null;

    let head = new ListNode()
    let list = head
    let carry = 0
    let sum = 0

    while (l1 !== null || l2 !== null) {
        if (l1 && l2) sum = l1.val + l2.val + carry
        else if (l1) sum = l1.val + carry
        else sum = l2.val + carry
        list.next = new ListNode(sum % 10)
        carry = sum >= 10 ? 1 : 0
        l1 = l1 ? l1.next : null
        l2 = l2 ? l2.next : null
        list = list.next
    }
    
    if (carry > 0) list.next = new ListNode(1)
    return head.next
};

for (let i = 0; i < lists.length; i += 2) {
    const l1 = createList(lists[i])
    const l2 = createList(lists[i+1])
    const result = addTwoNumbers(l1,l2)
    displayList(result)
}