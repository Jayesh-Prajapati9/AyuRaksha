import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;