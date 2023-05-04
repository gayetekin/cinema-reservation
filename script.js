const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved, .information)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        //toggle: add if it doesn't have, delete if it does
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});

function calculateTotal(){
     //find the number of seats selected and calculate price
     const selectedSeats = container.querySelectorAll('.seat.selected');

     //creat array for map
     const selectedSeatsArr = [];
     const seatsArr = [];

     selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
     })

     seats.forEach(function(seat){
        seatsArr.push(seat);
     })

     //index number of the selected seat
     let selectedSeatIndex = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
     })

     console.log(selectedSeatIndex);

     let selectedSeatCount = selectedSeats.length;
     count.innerText = selectedSeatCount;
     amount.innerText = selectedSeatCount * select.value;

     saveToLocalStorage(selectedSeatIndex);
}

// save to local storage
function saveToLocalStorage(index){
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

// get from local storage
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }

}