import { ReminderService } from "../services/remindersService.js";

export const ReminderController = {
    async getAllReminders(req, res) {
        try {
            const reminders = await ReminderService.getAllReminders();
            res.status(200).json(reminders);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },

    async getReminderByID(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.getReminderById(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },

    async createReminder(req, res) {
        try {
            const reminder = await ReminderService.createReminder(req.body);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
        const reminder = req.body.reminder;
        res.send(reminder);
    },

    async updateReminder(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.updateReminder(reminderId, req.body);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error', error: error });
        }
    },

    async deleteReminder(req, res) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.deleteReminder(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
            
        }
        res.send('Delete old reminder');
    }
}