// Notification model - matches NotificationResponseDto
export interface Notification {
  notificationID: number;
  userID: number;
  message: string;
  category: string;
  status: string;
  createdDate: string;
}
