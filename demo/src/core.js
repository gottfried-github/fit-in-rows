import {itemNarrow, itemWide, sequenceContainer, subsequenceContainer, subsequencesContainer, control} from './elements.js'
import {uniqueRandomNumbers} from './helpers.js'

/**
 * @param {Array} next a reference to a `subsequence` such that the first item is greater than the last item of prev at least by 1
 * @param {Array} prev a reference to a `subsequence`
 * @returns {Boolean} whether next is consecutive to prev
*/
function isConsecutive(next, prev) {
    return next[0] - prev[prev.length-1] === 1
}

/**
 * @param {Array} sequence sequence of `item`s
 * @returns an element with rendered sequence
 */
function renderSequence(sequence) {
    const container = sequenceContainer()

    sequence.forEach(item => container.appendChild(1 === item ? itemNarrow() : itemWide()))

    return container
}

/**
 * @param {Array} subsequence a `subsequence` represented with `ref`s
 * @param {Array} sequence a `sequence`
 * @param {Boolean} blank whether to render a blank subsequence
 * @returns {HTMLElement}
*/
function renderSubsequence(subsequence, sequence, blank) {
    const _container = subsequenceContainer(blank)

    subsequence
        .map(ref => {
            return sequence[ref] === 1 ? itemNarrow() : itemWide()
        })
        .forEach(item => _container.appendChild(item))

    return _container
}

/**
 * @param {[Array]} subsequences a sequence of `subsequence`s
 * @param {Array} sequence a sequence of `item`s
 * @decription render a sequence of subsequences such that the space for items not included in the subsequences is preserved
*/
function renderSubsequences(subsequences, sequence) {
    const container = subsequencesContainer()

    const els = subsequences.reduce((subSs, subS, i) => {
        if (i === 0) {
            if (subS[0] === 0) {
                subSs.push(renderSubsequence(subS, sequence))
                return subSs
            }

            // create a blank subsequence to represent the not included items
            subSs.push(renderSubsequence(sequence.map((item, i) => i).slice(0, subS[0]), sequence, true))
            subSs.push(renderSubsequence(subS, sequence))
            return subSs
        }

        const subSPrev = subsequences[i-1]

        if (isConsecutive(subS, subSPrev)) {
            subSs.push(renderSubsequence(subS, sequence))
            return subSs
        }

        // create a blank subsequence to represent the not included items
        subSs.push(renderSubsequence(sequence.map((item, i) => i).slice(subSPrev[subSPrev.length-1]+1, subS[0]), sequence, true))
        
        subSs.push(renderSubsequence(subS, sequence))
        return subSs
    }, [])
    els.forEach(e => container.appendChild(e))

    return container
}

function fiveRandomSequences(ratio, sequences) {
    const numbers = uniqueRandomNumbers(sequences[ratio].length < 5 ? sequences[ratio].length-1 : 5, sequences[ratio].length-1)

    return numbers.map(n => sequences[ratio][n])
}

function renderControls(sequences, container, controlCb) {
    sequences.forEach((g, i) => {
        container.appendChild(control(i, g[0].length-i, controlCb))
    })
}

export {renderSequence, renderSubsequence, renderSubsequences, renderControls, fiveRandomSequences}