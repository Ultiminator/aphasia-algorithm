// Build groups once
const groups = [...new Set(
    Array.from(document.querySelectorAll('input[type="radio"]')).map(r => r.name)
)];

// function to collect answers from each selected radio button
function collectAnswers() {
    const answers = {};
    groups.forEach(name => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        answers[name] = selected ? selected.value : null;
    });
    return answers;
}

//function to check if all questions are answered
function allAnswered(answers) {
    if (answers.verbal && answers.comprehension && answers.repetition) {
        return true;
    }else{
        return false;
    }
}

//function to assess the answers and return a result based on the criteria
function assess(answers) {
    // when the pt is not fluent
    if (answers.verbal === 'false' && answers.comprehension === 'false' && answers.repetition === 'false') {
        return '<b>GLOBAL APHASIA</b><br>with the lesion likely involving Frontal, Temporal, and Parietal operculum';
    } else if (answers.verbal === 'false' && answers.comprehension === 'false' && answers.repetition === 'true') {
        return '<b>MIXED TRANSCORTICAL APHASIA</b><br>The lesion mostly involving Frontal and Parietal Convexity';
    }else if (answers.verbal === 'false' && answers.comprehension === 'true' && answers.repetition === 'false') {
        return '<b>BROCA\'S APHASIA</b><br>The lesion mostly involving Frontal Operculum';
    }else if (answers.verbal === 'false' && answers.comprehension === 'true' && answers.repetition === 'true') {
        return '<b>TRANSCORTICAL MOTOR APHASIA</b><br>The lesion mostly involving Frontal Convexity';
    }
    // when the pt is fluent
    else if (answers.verbal === 'true' && answers.comprehension === 'false' && answers.repetition === 'false') {
        return '<b>WERNICKE\'S APHASIA</b><br>The lesion mostly involving Posterior part of Superior Temporal Gyrus';
    }else if (answers.verbal === 'true' && answers.comprehension === 'false' && answers.repetition === 'true') {
        return '<b>TRANSCORTICAL SENSORY APHASIA</b><br>The lesion mostly involving Temporoparietal Convexity';
    }else if (answers.verbal === 'true' && answers.comprehension === 'true' && answers.repetition === 'false') {
        return '<b>CONDUCTION APHASIA</b><br>The lesion mostly involving Arcuate Fasciculus';
    }else if (answers.verbal === 'true' && answers.comprehension === 'true' && answers.repetition === 'true') {
        return '<b>ANOMIC APHASIA</b><br>The lesion mostly involving Angular and Supramarginal Gyri';
        // TODO: add more aphasia types and their criteria here
    }
}

// Real-time update
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const answers = collectAnswers();
        let result = '';
        let resultsDiv = document.getElementById('result');
        if (!allAnswered(answers)) {
            resultsDiv.style.display = 'none';
            return;
        }
        result = assess(answers);
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = result;
    });
});

// Reset button functionality
function startOver() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.getElementById('result').style.display = 'none';
}