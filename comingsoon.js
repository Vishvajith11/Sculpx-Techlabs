let launchDate = new Date("March 1, 2025 00:00:00").getTime();
        let timer = setInterval(function() {
            let now = new Date().getTime();
            let timeLeft = launchDate - now;
            if (timeLeft <= 0) {
                document.getElementById("countdown").innerHTML = "Launching Today!";
                clearInterval(timer);
            } else {
                let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);