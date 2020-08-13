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
