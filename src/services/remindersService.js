import ERROR_MESSAGES from "../constants/errorMessages.js";
import { ReminderModel } from "../models/reminderModel.js";
import CustomError from "../utils/CustomError.js";

export const ReminderService = {
    async getAllReminders() {
        // Fetch all reminders
        return await ReminderModel.getAll();
    },

    async getReminderById(reminderId) {
        // Fetch a reminder by ID
        const reminder = await ReminderModel.findById(reminderId);
        if (!reminder) {
            throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        }
        return reminder;
    },

    async createReminder(newReminder) {
        // Create a new reminder
        const { reminder, notes, userId } = newReminder;
        const sanitizedReminder = {
            reminder: reminder?.trim(),
            notes: notes?.trim(),
            userId,
        };
        
        const createReminder = await ReminderModel.create(sanitizedReminder);
        console.log(createReminder);
        return createReminder;
    },

    async updateReminder(reminderId, newValues) {
        const { reminder, notes, completed } = newValues;
        const fields = Object.keys(newValues);

        const setClause = fields.map((key, index) => `${key} = $${index + 1}`);
        const values = Object.values(newValues);
        values.push(reminderId);

        const query = `
            UPDATE reminders
            SET ${setClause.join(", ")}
            WHERE id = $${values.length}
            RETURNING *;
        `
        const updatedReminder = await ReminderModel.update(query, values);
        if (!updatedReminder) {
            throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        }
        return updatedReminder;
    },

    async deleteReminder(reminderId) {
        // Delete a reminder
        const authenticatedUserId = 1;

        const reminder = await ReminderModel.findById(reminderId);

        if (!reminder) {
            throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
        };

        if (reminder.user_id !== authenticatedUserId) {
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, 403);
        };

        const rowCount = await ReminderModel.delete(reminderId);

        if (rowCount === 0) {
            throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
        }

        return {message: 'Reminder deleted successfully'};
    }
};