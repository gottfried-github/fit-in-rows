## Space
Defined by number of units (e.g., *2* is *two* units of space).

## Item
A declaration <!--(specification, expression)--> of certain amount of `space`. E.g., `2`.

## Schema
A *set* of `items`. For a `subsequence`, it specifies what `items` and in what quantities a `subsequence` should contain.

<!-- I.e., the order in which `items` occur in the `schema` is irrelevant (at least, in the context of using it for forming a `subsequence`). -->
<!-- For some `items`, which of them take how much `space`. -->

## Sequence
A sequence of `items`

## Subsequence
A subsequence of a `sequence`. It's content is further conditioned on either the total amount of `space` it should take up or on a `schema`.
<!-- It's content is conditioned on either the total amount of `space` it should take up or what `items` and in what quantities should comprise it (specified by a `schema`). `subsequence` must be a subsequence of a `sequence`. -->


It's formed by the `fill-` methods, and is supposed to fill up given amount of `space`; an existing `subsequence` is described by `Subsequence`.
