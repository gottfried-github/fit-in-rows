## Description
Generate all possible ways of breaking a sequence of items into rows of a specified structure.

See live demo [here](https://gottfried-github.github.io/fit-in-rows/demo/dist/index.html).

Build the demo: `npm run watch`

Generate and process sequences for work with this package [here](https://github.com/gottfried-github/fit-in-rows_sequences).

### Specifying rows
Items are either wide or narrow. A wide item takes `2` of [`space`](#space); a narrow one takes `1`.

The structure of a row can be specified in two ways. One way is to specify it by specifying total amount of [`space`](#space) items in the row constitute. For example, the [`space`](#space) of `3` says that a row can only contain either three narrow items or one narrow and one wide item - but no more or less than that.

Another way of specifying the structure of a row is to specify the kind of items to include in a row and the quantity of each specified kind by specifying a set of items with a [`schema`](#schema).

### Breaking the sequence
First, I generate [`subsequences`](#subsequence) of given [`space`](#space) or [`schema`](#schema) (representing rows) starting from each [`item`](#item) in the [`sequence`](#sequence) (in [`subsequences`](#algorithms)). Then, out of the generated subsequences, I form sequences where none of the subsequences overlap (in [`subsequencesSequences`](#subsequencesSequences)).

## Technical overview
### Semantics
#### Space
Defined by number of units (e.g., *2* is *two* units of space)

#### Item
A specification of certain amount of [`space`](#space). E.g., `2`. Currently, only [`items`](#item) of `1` and `2` [`space`](#space) are possible: `1` for a narrow item and `2` for a wide one.

#### Sequence
A sequence of [`items`](#item)

#### Subsequence
A subsequence of a [`sequence`](#sequence)

#### Subsequences
An array of arrays where each array contains [`subsequences`](#subsequence) starting with the same [`item`](#item). The starting item in each array is subsequent to the starting item in the previous array.

#### Ref
A reference to an [`item`](#item) in a [`sequence`](#sequence) by the item's index.

#### Schema
A *set* of [`items`](#item). It specifies the kind of items which to include in a [`subsequence`](#subsequence) and the quantity of each of the specified kinds. Each specified kind is included once, unless repeated. For example, for a schema of `1,2` and a sequence `1,2, 1,1,1, 2,1`, the following subsequences will be generated: `1,2`, `2,1`, `1,2`, `2,1`; for a schema of `1,1,1` and the same sequence, the following will be generated: `1,1,1`.

### Algorithms
#### [subsequences](https://github.com/gottfried-github/fit-in-rows/blob/e4b443aa5bcfd8f6314bba0545a00d26591297e4/src/index.js#L87)
Form [`subsequences`](#subsequence) with each given [`space`](#space) or [`schema`](#schema) starting from each [`item`](#item) in the given [`sequence`](#sequence). I.e., take each item in the given sequence as a starting item for a set of subsequences with the different spaces or schemas. 

Returns [`subsequences`](#subsequences).

#### [subsequencesSequences](https://github.com/gottfried-github/fit-in-rows/blob/e4b443aa5bcfd8f6314bba0545a00d26591297e4/src/index.js#L9)
Out of [`subsequences`](#subsequences), produces sequences of [`subsequence`s](#subsequence) where none of the subsequences overlap. 

For each [`subsequence`](#subsequence) in [`subsequences`](#subsequences) iterate over the remaining non-overlapping [`subsequences`](#subsequences). Append each subsequence to a sequence of subsequences, formed so far in the recursion.

#### [fillSpace](https://github.com/gottfried-github/fit-in-rows/blob/e4b443aa5bcfd8f6314bba0545a00d26591297e4/src/index.js#L111)
Form a [`subsequence`](#subsequence) by unshifting [`items`](#item) from the given [`sequence`](#sequence) until the given [`space`](#space) is filled in the subsequence or leave the space unfilled if no matching items are present in the sequence.