# Notes
## fillSpace and fillSchema
The core logic in both fillSpace (formGroupBySpace) and fillSchema (formGroupBySchema) is the same, thus it might be better to put it in a single place. `fillSpace` does that.
The equivalent would be to use `fillSpace` for space and `fillSchema` for for schema.
These are equivalence pairs between conditions in `fillSpace` and `fillSchema` (in the sense that they return semantically equivalent values (?)):
`spaceLeftNew < 0`, `!schema.includes(item.space)`
`0 === spaceLeftNew`, `schema.length === 0`
The order in which these are checked is the same in both `fillSchema` and `fillSpace`

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
