import {subsequences, subsequencesSequences, negateOverlaps} from '../../src/index.js'
import {subsequencesSequencesContainer, sequenceAnalyzedContainer} from './elements.js'
import {renderSequence, renderSubsequences, renderControls, fiveRandomSequences} from './core.js'
import sequences from './sequences.js'

import './index.html'
import './index.scss'

/**
 * @param {Array} subsequences an array of sequences of `subsequences`
 * @returns {HTMLElement} an element with rendered sequences of `subsequences`
 * @description renders the output of negateOverlaps
*/
function renderSubsequencesSequences(subsequences, sequence) {
    const container = subsequencesSequencesContainer()

    subsequences.map(subSs => renderSubsequences(subSs, sequence)).forEach(subS => container.appendChild(subS))

    return container
}

/**
 * @param {Array} sequence a `sequence`
 * @param {Number || Array} space a `space` or a `schema`
 * @returns {HTMLElement}
 * @description analyzes a `sequence` and renders it with the result
*/
function sequenceAnalyzed(sequence, space) {
    const container = sequenceAnalyzedContainer()

    const _subsequences = subsequences(space, sequence)
    console.log(_subsequences)

    const sequences = subsequencesSequences([], _subsequences, _subsequences)

    console.log(sequences)

    container.appendChild(renderSequence(sequence))
    container.appendChild(renderSubsequencesSequences(sequences, sequence))

    return container
}

function sequencesAnalyzed(sequences, space, container) {
    container.replaceChildren(...sequences.map(sequence => sequenceAnalyzed(sequence, space)))
}

function main(sequencesContainer, controlsContainer) {
    const controlCb = (ratio) => {
        const _sequences = fiveRandomSequences(ratio, sequences)
        sequencesAnalyzed(_sequences, [[2], [1,2], [1,1,1]], sequencesContainer)
    }

    renderControls(sequences, controlsContainer, controlCb)

    const _sequences = fiveRandomSequences(2, sequences)
    sequencesAnalyzed(_sequences, [[2], [1,2], [1,1,1]], sequencesContainer)
}

window.addEventListener('DOMContentLoaded', () => {
    main(document.querySelector('#main .sequences-analyzed'), document.querySelector('#main .controls'))
})