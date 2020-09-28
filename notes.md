# Notes

## Space
Defined by number of units (e.g., *2* is *two* units of space).

## Sequence
A sequence of `space` specifications.

## Subsequence refactor
`Subsequence` is meant for storing the data about a subsequence in a human(coder)-readable way. It describes properties of an existing `subsequence`. It doesn't describe how to build one. Neither does it store the `sequence`, of which it's a `subsequence`.

What I'm trying to do here is to find a good way of speaking about the concept of the `subsequence` computationally. To have something that from looking at the code gives you a good idea about the concept itself (describes it).

## Subsequence
A subsequence of a `sequence`. It's formed by specifying the amount of `space` and trying to fill that amount by taking consequent items of `space` from the `sequence`. \*

\* There could be different mechanisms for evaluating whether each such item can be used to fill the `space` in the `subsequence` (I might add their description later in these notes-docs \*2 (also, *$fillSpace-and-fillSchema* talks about that)). \*1

\*1 From these mechanisms also follows the way `reached` is determined \*3 (also, the eventual value of `delta` follows from that).

`location` is the index of the `subsequence`'s first item, as it appears in the `sequence` (e.g., for `sequence: [0,1,2,3]` and `subsequence: [1,2]`, the `location` of the subsequence is *1*)

`space to fill` may be represented

\*2 `fillSchema` is a more specific case of `fillSpace` (?), wherein `schema` represents not only the total amount of space that needs to be filled, but (certain characteristics of) a structure that the filling items should comprise. Particularly (more specifically), it specifies what items in the subsequence-to-be should take up how much space. The order in which the items occur doesn't matter, but for each item, specified in the schema there should be a match (in terms of the amount of space it takes) in the subsequence

\*3 `reached` answers the question of whether any of the limiting conditions (as described in *$fillSpace-and-fillSchema*) has been reached. But this information, stored in the `subsequence` doesn't seem to be used in the code. Furthermore, if needed, it can be attained by simply running the `fill-` methods on the respective part of the sequence.
I.e., for `sequence: [2,2,1]`, `space to fill: 3`, `subsequence: [2]` with `location: 0`, the equivalent of `reached` can be found out by running `fillSpace` with `d` of `1` and checking `delta` (difference between total space of items in the resulting subsequence and space to fill). Besides, if the `d` > `space to fill`, then `reached` must be true (?) (see the note in *$fillSpace-and-fillSchema*)

## Subsequences (groups)
Each subsequent `subsequence` in `subsequences` is `located` further in the `sequence` by at least *one* `item`.


## fillSpace and fillSchema
The core logic in both fillSpace (formGroupBySpace) and fillSchema (formGroupBySchema) is the same, thus it might be better to put it in a single place. `fillSpace` does that.
The equivalent would be to use `fillSpace` for space and `fillSchema` for schema.
These are equivalence pairs between conditions in `fillSpace` and `fillSchema` (in the sense that they return semantically equivalent values (?)):
`spaceLeftNew < 0`, `!schema.includes(itemSpace)`
`0 === spaceLeftNew`, `schema.length === 0`
The order in which these are checked is the same in both `fillSchema` and `fillSpace`
*note:* In the return value of `fillSpace`, this is impossible: `d > 0 && false === reached`

# Spec

## Slot
A `slot` is an axiomatic unit, represented by the number `1`. An `Item` takes up some number of slots. A `Group` must fill but not exceed certain number of `slot`s with `Item`s.

## Item
Items have `space` which they take.

## Origin item
An `Item` with which a `Group` is associated (around which a `Group` is built)

## Group
A `Group` must fill but not exceed certain number of `slot`s with `Item`s.
A group is associated with an `origin` item.
### Reaching Limit
The `limit` gets reached when:
1. the `origin` is the first or the last item in the group *\*1*
2. the space of an adjacent item is greater than the space left to fill *\*2*
3. there's no more items left in the sequence from which the group is formed *\*2*
**\*1** `limit` at the *opposite side* is reached
**\*2** `limit` at the *corresponding side* is reached
<!--
1. If the `origin` is the first or the last item in the group, then the opposite side has reached the `limit`
2. If the space of an adjacent item is greater than the space left to fill, or
3. If there's no more items left in the sequence from which the group is formed
-->
<!--
1. If the `space` is filled
  1. if the `origin` is the first or the last item in the group, then the opposite side has reached the `limit`
2. Else - if `space` isn't filled
  1. the space of an adjacent item is greater than the space left to fill, or
  2. if there's no more items left in the sequence from which the group is formed
-- then the side at which either condition is true has reached the `limit`.
-->
<!--
## Group
A `Group` must fill but not exceed certain number of `slot`s with `Item`s.
A group is associated with an `origin` item.
1. If the `space` is filled and:
  1. the `origin` is at index of *0*, - then the group has reached it's *left* `limit`;
  2. if `origin`'s index is the last index in the group, then the *right* `limit` is reached.
2. Even if the group's `space` isn't filled but:  
  1. the space of an adjacent item is greater than the space left to fill, or
  2. if there's no more items left in the sequence from which the group is formed
-- then the side at which either condition is true has reached the `limit`.
-->

## FormSide
*note:* In the return value of `formSide`, this is impossible: `spaceLeft > 0 && false === reachedLimit`

*techical note*
it would most likely be better to handle the case of empty source sequence (`sSrc`) inside the `spaceLeftNew > 0` condition (under which the function makes a recursive call)

# formGroups


# maximizeGroupsDifference
* increase the `difference` between ratios of wide and narrow items in adjacent groups
* increase the `ratio` of one kind of items to another (narrow to wide or vice versa) within each group
... by controlling the size of groups and their topology (location) in the sequence

If a group contains only one item, then it's `ratio` is maximal
If a neighboring (adjacent) group contains only one item of the other type, then the `difference` between the two groups is maximal.
If the type of the item in the neighoring (adjacent) group is the same, then the `difference` between the two groups is *minimal*, but if to join them into one group, then the `ratio` of that resulting group will remain maximal.

One exception to the goal of increasing `difference` between `ratios` of groups is a case when there's a sequence of items of switching type (e.g, narrow, wide, narrow, wide, narrow, ...).Such sequence would be considered a ('sparse') group.

# /
Items occupy slots (`Item.space` specifies the number of slots the item occupies); rows contain slots.
Start with a subset of items from a given sequence. Given the number of slots to fill (which represents the max numer of slots a row can contain), for each item from the aforementioned subset `check` tries to fill the slots with that item and it's direct neighors in the sequence, from which the subset was extracted.

<!-- `check` picks possible groups for each item from that subset.  -->

<!-- cluster items into dense and sparse clusters -->

<!--
`js
/**
  @type {Item} [{
    space: Int, groups: [ref to group (for example, a Variant)]
  }]
  @type {Variants} {variants: [Variants]}
  @type {{compatiblePredecessors: [Variants[i], ...], sequence: [Item, ...]}} Variant
  @type {Variant} {
    compatiblePredecessors: [PredescessorRef, ...],
    sequence: [Item, ...]
  }
  @type {PredescessorRef} {
    index: predescessor.variants[i],
    way:
      "add" ||
      "substract" ||
      "neglect" (special case of substract) ||
      "asIs"
  }

  const Ways = new Set([
    "add",
    "substract",
    "neglect",
    "asIs",
  ])

  class VariantRef {
    constructor(index, way) {
      if ("number" === typeof(index)) this.index = index
      if (undefined !== way && Ways.has(way)) {this.way = way} else {
        // throw new Error()
      }
    }
  }

  @param {[{slots: Int}, ...]} rowStructure where slots defines how many slots a row contains
  @param {[{space: Int}]} g where space is how many slots the item takes
  @param {[{space: 1 || 2}]} g where space is how many slots the item takes
*/
`
-->

<!--
```js
/**
  itemSchemas: {anyOf: [1, 2]} // amount of space an item can take
    (e.g., there can be two types of items: one that takes 1 slot of space
    and one that takes 2 slots of space)
  // groupSchemas: {
  //   s: {anyOf: [[2]]},
  //   m: {anyOf: [[1,1,1], [1,2]},
  //   l: {anyOf: [1,1,1,1,1], [2,2], [1,1,2]}
  // }

  +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // the variants are listed in the order of their priority
  // (e.g., ideally, we want the sequence to be broken into [1,2] and [1,1,1] groups.
  // If that's not feasible, we will first consider [2], [1,1,2]. Then if that
  // doesn't solve the problem, we're going to turn to [2,2], [1,1,1,1,1]
  // ) * the formGroup sketch is intended to implement this

  // * another version of priorities: [2] and [1,1,1]; [1,2], [1,1,2]; [2,2], [1,1,1,1,1];

  // order of items in each of the variants doesnt matter
  groupSchemas: {anyOf: [
    [2], [1,1,1], [1,2], [1,1,2], [2,2], [1,1,1,1,1]
    // [1,2], [1,1,1], [2], [1,1,2], [2,2], [1,1,1,1,1]
  ]}

  Note: I could generate all possible permutations of these schemas;
  all possible permutations of the order of their priority...
  I'd have to have possible item types given apriori (e.g., [1, 2]);
  min and max space for a group to take...
  See formAllSequences
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  OR
  groupSizes: [2, 3, 4, 5]
  e.g., 2: [2]; 3: [1,1,1], [1,2]; 4: [1,1,2], [2,2]; 5: [1,1,1,1,1]
*/
```
-->
