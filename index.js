const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const appointmentsRef = db.collection('appointments');


document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    appointmentsRef.add({
        name: name,
        email: email,
        date: date,
        time: time
    }).then(() => {
        alert('Appointment booked successfully!');
        document.getElementById('booking-form').reset();
        fetchAppointments();
    }).catch((error) => {
        console.error('Error booking appointment: ', error);
    });
});

function fetchAppointments() {
    appointmentsRef.get().then((querySnapshot) => {
        const appointmentList = document.getElementById('appointment-list');
        appointmentList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const appointment = doc.data();
            const li = document.createElement('li');
            li.textContent = `${appointment.name} - ${appointment.email} - ${appointment.date} - ${appointment.time}`;
            appointmentList.appendChild(li);
        });
    });
}


fetchAppointments();
