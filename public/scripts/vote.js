const voteElement = document.querySelector('.vote-element');
setVote();

document.querySelectorAll('.heart').forEach(ele => {
    ele.addEventListener("click", event => {
        addPrevSibilingVotes(event.target);
        removeNextSibilingVotes(event.target);
        voteElement.setAttribute('value', event.target.getAttribute('value'));
    });
});

function removeNextSibilingVotes (ele) {
    if (ele.nextElementSibling) {
        ele.nextElementSibling.classList.remove('vote');
        removeNextSibilingVotes(ele.nextElementSibling);
    }
    return;
}

function addPrevSibilingVotes (ele) {
    ele.classList.add('vote');
    if (ele.previousElementSibling) {
        addPrevSibilingVotes(ele.previousElementSibling);
    }
    return;
}

function setVote () {
    const vote = voteElement.getAttribute('value');
    const voteHeart = document.querySelector('.heart[value="' + vote + '"]');
    removeNextSibilingVotes(voteHeart);
    addPrevSibilingVotes(voteHeart);
}
