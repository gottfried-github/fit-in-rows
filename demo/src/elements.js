function itemWide() {
    const e = document.createElement('div')
    e.className = `item wide`

    return e
}

function itemNarrow() {
    const e = document.createElement('div')
    e.className = `item narrow`

    return e
}

function sequenceContainer() {
    const e = document.createElement('div')
    e.classList.add('item-sequence')

    return e
}

function subsequenceContainer(blank) {
    const e = document.createElement('div')
    e.className = `item-sequence${blank ? ' blank' : ''}`

    return e
}

function subsequencesContainer() {
    const e = document.createElement('div')
    e.classList.add('sequence-sequence')

    return e
}

function subsequencesSequencesContainer() {
    const e = document.createElement('div')
    e.classList.add('sequences')
    return e
}

function sequenceAnalyzedContainer() {
    const e = document.createElement('div')
    e.classList.add('sequence-analyzed')
    return e
}

function control(wideN, narrowN, cb) {
    const el = document.createElement('button')
    
    el.classList.add('control')

    el.innerText = `${wideN}/${narrowN}`
    el.addEventListener('click', () => cb(wideN))

    return el
}

export {itemWide, itemNarrow, sequenceContainer, subsequenceContainer, subsequencesContainer, subsequencesSequencesContainer, sequenceAnalyzedContainer, control}