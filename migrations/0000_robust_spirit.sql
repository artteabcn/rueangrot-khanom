CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`party_size` integer NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`notes` text,
	`locale` text NOT NULL,
	`whatsapp_status` text DEFAULT 'pending' NOT NULL,
	`whatsapp_error` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
