## Description
### The function
Break a sequence of items into rows such that the last row is filled.

### The method
First, generate `subsequence`s starting from each `item` in the `sequence` (in `formHomogenousSubsequences`). Then, out of the generated `subsequence`s, form sequences where none of the `subsequence`s overlap (`cascadeSubsequence`).

## Technical overview
### Semantics
#### Space
Defined by number of units (e.g., *2* is *two* units of space)

#### Item
A specification of certain amount of `space`. E.g., `2`

#### Sequence
A sequence of `items`

#### Subsequence
A subsequence of a `sequence`

#### Ref
A reference to an `item` in a `sequence` by the `item`'s index

#### Schema
A *set* of `items`. For a `subsequence`, it specifies what `items` and in what quantities a `subsequence` should contain.
For example, for schema `1,2` and a sequence `1,2, 1,1,1, 2,1`, the following subsequences will be generated:
`1,2`, `2,1`, `1,2`, `2,1`.

### Algorithms
#### formHomogeneousSubsequences
Form `subsequence`s with given `space` starting from each `item` in the given `sequence`. I.e., take each `item` in the given `sequence` as a starting `item` for a `subsequence` with given `space`. 

The resulting `subsequence`s are ordered subsequently: each next `subsequence`'s first `item` is either subsequent or identical but not precedent to the previous `item` in the given `sequence`.

#### cascadeSubsequence
Appends the given `subsequence` to the first sequence of given sequences of `subsequence`s where the `subsequence` doesn't overlap the last `subsequence` in that sequence or to a new empty sequence if all of the previous sequences overlap.

To produce expected results, it is expected that:
1. the first `item` of the first `subsequence` of each sequence in the given sequences is either subsequent or identical but not precedent in a `sequence` to that in the previous sequence.
2. each sequence's `subsequence`s are ordered subsequently and without overlap.

#### negateOverlaps
Runs `cascadeSubsequence` for each `subsequence` in the given `subsequence`s, accumulating the sequences, produced by it.

To produce expected results, it is expected that the given `subsequence`s are ordered subsequently: that each next `subsequence`'s first `item` is either subsequent or identical but not precedent to the previous `item` in a `sequence`.

#### fillSpace
Form a `subsequence` by unshifting `item`s from the given `sequence` until the given `space` is filled in the `subsequence` or leave the `space` unfilled if no matching `item`s are present in the `sequence`.