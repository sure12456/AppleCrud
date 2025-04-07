import { ReminderService } from "../services/remindersService.js";

export const ReminderController = {
    async getAllReminders(req, res, next) {
        console.log("Calling getAllReminders controller");
        try {
            const reminders = await ReminderService.getAllReminders();
            res.status(200).json(reminders);
        } catch (error) {
            next(error);
        }
    },

    async getReminderByID(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.getReminderById(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
        }
    },

    async createReminder(req, res, next) {
        try {
            const reminder = await ReminderService.createReminder(req.body);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
        }
        const reminder = req.body.reminder;
        res.send(reminder);
    },

    async updateReminder(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.updateReminder(reminderId, req.body);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
        }
    },

    async deleteReminder(req, res, next) {
        try {
            const reminderId = parseInt(req.params.id);
            const reminder = await ReminderService.deleteReminder(reminderId);
            res.status(200).json(reminder);
        } catch (error) {
            next(error);
            
        }
        res.send('Delete old reminder');
    }
}