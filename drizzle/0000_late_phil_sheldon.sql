CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text,
	`done` integer,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text,
	`text2` text
);
