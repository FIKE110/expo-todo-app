CREATE TABLE `lists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false,
	`created_at` integer DEFAULT '"2024-09-20T10:13:03.844Z"',
	`due_date` integer,
	`list_id` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lists_title_unique` ON `lists` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `tasks_title_unique` ON `tasks` (`title`);