import { ReminderModel } from "../models/reminderModel.js";

export const ReminderService = {
    async getAllReminders() {
        // Fetch all reminders
        return await ReminderModel.getAll();
    },

    async getReminderById(reminderId) {
        // Fetch a reminder by ID
        const reminder = await ReminderModel.findById(reminderId);
        if (!reminder) {
            throw new Error('Reminder not found');
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
        console.log("Set Clause", setClause)
        const values = Object.values(newValues);
        values.push(reminderId);

        console.log("Values", values)
        console.log("Join ", setClause.join(", "))

        const query = `
            UPDATE reminders
            SET ${setClause.join(", ")}
            WHERE id = $${values.length}
            RETURNING *;
        `
        const updatedReminder = await ReminderModel.update(query, values);
        if (!updatedReminder) {
            throw new Error('Reminder not found');
        }
        return updatedReminder;
    },

    async deleteReminder(reminderId) {
        // Delete a reminder
        const authenticatedUserId = 1;

        const reminder = await ReminderModel.findById(reminderId);

        if (!reminder) {
            throw new Error('Reminder not found');
        };

        if (reminder.user_id !== authenticatedUserId) {
            throw new Error('You are not authorized to delete this reminder');
        };

        const rowCount = await ReminderModel.delete(reminderId);

        if (rowCount === 0) {
            throw new Error('Failed to delete reminder');
        }

        return {message: 'Reminder deleted successfully'};
    }
};