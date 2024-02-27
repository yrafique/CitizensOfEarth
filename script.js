document.addEventListener('DOMContentLoaded', function () {
    const voteCounter = document.getElementById('vote-counter');

    function updateVoteCounter() {
        fetch('/get_votes')
            .then(response => response.json())
            .then(data => {
                let totalVotes = 0;
                for (let key in data) {
                    totalVotes += data[key];
                    document.getElementById(`count-${key}`).innerText = `Votes: ${data[key]}`;
                }
                voteCounter.innerText = `Total Votes: ${totalVotes}`;
            });
    }

    fetch('/un_issues')
        .then(response => response.json())
        .then(issues => {
            const list = document.getElementById('issues');
            issues.forEach(issue => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col-lg-4 col-md-6 mb-4'; // Bootstrap classes for responsive grid

                const issueDiv = document.createElement('div');
                issueDiv.className = 'issue-card shadow p-3 bg-body rounded';
                issueDiv.onclick = function () { // Making the whole card clickable
                    fetch('/vote_issue', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ issue: issue }),
                    }).then(() => {
                        updateVoteCounter();
                    });
                };

                const img = document.createElement('img');
                img.src = `images/${issue.replace(/\s+/g, '_').toLowerCase()}.png`;
                img.alt = issue;
                img.className = 'issue-img mb-3';
                issueDiv.appendChild(img);

                const issueTitle = document.createElement('h5');
                issueTitle.innerText = issue;
                issueTitle.className = 'text-center';
                issueDiv.appendChild(issueTitle);

                const counterSpan = document.createElement('span');
                counterSpan.id = `count-${issue}`;
                counterSpan.className = 'vote-counter badge bg-primary text-white';
                counterSpan.innerText = 'Votes: 0';
                issueDiv.appendChild(counterSpan);

                colDiv.appendChild(issueDiv);
                list.appendChild(colDiv);
            });
            updateVoteCounter();
        });
});