const container = document.querySelector('.container');

container.addEventListener('click', function(e) {
    if(e.target.classList.contains('.seat')) {
        console.log(e.target);
    }
});