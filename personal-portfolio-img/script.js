
document.addEventListener('DOMContentLoaded', function() {
    // Tab Button Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            // Activate the clicked tab and corresponding content
            const tab = button.getAttribute('data-tab');
            button.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');
        });
    });

    // Audio Controls
    const audio = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-button');
    const muteButton = document.getElementById('mute-button');
    // Initialize audio paused
    let isAudioPlaying = false;
    // Set initial volume (optional)
    audio.volume = 0.3;

    // Play/Pause Button Logic
    playPauseButton.addEventListener('click', () => {
        if (isAudioPlaying) {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isAudioPlaying = !isAudioPlaying; // Toggle the state
    });

    // Mute Button Logic
    muteButton.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.muted = true;
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Google Sheet Integration
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwCGJ14HmMNoetpyxdnuLXI56Bwsir-Q9jX20n5ZVA7K_RSuuIklCdThFMP7aHhNUr-Yw/exec'; // Replace with your actual URL
    const form = document.forms['submit-to-google-sheet'];
    const message = document.getElementById("message");

    form.addEventListener('submit', e => {
        e.preventDefault();
        message.innerHTML = "Submitting..."; // Provide user feedback

        fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Or response.text() if your script returns plain text
            })
            .then(data => {
                message.innerHTML = "Message sent successfully!";
                setTimeout(function() {
                    message.innerHTML = "";
                }, 3000);
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error);
                message.innerHTML = "Error: " + error.message; // Display error to user
            });
    });
});
