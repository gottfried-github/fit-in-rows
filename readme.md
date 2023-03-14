## Description
Generate all possible ways of breaking a sequence of items into rows of a specified structure.

### Specifying rows
Items are either wide or narrow. A wide item takes `2` of [`space`](#space); a narrow one takes `1`.

The structure of a row can be specified in two ways. One way is to specify it by specifying total amount of [`space`](#space) items in the row constitute. For example, the [`space`](#space) of `3` says that a row can only contain either three narrow items or one narrow and one wide item - but no more or less than that.

Another way of specifying the structure of a row is to specify the kind of items to include in a row and the quantity of each specified kind by specifying a set of items with a [`schema`](#schema).

### Breaking the sequence
First, I generate `subsequence`s of given [`space`](#space) (representing rows) starting from each `item` in the `sequence` (in `formHomogenousSubsequences`). Then, out of the generated `subsequence`s, I form sequences where none of the `subsequence`s overlap (`cascadeSubsequence`).

## Technical overview
### Semantics
#### Space
Defined by number of units (e.g., *2* is *two* units of space)

#### Item
A specification of certain amount of `space`. E.g., `2`. Currently, only `item`s of `1` and `2` `space` are possible: `1` for a narrow item and `2` for a wide one.

#### Sequence
A sequence of `items`

#### Subsequence
A subsequence of a `sequence`

#### Subsequences
An array of arrays where each array contains `subsequence`s starting with the same `item`. The starting `item` in each array is subsequent to the starting `item` in the previous array.

#### Ref
A reference to an `item` in a `sequence` by the `item`'s index

#### Schema
A *set* of `item`s. It specifies the kind of items which to include in a `subsequence` and the quantity of each of the specified kinds. Each specified kind is included once, unless repeated. For example, for a schema of `1,2` and a sequence `1,2, 1,1,1, 2,1`, the following `subsequence`s will be generated: `1,2`, `2,1`, `1,2`, `2,1`; for a schema of `1,1,1` and the same sequence, the following will be generated: `1,1,1`.

### Algorithms
#### `subsequences`
Form `subsequence`s with each given `space` starting from each `item` in the given `sequence`. I.e., take each `item` in the given `sequence` as a starting `item` for a `subsequence` with given `space`. 

Returns `subsequences`.

#### `subsequencesSequences`
Produces sequences of `subsequence`s where none of the `subsequence`s overlap. 

For each `subsequence` in `subsequences` iterate over the remaining `subsequences`, passing the sequence of non-overlapping `subsequence`s, formed so far. For each `subsequence` that doesn't overlap with the sequence, append the `subsequence` to the sequence. If the `subsequence` is the last one in `subsequences`, append the formed sequence to sequences.

#### `fillSpace`
Form a `subsequence` by unshifting `item`s from the given `sequence` until the given `space` is filled in the `subsequence` or leave the `space` unfilled if no matching `item`s are present in the `sequence`.