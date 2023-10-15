ALTER TABLE `todos` RENAME COLUMN `name` TO `text`;--> statement-breakpoint
ALTER TABLE `todos` RENAME COLUMN `isCompleted` TO `done`;--> statement-breakpoint
ALTER TABLE todos ADD `timestamp` text;