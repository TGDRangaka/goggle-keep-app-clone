export const getFormattedDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export const getFormattedTime = (date: Date | string): string => {
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}