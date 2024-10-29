import { ERepeat, TNote } from "@/types/TNote";
import * as Notifications from "expo-notifications";

export const setReminder = async (note: TNote) => {
    if (!note.reminder) return;
    const { datetime, repeat } = note.reminder;
    const reminderTime = new Date(datetime); // assuming datetime is a Date string or Date object

    // Determine the repeat interval based on the provided enum
    let trigger;
    switch (repeat) {
        case ERepeat.Daily:
            trigger = { hour: reminderTime.getHours(), minute: reminderTime.getMinutes(), repeats: true };
            break;
        case ERepeat.Weekly:
            trigger = { weekday: reminderTime.getDay() + 1, hour: reminderTime.getHours(), minute: reminderTime.getMinutes(), repeats: true };
            break;
        case ERepeat.Monthly:
            trigger = { day: reminderTime.getDate(), hour: reminderTime.getHours(), minute: reminderTime.getMinutes(), repeats: true };
            break;
        case ERepeat.Yearly:
            trigger = { month: reminderTime.getMonth() + 1, day: reminderTime.getDate(), hour: reminderTime.getHours(), minute: reminderTime.getMinutes(), repeats: true };
            break;
        case ERepeat.DOES_NOT_REPEAT:
        default:
            trigger = { date: reminderTime };
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: note.title,
            body: note.body,
            data: { noteId: note._id },
        },
        trigger
    });

    // console.log(`Notification scheduled with ID: ${notificationId}`);
}

export const updateReminder = async (note: TNote) => {
    const reminders = await getAllReminders();
    let alreadyHave = false;
    let filter: Notifications.NotificationRequest[] = [];

    // check already note placed a reminder
    if (reminders && reminders.length > 0) {
        filter = reminders.filter((notify: Notifications.NotificationRequest) => notify.content.data.noteId === note._id)
        if (filter.length > 0) alreadyHave = true;
    }

    if (note.reminder && !alreadyHave) {
        await setReminder(note);
        // console.log("Reminder set successfully");
    } else if (!note.reminder && alreadyHave) {
        filter.map(async notify => await cancelReminder(notify.identifier))
        // console.log("Reminder cancelled successfully");
    } else if(note.reminder && alreadyHave) {
        // check date and times, repeats are matching if not update
        const { datetime, repeat } = note.reminder;
        const existingReminder = filter[0]; // assume single reminder per note

        // Compare datetime and repeat values; update if they differ
        const currentDatetime = existingReminder.content.data.datetime;
        const currentRepeat = existingReminder.content.data.repeat;

        if (currentDatetime !== datetime || currentRepeat !== repeat) {
            // Cancel and re-set the reminder
            await cancelReminder(existingReminder.identifier);
            await setReminder(note);
            // console.log("Reminder updated successfully");
        } else {
            // console.log("No update needed, reminder is up-to-date");
        }
    }
}

export const getAllReminders = async () => {
    try {
        // Fetch all scheduled notifications
        return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
        console.error("Error fetching active reminders:", error);
    }
}

export const cancelReminder = async (noteId: string) => {
    try {
        await Notifications.cancelScheduledNotificationAsync(noteId);
        // console.log(`Reminder with ID ${noteId} cancelled`);
    } catch (err) {
        console.error("Error canceling reminder:", err);
    }
}