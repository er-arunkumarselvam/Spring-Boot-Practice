package com.example.taskManager;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<TaskManager, Integer> {
}
